"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

export const CardWrapper = ({
  backButtonHref,
  children,
  headerLabel,
  backButtonLabel,
  showSocial,
}: {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}) => {
  return (
    <Card
      className="w-[450px] max-h-[90vh] overflow-y-auto shadow-2xl backdrop-blur-xl bg-gradient-to-br from-sky-500/10 via-blue-400/5 to-cyan-500/10 border-sky-300/30 rounded-3xl
    [&::-webkit-scrollbar]:w-2
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-sky-400/30
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:hover:bg-sky-400/50"
    >
      <CardHeader className="pb-4 pt-6">
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent className="px-8 pb-3">{children}</CardContent>

      {showSocial && (
        <CardFooter className="px-8 pb-3 pt-0">
          <Social />
        </CardFooter>
      )}

      <CardFooter className="px-8 pb-6 pt-3 bg-sky-400/5 border-t border-sky-300/20">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
