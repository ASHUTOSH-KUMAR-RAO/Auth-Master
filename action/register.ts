"use server";

import {  RegisterSchema } from "@/schemas";
import z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {

  const validateField = RegisterSchema.safeParse(values)

  if (!validateField.success) {
        return  {error:"Invalid Email ❌"}
  }
    return {success:"Email Sent "}
};
