"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/action/new-verification";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isVerifying, setIsVerifying] = useState(true);
  const [progress, setProgress] = useState(0);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  // Simulated progress animation
  useEffect(() => {
    if (isVerifying && !success && !error) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return 90;
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    } else if (success || error) {
      setProgress(100);
    }
  }, [isVerifying, success, error]);

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token");
      setIsVerifying(false);
      return;
    }

    newVerification(token)
      .then((data) => {
        setTimeout(() => {
          setSuccess(data.success);
          setError(data.error);
          setIsVerifying(false);
        }, 1500); // Add slight delay for better UX
      })
      .catch(() => {
        setTimeout(() => {
          setError("Something Went Wrong");
          setIsVerifying(false);
        }, 1500);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Email Verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex flex-col items-center w-full justify-center space-y-6 py-4">
        {/* Animated Icon */}
        <div className="relative">
          {isVerifying && !success && !error && (
            <div className="relative">
              <div className="absolute inset-0 animate-ping">
                <ShieldCheck className="w-16 h-16 text-blue-500 opacity-20" />
              </div>
              <ShieldCheck className="w-16 h-16 text-blue-500 animate-pulse relative z-10" />
            </div>
          )}

          {success && (
            <div className="animate-bounce">
              <CheckCircle2 className="w-16 h-16 text-green-500 animate-in zoom-in duration-500" />
            </div>
          )}

          {error && !success && (
            <div className="animate-shake">
              <XCircle className="w-16 h-16 text-red-500 animate-in zoom-in duration-500" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {isVerifying && !success && !error && (
          <div className="w-full max-w-xs">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Status Messages */}
        <div className="text-center space-y-2 min-h-[80px] flex flex-col justify-center">
          {isVerifying && !success && !error && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                <p className="text-sm font-medium text-gray-700">
                  Verifying your email...
                </p>
              </div>
              <p className="text-xs text-gray-500">
                This will only take a moment
              </p>
            </div>
          )}

          {success && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-green-800 mb-1">
                  🎉 Success!
                </p>
                <p className="text-xs text-green-700">{success}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <Mail className="w-4 h-4" />
                <span>Redirecting you to login...</span>
              </div>
            </div>
          )}

          {error && !success && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-red-800 mb-1">
                  ⚠️ Verification Failed
                </p>
                <p className="text-xs text-red-700">{error}</p>
              </div>
              <p className="text-xs text-gray-600">
                Please try again or contact support
              </p>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>
    </CardWrapper>
  );
};
