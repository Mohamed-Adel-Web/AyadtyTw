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
  UserIcon,
  KeyIcon,
  StarIcon,
  UserPlusIcon,
  UserCogIcon,
  CalendarIcon,
  CalendarCheckIcon,
  ClipboardIcon,
  MapPinIcon,
  DollarSignIcon,
  BriefcaseMedicalIcon,
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
  const { user, role } = useUser();

  const links: LinkItem[] = [
    {
      href: "/Dashboard",
      label: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/MyProfile",
      label: "Profile",
      icon: <UserIcon className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/roles",
      label: "Roles",
      icon: <KeyIcon className="h-5 w-5" />,
      permission: role?.name == "superAdmin",
    },
    {
      href: "/Dashboard/specializations",
      label: "Specializations",
      icon: <StarIcon className="h-5 w-5" />,
      permission: hasPermission(role, "specialization", "read"),
    },
    {
      href: "/Dashboard/doctors",
      label: "Doctors",
      icon: <UserPlusIcon className="h-5 w-5" />,
      permission: hasPermission(role, "doctor", "read"),
    },
    {
      href: "/Dashboard/assistants",
      label: "Assistants",
      icon: <UserCogIcon className="h-5 w-5" />,
      permission: hasPermission(role, "assistant", "read"),
    },
    {
      href: "/Dashboard/patients",
      label: "Patients",
      icon: <UserIcon className="h-5 w-5" />,
      permission: hasPermission(role, "patient", "read"),
    },
    {
      href: "/Dashboard/vital-history",
      label: "Vital History",
      icon: <BriefcaseMedicalIcon className="h-5 w-5" />,
      permission: hasPermission(role, "patient", "read"),
    },
    {
      href: "/Dashboard/appointments",
      label: "Appointments",
      icon: <CalendarIcon className="h-5 w-5" />,
      permission: hasPermission(role, "appointment", "read"),
    },
    {
      href: "/Dashboard/reservations",
      label: "Reservations",
      icon: <CalendarCheckIcon className="h-5 w-5" />,
      permission: hasPermission(role, "reservation", "read"),
    },
    {
      href: "/Dashboard/examinationType",
      label: "Examination Type",
      icon: <ClipboardIcon className="h-5 w-5" />,
      permission: hasPermission(role, "examination Type", "read"),
    },
    {
      href: "/Dashboard/visits",
      label: "Visits",
      icon: <MapPinIcon className="h-5 w-5" />,
      permission: hasPermission(role, "visits", "read"),
    },
    {
      href: "/Dashboard/income",
      label: "Income",
      icon: <DollarSignIcon className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/expenses",
      label: "Expenses",
      icon: <DollarSignIcon className="h-5 w-5" />,
      permission: true,
    },
  ];
  const filteredLinks = links.filter((link) => link.permission);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar links={filteredLinks} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header links={filteredLinks} />
        <main className="grid flex-1 items-start gap-4 p-8 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
