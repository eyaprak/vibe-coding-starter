import Anthropic from "@anthropic-ai/sdk";
import { Octokit } from "@octokit/rest";

// Types
interface InlineComment {
  file: string;
  line: number;
  severity: "critical" | "warning" | "suggestion";
  message: string;
}

interface ReviewResponse {
  summary: string;
  approved: boolean;
  comments: InlineComment[];
}

interface PRFile {
  filename: string;
  status: string;
  patch?: string;
  additions: number;
  deletions: number;
}

// Configuration
const CONFIG = {
  model: "claude-sonnet-4-20250514" as const,
  maxTokens: 4096,
  maxDiffLength: 100000,
  skipPatterns: [
    /package-lock\.json$/,
    /yarn\.lock$/,
    /pnpm-lock\.yaml$/,
    /\.lock$/,
    /\.generated\./,
    /\.min\.(js|css)$/,
    /dist\//,
    /build\//,
    /node_modules\//,
  ],
};

// Environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const PR_NUMBER = parseInt(process.env.PR_NUMBER || "0", 10);
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;
const PR_DRAFT = process.env.PR_DRAFT === "true";
const PR_LABELS = (process.env.PR_LABELS || "").split(",").filter(Boolean);

// Skip review label
const SKIP_LABEL = "skip-claude-review";

