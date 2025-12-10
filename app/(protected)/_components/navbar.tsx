"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="relative backdrop-blur-xl bg-slate-900/40 border border-slate-700/50 flex justify-between items-center p-4 rounded-2xl w-full max-w-3xl shadow-2xl shadow-blue-900/20">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-xl -z-10"></div>

      <div className="flex gap-x-2 flex-wrap">
        <Button
          asChild
          variant={pathname === "/server" ? "default" : "outline"}
          className={
            pathname === "/server"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-lg shadow-blue-500/30"
              : "border-slate-600/50 hover:bg-slate-800/50 hover:border-slate-500"
          }
        >
          <Link href="/server">Server</Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/client" ? "default" : "outline"}
          className={
            pathname === "/client"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-lg shadow-blue-500/30"
              : "border-slate-600/50 hover:bg-slate-800/50 hover:border-slate-500"
          }
        >
          <Link href="/client">Client</Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/admin" ? "default" : "outline"}
          className={
            pathname === "/admin"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-lg shadow-blue-500/30"
              : "border-slate-600/50 hover:bg-slate-800/50 hover:border-slate-500"
          }
        >
          <Link href="/admin">Admin</Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
          className={
            pathname === "/settings"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 shadow-lg shadow-blue-500/30"
              : "border-slate-600/50 hover:bg-slate-800/50 hover:border-slate-500"
          }
        >
          <Link href="/settings">Settings</Link>
        </Button>
      </div>

      <UserButton />
    </nav>
  );
};
