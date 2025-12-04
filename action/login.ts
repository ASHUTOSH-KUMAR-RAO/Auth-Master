"use server";

import { LoginSchema } from "@/schemas";
import z, { success } from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";

import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateField = LoginSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid Email ❌" };
  }

  const { email, password } = validateField.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    // ? agar user exist nahi karta to hum verification token generate karenge aur user ko email bhejenge taaki wo apna account verify kar sake

    return { error: "User does not exist ❌" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation Email Sent!" };
  }

  try {
    const res = await signIn("credentials", {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      email,
      password,
    });
    return res;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials ❌" };
        default:
          return { error: "Something went wrong ❌" };
      }
    }
    throw error;
  }
};
