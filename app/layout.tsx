import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import UserDropdown from "./components/UserDropdown";
import "./globals.css";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = { title: "Skill Swap" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(inter.className, "flex flex-col h-screen w-screen")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex items-center p-2.5 border-b mb-2 bg-popover gap-2">
            <Link className="font-bold text-2xl mr-auto" href="/">
              Skill Swap
            </Link>
            <ModeToggle />
            <Suspense fallback={<Skeleton className="w-9 h-9" />}>
              <UserDropdown />
            </Suspense>
          </div>
          <main className="p-2 w-full max-w-xl mx-auto flex flex-col grow items-center justify-center">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
