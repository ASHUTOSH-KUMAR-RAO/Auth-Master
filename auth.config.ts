import type { NextAuthConfig } from "next-auth";

/**
 * Auth configuration for Edge Runtime (middleware)
 *
 * ⚠️ DO NOT import:
 * - bcrypt/bcryptjs
 * - Database clients (Prisma)
 * - Node.js modules (fs, crypto)
 *
 * Keep this minimal for Edge compatibility
 */
export default {
  providers: [], // Empty - providers ko auth.ts mein define karo

  // pages: {
  //   signIn: "/auth/login",
  // },

  // callbacks: {
  // Lightweight callbacks only
  // authorized({ auth, request: { nextUrl } }) {
  // Middleware routing logic
  // return true;
  // },
  // },
} satisfies NextAuthConfig;
