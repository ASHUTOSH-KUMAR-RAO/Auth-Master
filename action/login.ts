"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { LoginSchema } from "@/schemas";

import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";

import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  // Validate input fields
  const validateField = LoginSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid fields provided" };
  }

  const { email, password, code } = validateField.data;

  // Check if user exists
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials" };
  }

  // Check if email is verified
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent! Please check your inbox." };
  }

  // Handle 2FA flow
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // Verify the 2FA code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken || "error" in twoFactorToken) {
        return { error: "Invalid code" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code" };
      }

      // Check if code has expired
      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code has expired" };
      }

      // Delete the used token
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      // Delete existing confirmation if any
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      // Create new confirmation
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });

      // Now proceed with sign in after 2FA verification
    } else {
      // Generate and send 2FA token
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  // Attempt sign in
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Logged in successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        case "AccessDenied":
          return { error: "Access denied" };
        case "OAuthSignInError":
          return { error: "OAuth sign in error" };
        default:
          return { error: "Something went wrong" };
      }
    }

    // Re-throw the error if it's a redirect (Next.js behavior)
    throw error;
  }
};
