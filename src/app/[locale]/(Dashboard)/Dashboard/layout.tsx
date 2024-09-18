"use client";
import { ReactNode } from "react";

import Sidebar from "@/components/Dashboard/DashboardLayout/DashboardSidebar";
import Header from "@/components/Dashboard/DashboardLayout/DashboardHeader";
import { LinkItem } from "@/types/linkItem";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import AuthProvider from "@/customHooks/loginHooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
interface DashboardLayoutProps {
  children: ReactNode;
}
const queryClient = new QueryClient();

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Sidebar  />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <Header  />
            <main className="grid flex-1 items-start gap-4 p-8 sm:px-6 sm:py-0 md:gap-8 bg-[#e4e1e1a1] min-h-lvh">
              <div className="container   p-5">{children}</div>
            </main>
          </div>
        </div>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
