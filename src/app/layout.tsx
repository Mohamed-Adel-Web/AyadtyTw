"use client";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/customHooks/loginHooks/useAuth";
import NavBarLayout from "@/components/Ayadty/navbar/NavbarLayout";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <NavBarLayout />
            <main>
              <div className="container">{children}</div>
            </main>

            <Toaster />
          </body>
        </QueryClientProvider>
      </AuthProvider>
    </html>
  );
}
