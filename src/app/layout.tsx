
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dna, BarChart2, Home as HomeIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Korea Lotto Analysis",
  description: "Advanced statistics and number generation for Korea Lotto 6/45",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <div className="mr-4 flex">
              <Link className="mr-6 flex items-center space-x-2" href="/">
                <span className="font-bold sm:inline-block">🎱 WinLotto</span>
              </Link>
              <nav className="flex items-center gap-4 text-sm lg:gap-6">
                <Link href="/generate" className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
                  <Dna className="w-4 h-4" /> Generate
                </Link>
                <Link href="/analytics" className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4" /> Analytics
                </Link>
              </nav>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
