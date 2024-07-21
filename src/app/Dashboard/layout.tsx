"use client";

import { ReactNode } from "react";

import {
  HomeIcon,
  SettingsIcon,
  UsersIcon,
  PackageIcon,
  ShoppingCartIcon,
  FileIcon,
  ListFilterIcon,
  LineChartIcon,
  ShieldBan,
} from "lucide-react";
import Sidebar from "@/components/Dashboard/DashboardLayout/DashboardSidebar";
import Header from "@/components/Dashboard/DashboardLayout/DashboardHeader";
import { LinkItem } from "@/types/linkItem";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const links: LinkItem[] = [
    {
      href: "/Dashboard",
      label: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      href: "/Dashboard/roles",
      label: "Roles",
      icon: <ShieldBan className="h-5 w-5" />,
    },
    {
      href: "/Dashboard/specializations",
      label: "Specializations",
      icon: <SettingsIcon className="h-5 w-5" />,
    },
    {
      href: "/Dashboard/doctors",
      label: "Doctors",
      icon: <UsersIcon className="h-5 w-5" />,
    },
    {
      href: "/Dashboard/assistants",
      label: "Assistants",
      icon: <PackageIcon className="h-5 w-5" />,
    },
    {
      href: "/Dashboard/patients",
      label: "Patients",
      icon: <ShoppingCartIcon className="h-5 w-5" />,
    },
    {
      href: "/Dashboard/appointments",
      label: "Appointments",
      icon: <FileIcon className="h-5 w-5" />,
    },
    {
      href: "/Dashboard/visits",
      label: "Visits",
      icon: <ListFilterIcon className="h-5 w-5" />,
    },
    {
      href: "/Dashboard/income",
      label: "Income",
      icon: <LineChartIcon className="h-5 w-5" />,
    },
    {
      href: "/Dashboard/expenses",
      label: "Expenses",
      icon: <PackageIcon className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar links={links} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header links={links} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
