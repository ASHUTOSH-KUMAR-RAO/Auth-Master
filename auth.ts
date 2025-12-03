import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail, getUserById } from "@/data/user";
import { LoginSchema } from "@/schemas";
import authConfig from "./auth.config";
import { db } from "./lib/db";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
    } & DefaultSession["user"];
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages:{
    signIn: '/auth/login',
    error: '/auth/error'
  },
  events:{ // ? hum iska use isiliye kar rahe hai taki jab bhi koi user apna account link kare to hum uska emailVerified field update kar sake
    async linkAccount({user}){
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    }
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
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
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
});
