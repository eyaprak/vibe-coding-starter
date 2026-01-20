/**
 * THIS CODE HAS INTENTIONAL SECURITY VULNERABILITIES FOR TESTING
 */

import { prisma } from "./prisma";

// CRITICAL: SQL Injection vulnerability - user input directly in query
export async function getUserByName(name: string) {
  const result = await prisma.$queryRawUnsafe(
    `SELECT * FROM users WHERE name = '${name}'`
  );
  return result;
}

// CRITICAL: XSS vulnerability - rendering unsanitized HTML
export function renderUserComment(comment: string): string {
  return `<div class="comment">${comment}</div>`;
}

// CRITICAL: Hardcoded credentials exposed in code
const DATABASE_PASSWORD = "super_secret_password_123";
const API_SECRET_KEY = "sk_live_abc123xyz789";

export function getDbConnection() {
  return {
    host: "localhost",
    password: DATABASE_PASSWORD,
    apiKey: API_SECRET_KEY,
  };
}

// CRITICAL: Deleting all data without confirmation
export async function clearAllUsers() {
  await prisma.user.deleteMany({});
  return "All users deleted";
}
