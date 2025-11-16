"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { register } from "@/action/register";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition(); // useTransition is a React Hook that lets you render a part of the UI in the background.
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name:"",
    },
  });
  return (
    <CardWrapper
      headerLabel="Create An Account"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account"
      showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="deshi_chora"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="chora@mail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            size="lg"
            className="font-semibold text-lg px-8 py-6 backdrop-blur-md bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/40 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 rounded-xl cursor-pointer w-full"
            type="submit"
            disabled={isPending}
          >
            Register Here →
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
