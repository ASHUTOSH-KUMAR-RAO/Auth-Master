import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({message:"Email Is Required"}),
  password: z.string().min(1,{
    message:"Password Is Required"
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({message:"Email Is Required"}),
  password: z.string().min(8,{
    message:"Minimum 8 Characters Required"
  }),
  name:z.string().min(1,{
    message:"Name Is Required"
  })
});
