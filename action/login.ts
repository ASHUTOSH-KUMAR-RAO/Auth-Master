"use server";

import { LoginSchema } from "@/schemas";
import z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {

  const validateField = LoginSchema.safeParse(values)

  if (!validateField.success) {
        return  {error:"Invalid Email ❌"}
  }
    return {success:"Email Sent "}
};
