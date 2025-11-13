"use client";

import { useRouter } from "next/navigation";
import React from "react";

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}) => {

  const router = useRouter()
  const onClick = () => {
      router.push("auth/login")
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
