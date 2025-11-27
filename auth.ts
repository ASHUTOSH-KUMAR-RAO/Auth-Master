
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  /**
   * Session Strategy: JWT
   *
   * We're using JWT instead of database sessions because:
   * 1. ✅ Works in Edge Runtime (middleware)
   * 2. ✅ No database query on every request (faster)
   * 3. ✅ Stateless - scales better
   *
   * Note: Session data is stored in HTTP-only cookie (server-side accessible)
   * NOT directly available on client-side for security reasons
   */
  session: { strategy: "jwt" },

  ...authConfig,

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // ✅ Validation
        const validateFields = LoginSchema.safeParse(credentials);

        if (!validateFields.success) {
          return null;
        }

        const { email, password } = validateFields.data;

        // ✅ Get user from database
        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }

        // ✅ Verify password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
          return null;
        }

        // ✅ Return user object
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Add user ID to token
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      // Add user ID to session
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
