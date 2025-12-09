import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Minimum Of 6 Characters Will Required" }),
});
export const ResetSchema = z.object({
  email: z.string().email({ message: "Email Is Required" }),
});
export const LoginSchema = z.object({
  email: z.string().email({ message: "Email Is Required" }),
  password: z.string().min(1, {
    message: "Password Is Required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email Is Required" }),
  password: z.string().min(8, {
    message: "Minimum 8 Characters Required",
  }),
  name: z.string().min(1, {
    message: "Name Is Required",
  }),
});
