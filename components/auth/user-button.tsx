"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon, UserIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-users";
import { LogoutButton } from "./logout";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none group">
        <div className="relative">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300"></div>

          <Avatar className="h-10 w-10 border-2 border-slate-600/50 group-hover:border-blue-500/50 transition-all duration-300 ring-2 ring-transparent group-hover:ring-blue-500/20 ring-offset-2 ring-offset-slate-900">
            <AvatarImage src={user?.image || ""} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-800 cursor-pointer">
              <UserIcon className="text-slate-300 h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 backdrop-blur-xl bg-slate-900/95 border border-slate-700/50 shadow-2xl shadow-black/50 rounded-xl"
      >
        {/* User Info Section */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium text-slate-200">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-slate-700/50" />

        {/* Logout Button */}
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer focus:bg-slate-800/50 focus:text-red-400 transition-colors group">
            <LogOutIcon className="mr-2 h-4 w-4 text-slate-400 group-hover:text-red-400 transition-colors" />
            <span className="text-slate-300 group-hover:text-red-400 transition-colors">
              Logout
            </span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
