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
import AuthProvider from "@/customHooks/loginHooks/useAuth";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useUser();
  const links: LinkItem[] = [
    {
      href: "/Dashboard",
      label: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/MyProfile",
      label: "profile",
      icon: <ShieldBan className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/roles",
      label: "Roles",
      icon: <ShieldBan className="h-5 w-5" />,
      permission: hasPermission(user?.role, "role", "read"),
    },
    {
      href: "/Dashboard/specializations",
      label: "Specializations",
      icon: <SettingsIcon className="h-5 w-5" />,
      permission: hasPermission(user?.role, "specialization", "read"),
    },
    {
      href: "/Dashboard/doctors",
      label: "Doctors",
      icon: <UsersIcon className="h-5 w-5" />,
      permission: hasPermission(user?.role, "doctor", "read"),
    },
    {
      href: "/Dashboard/assistants",
      label: "Assistants",
      icon: <PackageIcon className="h-5 w-5" />,
      permission: hasPermission(user?.role, "assistant", "read"),
    },
    {
      href: "/Dashboard/patients",
      label: "Patients",
      icon: <ShoppingCartIcon className="h-5 w-5" />,
      permission: hasPermission(user?.role, "patient", "read"),
    },
    {
      href: "/Dashboard/appointments",
      label: "Appointments",
      icon: <FileIcon className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/reservations",
      label: "Reservations",
      icon: <FileIcon className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/examinationType",
      label: "Examination Type",
      icon: <FileIcon className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/visits",
      label: "Visits",
      icon: <ListFilterIcon className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/income",
      label: "Income",
      icon: <LineChartIcon className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/expenses",
      label: "Expenses",
      icon: <PackageIcon className="h-5 w-5" />,
      permission: true,
    },
  ];
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar links={links} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header links={links} />
        <main className="grid flex-1 items-start gap-4 p-8 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
