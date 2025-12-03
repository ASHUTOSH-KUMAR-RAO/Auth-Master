import { Header } from "./header";
import { BackButton } from "./back-button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { AlertCircle, AlertTriangle } from "lucide-react";

export const AuthErrorCard = () => {
  return (
    <div className="relative">
      {/* Animated background gradient blur */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>

      {/* Main card with glassmorphism */}
      <Card className="relative w-[420px] shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/50 rounded-2xl overflow-hidden">
        {/* Top accent line */}
        <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500"></div>

        <CardHeader className="space-y-4 pt-8 pb-6">
          {/* Error icon with animation */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-white to-orange-500 p-4 rounded-full shadow-lg">
                <AlertTriangle className="text-red-400" />
              </div>
            </div>
          </div>

          <Header label="Oops! Something Went Wrong" />

          {/* Optional: Add error description */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400 px-6">
            We encountered an unexpected error. Please try again or return to
            login.
          </p>
        </CardHeader>

        <CardFooter className="pb-8 pt-2">
          <BackButton label="Back to Login" href="/auth/login" />
        </CardFooter>

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-linear from-transparent via-red-500/50 to-transparent"></div>
      </Card>
    </div>
  );
};
