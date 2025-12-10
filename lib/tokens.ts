/**
 * TOKEN GENERATION UTILITIES
 *
 * This file handles the generation and management of various authentication tokens:
 * 1. Two-Factor Authentication (2FA) tokens - Numeric OTP codes
 * 2. Password Reset tokens - UUID-based secure links
 * 3. Email Verification tokens - UUID-based confirmation links
 *
 * All tokens have expiration times and are stored in the database.
 */

import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getVerifactionTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

// ============================================================================
// TWO-FACTOR AUTHENTICATION TOKEN
// ============================================================================

/**
 * Generates a 6-digit numeric token for Two-Factor Authentication
 *
 * @param email - User's email address
 * @returns Promise<TwoFactorToken> - Created token object with email, token, and expiry
 *
 * Flow:
 * 1. Generate random 6-digit number (100,000 to 999,999)
 * 2. Set expiration to 1 hour from now
 * 3. Delete any existing token for this email (one token per user)
 * 4. Create and save new token in database
 *
 * Security Notes:
 * - Token range: 100,000 to 1,000,000 gives exactly 6 digits
 * - crypto.randomInt() provides cryptographically secure random numbers
 * - Each user can only have one active 2FA token at a time
 */
export const generateTwoFactorToken = async (email: string) => {
  // Generate 6-digit random number using crypto for security
  // Range: 100,000 (min) to 999,999 (max)
  // Example output: "234567", "891234", etc.
  const token = crypto.randomInt(100_000, 1_000_000).toString();

  // Set token expiration to 1 hour from current time
  // Time calculation: current timestamp + (3600 seconds × 1000 milliseconds)
  // This gives us 1 hour = 3,600,000 milliseconds
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // Check if user already has an existing 2FA token
  // Important: Only one active token per email is allowed
  const existingToken = await getTwoFactorTokenByEmail(email);

  // If token exists, delete it before creating new one
  // This prevents token accumulation and ensures clean state
  if (existingToken && "id" in existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Create new 2FA token in database
  // Stores: email, 6-digit token code, and expiration timestamp
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

// ============================================================================
// PASSWORD RESET TOKEN
// ============================================================================

/**
 * Generates a UUID-based token for password reset functionality
 *
 * @param email - User's email address
 * @returns Promise<PasswordResetToken> - Created token object
 *
 * Flow:
 * 1. Generate unique UUID token (e.g., "a1b2c3d4-e5f6-...")
 * 2. Set expiration to 1 hour
 * 3. Delete any existing reset token for this email
 * 4. Create new token in database
 *
 * Usage:
 * - Token is sent via email as part of reset link
 * - Link format: https://yourapp.com/reset-password?token=<UUID>
 * - User clicks link to reset password within 1 hour
 *
 * Security Notes:
 * - UUID v4 provides 122 bits of randomness (virtually impossible to guess)
 * - One-time use: token is deleted after successful password reset
 * - Time-limited: expires after 1 hour for security
 */
export const generatePasswordResetToken = async (email: string) => {
  // Generate UUID v4 token
  // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  // Example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"
  // Each 'x' is a random hex digit (0-9, a-f)
  const token = uuidv4();

  // Set expiration to 1 hour from now
  // Same calculation as 2FA: current time + 5 minutes
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  // Check for existing password reset token
  // User might have requested reset multiple times
  const existingToken = await getPasswordResetTokenByEmail(email);

  // Clean up: Delete old token if it exists
  // This ensures only the latest reset request is valid
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Create new password reset token in database
  // Token will be used in reset link sent to user's email
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

// ============================================================================
// EMAIL VERIFICATION TOKEN
// ============================================================================

/**
 * Generates a UUID-based token for email verification
 *
 * @param email - User's email address to verify
 * @returns Promise<VerificationToken> - Created token object
 *
 * Flow:
 * 1. Generate unique UUID token
 * 2. Set expiration to 1 hour
 * 3. Delete any existing verification token (prevents duplicates)
 * 4. Create and store new token
 *
 * Usage:
 * - Sent during user registration or email change
 * - Link format: https://yourapp.com/verify-email?token=<UUID>
 * - User must verify within 1 hour
 *
 * Why UUID instead of numeric code?
 * - Verification links are clicked, not typed
 * - UUIDs are more secure for URL-based verification
 * - Prevents enumeration attacks (guessing token values)
 *
 * Security Notes:
 * - UUID v4 = 5.3×10^36 possible combinations
 * - Practically impossible to brute force
 * - Tokens are single-use and expire quickly
 */
export const generateVerificationToken = async (email: string) => {
  // Generate UUID v4 (Universally Unique Identifier)
  // UUID v4 uses random numbers to ensure global uniqueness
  // Format: 8-4-4-4-12 hexadecimal digits
  // Example: "550e8400-e29b-41d4-a716-446655440000"
  const token = uuidv4();

  // Calculate expiration time: current time + 1 hour
  // Formula: Date.now() + (60 minutes × 60 seconds × 1000 milliseconds)
  // Result: 3,600,000 milliseconds = 1 hour
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  // Fetch any existing verification token for this email
  // Important: Prevents multiple pending verifications for same email
  const existingTokens = await getVerifactionTokenByEmail(email);

  // If old token exists, delete it before creating new one
  // Why? To maintain data integrity and prevent token conflicts
  // Only the most recent verification attempt should be valid
  if (existingTokens) {
    await db.verificationToken.delete({
      where: {
        id: existingTokens.id,
      },
    });
  }

  // Create new verification token in database
  // Stores three key pieces of data:
  // 1. email - Which email address needs verification
  // 2. token - The unique UUID for verification link
  // 3. expires - When this token becomes invalid
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  // Return the created token object
  // Contains: id, email, token, expires, createdAt
  return verificationToken;
};

// ============================================================================
// HELPER NOTES
// ============================================================================

/**
 * TOKEN COMPARISON
 *
 * 2FA Token (Numeric):
 * - Format: 6 digits (e.g., "123456")
 * - Security: 1 million combinations (10^6)
 * - Use case: User types this manually
 * - Delivery: Sent via email, SMS, or authenticator app
 * - Short expiry: Usually 10-15 minutes
 *
 * Password Reset Token (UUID):
 * - Format: UUID (e.g., "a1b2c3d4-...")
 * - Security: 5.3×10^36 combinations
 * - Use case: User clicks link in email
 * - Delivery: Embedded in email link
 * - Medium expiry: 1 hour
 *
 * Verification Token (UUID):
 * - Format: UUID (e.g., "f47ac10b-...")
 * - Security: 5.3×10^36 combinations
 * - Use case: User clicks link in email
 * - Delivery: Embedded in email link
 * - Medium expiry: 1 hour (can be longer)
 *
 * Why different token types?
 * - User experience: Typing 6 digits is easy; typing UUID is not
 * - Security level: Links can use longer tokens for better security
 * - Context: 2FA needs quick entry; email verification can wait
 */

/**
 * SECURITY BEST PRACTICES IMPLEMENTED
 *
 * ✅ Cryptographically secure randomness (crypto.randomInt, uuidv4)
 * ✅ Token expiration (prevents indefinite validity)
 * ✅ One token per user (deletes old tokens)
 * ✅ Database storage (tokens can be invalidated server-side)
 * ✅ Proper token length (6 digits for typing, UUID for links)
 *
 * Additional recommendations:
 * - Rate limit token generation (prevent spam)
 * - Log token usage (detect suspicious activity)
 * - Hash tokens in database (optional, for extra security)
 * - Use HTTPS for all token links (prevent interception)
 * - Implement token attempt limits (prevent brute force)
 */
