#!/usr/bin/env node

/**
 * Post-clone setup script for vibe-coding-starter template
 * Run this after cloning to remove template-specific files
 *
 * Usage: node scripts/setup-template.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const filesToRemove = [
  '.github/workflows/claude-review.yml',
  '.github/workflows/template-cleanup.yml',
  'scripts/claude-pr-review.ts',
];

const devDepsToRemove = [
  '@anthropic-ai/sdk',
  '@octokit/rest',
];

function removeFile(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`Removed: ${relativePath}`);
    return true;
  }
  return false;
}

function removeEmptyDir(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  if (fs.existsSync(fullPath)) {
    const files = fs.readdirSync(fullPath);
    if (files.length === 0) {
      fs.rmdirSync(fullPath);
      console.log(`Removed empty directory: ${relativePath}`);
      return true;
    }
  }
  return false;
}

function cleanPackageJson() {
  const pkgPath = path.join(ROOT, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  let modified = false;

  if (pkg.devDependencies) {
    for (const dep of devDepsToRemove) {
      if (pkg.devDependencies[dep]) {
        delete pkg.devDependencies[dep];
        console.log(`Removed devDependency: ${dep}`);
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('Updated package.json');
  }

  return modified;
}

function selfDestruct() {
  const scriptPath = __filename;
  fs.unlinkSync(scriptPath);
  console.log('Removed: scripts/setup-template.js');
}

function main() {
  console.log('\n🚀 Setting up your project from template...\n');

  // Remove template-specific files
  for (const file of filesToRemove) {
    removeFile(file);
  }

  // Clean up empty .github/workflows directory
  removeEmptyDir('.github/workflows');
  removeEmptyDir('.github');

  // Clean package.json
  cleanPackageJson();

  // Remove this script
  selfDestruct();

  // Check if scripts folder is now empty (only if it exists)
  const scriptsDir = path.join(ROOT, 'scripts');
  if (fs.existsSync(scriptsDir)) {
    const remaining = fs.readdirSync(scriptsDir);
    if (remaining.length === 0) {
      fs.rmdirSync(scriptsDir);
      console.log('Removed empty directory: scripts');
    }
  }

  console.log('\n✅ Template setup complete!');
  console.log('   Run "npm install" to update your dependencies.\n');
}

main();