// Validate environment
function validateEnv(): void {
  const missing: string[] = [];
  if (!GITHUB_TOKEN) missing.push("GITHUB_TOKEN");
  if (!ANTHROPIC_API_KEY) missing.push("ANTHROPIC_API_KEY");
  if (!PR_NUMBER) missing.push("PR_NUMBER");
  if (!REPO_OWNER) missing.push("REPO_OWNER");
  if (!REPO_NAME) missing.push("REPO_NAME");

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

// Initialize clients
const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Check if file should be skipped
function shouldSkipFile(filename: string): boolean {
  return CONFIG.skipPatterns.some((pattern) => pattern.test(filename));
}

// Fetch PR details and files
async function fetchPRData(): Promise<{
  title: string;
  body: string;
  head: string;
  base: string;
  files: PRFile[];
}> {
  const [prResponse, filesResponse] = await Promise.all([
    octokit.pulls.get({
      owner: REPO_OWNER!,
      repo: REPO_NAME!,
      pull_number: PR_NUMBER,
    }),
    octokit.pulls.listFiles({
      owner: REPO_OWNER!,
      repo: REPO_NAME!,
      pull_number: PR_NUMBER,
      per_page: 100,
    }),
  ]);

  const files = filesResponse.data
    .filter((file) => !shouldSkipFile(file.filename))
    .map((file) => ({
      filename: file.filename,
      status: file.status,
      patch: file.patch,
      additions: file.additions,
      deletions: file.deletions,
    }));

  return {
    title: prResponse.data.title,
    body: prResponse.data.body || "",
    head: prResponse.data.head.ref,
    base: prResponse.data.base.ref,
    files,
  };
}

// Build the diff content for Claude
function buildDiffContent(files: PRFile[]): string {
  let diffContent = "";
  let totalLength = 0;

  for (const file of files) {
    if (!file.patch) continue;

    const fileSection = `\n### ${file.filename} (${file.status})\n\`\`\`diff\n${file.patch}\n\`\`\`\n`;

    if (totalLength + fileSection.length > CONFIG.maxDiffLength) {
      diffContent += "\n\n[... diff truncated due to size limits ...]\n";
      break;
    }

    diffContent += fileSection;
    totalLength += fileSection.length;
  }

  return diffContent;
}

// Build the review prompt
function buildPrompt(prData: {
  title: string;
  body: string;
  head: string;
  base: string;
  files: PRFile[];
}): string {
  const diffContent = buildDiffContent(prData.files);

  return `You are an expert code reviewer. Your task is to review this pull request comprehensively and provide actionable feedback.

## Review Criteria

Focus ONLY on serious issues that could break the application or cause security problems:

1. **Critical Bugs** (things that will actually break)
   - Obvious logic errors that will cause crashes or incorrect behavior
   - Null/undefined access that will throw runtime errors
   - Infinite loops or recursion

2. **Security Vulnerabilities** (actual exploitable issues)
   - SQL injection with user input directly in queries
   - XSS with unsanitized user content rendered as HTML
   - Exposed secrets or credentials in code
   - Authentication bypasses

3. **Data Loss Risks**
   - Deleting data without confirmation
   - Overwriting files without backup
   - Race conditions that corrupt data

DO NOT flag:
- Code style preferences or formatting
- "Could be improved" suggestions
- Theoretical edge cases that are unlikely
- Missing error handling for internal code
- Type safety nitpicks
- Performance micro-optimizations
- "Best practices" that aren't critical
- API model names or versions (e.g., claude-sonnet-4-20250514 is valid)
- Package versions or dependencies
- Configuration values you're unsure about

## Pull Request Information

**Title:** ${prData.title}
**Description:** ${prData.body || "No description provided"}
**Branch:** ${prData.head} → ${prData.base}
**Files Changed:** ${prData.files.length}

## Changed Files

${diffContent}

## Response Format

Respond with a valid JSON object (no markdown code blocks) in this exact format:

{
  "summary": "A concise summary of the review findings (2-4 sentences). Mention what the PR does well and what needs improvement.",
  "approved": true/false,
  "comments": [
    {
      "file": "path/to/file.ts",
      "line": 42,
      "severity": "critical|warning|suggestion",
      "message": "Detailed explanation of the issue and how to fix it"
    }
  ]
}

Guidelines for your response:
- BE LENIENT: Most PRs should be approved. Only block for serious issues.
- Set "approved" to false ONLY if there are critical bugs or security vulnerabilities that WILL cause problems
- Use "critical" SPARINGLY - only for bugs that will definitely break things or security holes
- Use "warning" for issues that are concerning but not blocking
- Skip "suggestion" entirely - we don't want nitpicks
- If the code works and is reasonably safe, approve it even if it's not perfect
- When in doubt, approve. Contributors can always improve later.
- Empty comments array is perfectly fine - it means the code is good!`;
}

// Parse Claude's response
function parseResponse(content: string): ReviewResponse {
  try {
    // Remove potential markdown code blocks
    const cleaned = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Validate structure
    if (typeof parsed.summary !== "string") {
      throw new Error("Invalid summary");
    }
    if (typeof parsed.approved !== "boolean") {
      throw new Error("Invalid approved field");
    }
    if (!Array.isArray(parsed.comments)) {
      parsed.comments = [];
    }

    // Validate and filter comments
    parsed.comments = parsed.comments.filter(
      (c: unknown): c is InlineComment =>
        typeof c === "object" &&
        c !== null &&
        typeof (c as InlineComment).file === "string" &&
        typeof (c as InlineComment).line === "number" &&
        typeof (c as InlineComment).message === "string" &&
        ["critical", "warning", "suggestion"].includes((c as InlineComment).severity)
    );

    return parsed as ReviewResponse;
  } catch (error) {
    console.error("Failed to parse Claude response:", error);
    console.error("Raw content:", content);

    // Return a fallback response
    return {
      summary: "Unable to parse review response. Please review manually.",
      approved: false,
      comments: [],
    };
  }
}

// Get severity emoji
function getSeverityEmoji(severity: InlineComment["severity"]): string {
  switch (severity) {
    case "critical":
      return "🚨";
    case "warning":
      return "⚠️";
    case "suggestion":
      return "💡";
  }
}

// Label configuration
const LABELS = {
  approved: { name: "claude:approved", color: "0e8a16", description: "Approved by Claude AI" },
  changesRequested: { name: "claude:changes-requested", color: "d93f0b", description: "Claude AI requested changes" },
  reviewing: { name: "reviewing:claude-ai", color: "fbca04", description: "Being reviewed by Claude AI" },
};

// Ensure label exists, create if not
async function ensureLabel(label: { name: string; color: string; description: string }): Promise<void> {
  try {
    await octokit.issues.getLabel({
      owner: REPO_OWNER!,
      repo: REPO_NAME!,
      name: label.name,
    });
  } catch {
    // Label doesn't exist, create it
    await octokit.issues.createLabel({
      owner: REPO_OWNER!,
      repo: REPO_NAME!,
      name: label.name,
      color: label.color,
      description: label.description,
    });
    console.log(`Created label: ${label.name}`);
  }
}

// Add "reviewing" label when review starts
async function addReviewingLabel(): Promise<void> {
  try {
    await ensureLabel(LABELS.reviewing);
    await octokit.issues.addLabels({
      owner: REPO_OWNER!,
      repo: REPO_NAME!,
      issue_number: PR_NUMBER,
      labels: [LABELS.reviewing.name],
    });
    console.log(`Added label: ${LABELS.reviewing.name}`);
  } catch (error) {
    console.warn("Could not add reviewing label:", error);
  }
}

// Update PR labels based on review result
async function updateLabels(event: "APPROVE" | "REQUEST_CHANGES"): Promise<void> {
  // Include legacy and reviewing labels for cleanup
  const legacyLabel = { name: "claude:reviewed", color: "1d76db", description: "" };
  const allLabels = [LABELS.approved, LABELS.changesRequested, LABELS.reviewing, legacyLabel];

  // Determine which label to add
  const labelToAdd = event === "APPROVE" ? LABELS.approved : LABELS.changesRequested;

  // Ensure the label exists
  await ensureLabel(labelToAdd);

  // Get current PR labels
  const { data: currentLabels } = await octokit.issues.listLabelsOnIssue({
    owner: REPO_OWNER!,
    repo: REPO_NAME!,
    issue_number: PR_NUMBER,
  });

  // Remove old Claude labels
  for (const label of allLabels) {
    if (currentLabels.some((l) => l.name === label.name) && label.name !== labelToAdd.name) {
      await octokit.issues.removeLabel({
        owner: REPO_OWNER!,
        repo: REPO_NAME!,
        issue_number: PR_NUMBER,
        name: label.name,
      });
      console.log(`Removed label: ${label.name}`);
    }
  }

  // Add new label if not already present
  if (!currentLabels.some((l) => l.name === labelToAdd.name)) {
    await octokit.issues.addLabels({
      owner: REPO_OWNER!,
      repo: REPO_NAME!,
      issue_number: PR_NUMBER,
      labels: [labelToAdd.name],
    });
    console.log(`Added label: ${labelToAdd.name}`);
  }
}

// Post review to GitHub
async function postReview(review: ReviewResponse, files: PRFile[]): Promise<void> {
  // Build the review body
  const criticalCount = review.comments.filter((c) => c.severity === "critical").length;
  const warningCount = review.comments.filter((c) => c.severity === "warning").length;
  const suggestionCount = review.comments.filter((c) => c.severity === "suggestion").length;

  let body = `## 🤖 Claude Code Review\n\n`;
  body += `${review.summary}\n\n`;

  // Add files reviewed summary
  const totalChanges = files.reduce((sum, f) => sum + f.additions + f.deletions, 0);
  body += `<details>\n<summary>📁 Files reviewed (${files.length} files, ${totalChanges} changes)</summary>\n\n`;
  files.forEach((f) => {
    const icon = f.status === "added" ? "🆕" : f.status === "removed" ? "🗑️" : "📝";
    body += `- ${icon} \`${f.filename}\` (+${f.additions}/-${f.deletions})\n`;
  });
  body += `\n</details>\n\n`;

  if (criticalCount > 0 || warningCount > 0) {
    body += `### Issues Found\n`;
    if (criticalCount > 0) body += `- 🚨 Critical: ${criticalCount}\n`;
    if (warningCount > 0) body += `- ⚠️ Warnings: ${warningCount}\n`;
    body += `\n`;
  }

  if (criticalCount > 0) {
    body += `❌ **Changes requested** - Please fix the critical issues before merging.\n`;
  } else if (warningCount > 0) {
    body += `✅ **Approved** - Minor suggestions below, but good to merge.\n`;
  } else {
    body += `✅ **Approved** - No issues found.\n`;
  }

  body += `\n---\n*Powered by Claude AI*`;

  // Build inline comments for the review
  const reviewComments: Array<{
    path: string;
    line: number;
    body: string;
  }> = [];

  // Create a map of files to their available lines from the diff
  const fileLineMap = new Map<string, Set<number>>();
  for (const file of files) {
    if (!file.patch) continue;

    const lines = new Set<number>();
    let lineNumber = 0;

    for (const line of file.patch.split("\n")) {
      // Parse the @@ header to get line numbers
      const hunkMatch = line.match(/@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
      if (hunkMatch) {
        lineNumber = parseInt(hunkMatch[1], 10) - 1;
        continue;
      }

      // Track added and context lines
      if (!line.startsWith("-")) {
        lineNumber++;
        if (line.startsWith("+") || !line.startsWith("\\")) {
          lines.add(lineNumber);
        }
      }
    }

    fileLineMap.set(file.filename, lines);
  }

  // Filter and add comments
  for (const comment of review.comments) {
    const fileLines = fileLineMap.get(comment.file);
    if (!fileLines) {
      console.warn(`File not found in diff: ${comment.file}`);
      continue;
    }

    // Find the closest valid line if the exact line isn't available
    let targetLine = comment.line;
    if (!fileLines.has(targetLine)) {
      const linesArray = Array.from(fileLines).sort((a, b) => a - b);
      const closest = linesArray.reduce((prev, curr) =>
        Math.abs(curr - targetLine) < Math.abs(prev - targetLine) ? curr : prev
      );
      targetLine = closest;
    }

    if (fileLines.has(targetLine)) {
      reviewComments.push({
        path: comment.file,
        line: targetLine,
        body: `${getSeverityEmoji(comment.severity)} **${comment.severity.toUpperCase()}**\n\n${comment.message}`,
      });
    }
  }

  // Determine review event - only 2 states
  let event: "APPROVE" | "REQUEST_CHANGES";
  if (criticalCount > 0) {
    // Only block merge for critical issues
    event = "REQUEST_CHANGES";
  } else {
    // No critical issues - approve (warnings are just suggestions)
    event = "APPROVE";
  }

  // Dismiss previous "changes requested" reviews from this bot if we're now approving
  if (event === "APPROVE") {
    try {
      const { data: reviews } = await octokit.pulls.listReviews({
        owner: REPO_OWNER!,
        repo: REPO_NAME!,
        pull_number: PR_NUMBER,
      });

      // Find previous REQUEST_CHANGES reviews from github-actions bot
      const pendingChangesReviews = reviews.filter(
        (r) =>
          r.state === "CHANGES_REQUESTED" &&
          (r.user?.login === "github-actions[bot]" || r.user?.type === "Bot")
      );

      for (const review of pendingChangesReviews) {
        await octokit.pulls.dismissReview({
          owner: REPO_OWNER!,
          repo: REPO_NAME!,
          pull_number: PR_NUMBER,
          review_id: review.id,
          message: "Issues have been resolved. Dismissing previous review.",
        });
        console.log(`Dismissed previous review #${review.id}`);
      }
    } catch (error) {
      console.warn("Could not dismiss previous reviews:", error);
      // Continue anyway - not critical
    }
  }

  // Submit the review
  try {
    await octokit.pulls.createReview({
      owner: REPO_OWNER!,
      repo: REPO_NAME!,
      pull_number: PR_NUMBER,
      body,
      event,
      comments: reviewComments,
    });

    console.log(`Review submitted successfully (${event})`);
    console.log(`- Summary posted`);
    console.log(`- ${reviewComments.length} inline comments posted`);
  } catch (error) {
    console.error("Failed to create review:", error);

    // Fallback: post as a simple comment
    await octokit.issues.createComment({
      owner: REPO_OWNER!,
      repo: REPO_NAME!,
      issue_number: PR_NUMBER,
      body: body + "\n\n*Note: Unable to post inline comments*",
    });

    console.log("Fallback: Posted as issue comment");
  }

  // Always update labels (remove reviewing, add result label)
  await updateLabels(event);
}

// Main function
async function main(): Promise<void> {
  const startTime = Date.now();
  console.log("Starting Claude PR Review...");
  console.log(`Repository: ${REPO_OWNER}/${REPO_NAME}`);
  console.log(`PR Number: ${PR_NUMBER}`);

  try {
    // Validate environment
    validateEnv();

    // Check if PR is a draft
    if (PR_DRAFT) {
      console.log("\n⏭️ Skipping review: PR is a draft");
      return;
    }

    // Check for skip label
    if (PR_LABELS.includes(SKIP_LABEL)) {
      console.log(`\n⏭️ Skipping review: PR has "${SKIP_LABEL}" label`);
      return;
    }

    // Fetch PR data
    console.log("\nFetching PR data...");
    const prData = await fetchPRData();
    console.log(`Title: ${prData.title}`);
    console.log(`Files to review: ${prData.files.length}`);

    if (prData.files.length === 0) {
      console.log("No files to review (all files skipped)");
      return;
    }

    // Log files being reviewed
    console.log("\nFiles:");
    prData.files.slice(0, 10).forEach((f) => console.log(`  - ${f.filename}`));
    if (prData.files.length > 10) {
      console.log(`  ... and ${prData.files.length - 10} more`);
    }

    // Add "reviewing" label to show review is in progress
    await addReviewingLabel();

    // Build prompt and call Claude
    console.log("\nSending to Claude for review...");
    const prompt = buildPrompt(prData);

    const message = await anthropic.messages.create({
      model: CONFIG.model,
      max_tokens: CONFIG.maxTokens,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract text content
    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text response from Claude");
    }

    // Parse response
    console.log("\nParsing review response...");
    const review = parseResponse(textContent.text);

    console.log(`Summary: ${review.summary.substring(0, 100)}...`);
    console.log(`Approved: ${review.approved}`);
    console.log(`Comments: ${review.comments.length}`);

    // Post review to GitHub
    console.log("\nPosting review to GitHub...");
    await postReview(review, prData.files);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const criticalCount = review.comments.filter((c) => c.severity === "critical").length;

    if (criticalCount > 0) {
      console.log(`\n❌ Review completed in ${duration}s - ${criticalCount} critical issue(s) found`);
      console.log("Failing check to block merge until issues are resolved.");
      process.exit(1);
    }

    console.log(`\n✅ Review completed in ${duration}s - approved`);
  } catch (error) {
    console.error("\nError during review:", error);

    // Try to post an error comment
    if (GITHUB_TOKEN && REPO_OWNER && REPO_NAME && PR_NUMBER) {
      try {
        const errorOctokit = new Octokit({ auth: GITHUB_TOKEN });
        await errorOctokit.issues.createComment({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          issue_number: PR_NUMBER,
          body: `## 🤖 Claude Code Review\n\n❌ **Review failed**\n\nAn error occurred while reviewing this PR. Please review manually.\n\nError: ${error instanceof Error ? error.message : "Unknown error"}\n\n---\n*Powered by Claude AI*`,
        });
      } catch {
        console.error("Failed to post error comment");
      }
    }

    process.exit(1);
  }
}

// Run
main();
