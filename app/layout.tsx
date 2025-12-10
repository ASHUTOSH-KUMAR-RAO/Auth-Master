import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SecureAuth - Enterprise Two-Factor Authentication",
    template: "%s | SecureAuth",
  },
  description:
    "Enterprise-grade authentication system with Two-Factor Authentication (2FA), email verification, and secure credential management. Built by Ashutosh Kumar Rao.",
  keywords: [
    "authentication",
    "2FA",
    "two-factor authentication",
    "security",
    "nextauth",
    "Next.js",
    "login",
    "signup",
  ],
  authors: [{ name: "Ashutosh Kumar Rao" }],
  creator: "Ashutosh Kumar Rao",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "Deployement Link",
    title: "SecureAuth - Enterprise Two-Factor Authentication",
    description:
      "Secure your applications with enterprise-grade 2FA authentication",
    siteName: "SecureAuth",
  },
  twitter: {
    card: "summary_large_image",
    title: "SecureAuth - Enterprise Authentication",
    description: "Enterprise-grade 2FA authentication system",
    creator: "@ashutoshrao",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
