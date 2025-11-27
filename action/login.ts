"use server";

import { LoginSchema } from "@/schemas";
import z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {

  const validateField = LoginSchema.safeParse(values)

  if (!validateField.success) {
        return  {error:"Invalid Email ❌"}
  }

  const {email,password} = validateField.data;

  try {
    const res = await signIn("credentials", {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      email,
      password,
    });
    return res;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type){
        case "CredentialsSignin":
          return {error:"Invalid Credentials ❌"};
        default:
          return {error:"Something went wrong ❌"};
      }
    }
    throw error;
  }
};
