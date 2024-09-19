import { hasPermission } from "@/lib/utils";
import { Role } from "@/types/RolesTypes/role";
import {
  HomeIcon,
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
import { useTranslations } from "next-intl";

export const Links = (role: Role) => {
  const t = useTranslations("Dashboard.links"); // Initialize useTranslations hook

  return [
    {
      href: "/Dashboard",
      label: t("Home"), // Use translation key
      icon: <HomeIcon className="h-5 w-5" />,
      permission: role?.name == "superAdmin",
    },
    {
      href: "/Dashboard/MyProfile",
      label: t("Profile"),
      icon: <UserIcon className="h-5 w-5" />,
      permission: true,
    },
    {
      href: "/Dashboard/roles",
      label: t("Roles"),
      icon: <KeyIcon className="h-5 w-5" />,
      permission: role?.name == "superAdmin",
    },
    {
      href: "/Dashboard/specializations",
      label: t("Specializations"),
      icon: <StarIcon className="h-5 w-5" />,
      permission: hasPermission(role, "specialization", "read"),
    },
    {
      href: "/Dashboard/doctors",
      label: t("Doctors"),
      icon: <UserPlusIcon className="h-5 w-5" />,
      permission: hasPermission(role, "doctor", "read"),
    },
    {
      href: "/Dashboard/assistants",
      label: t("Assistants"),
      icon: <UserCogIcon className="h-5 w-5" />,
      permission: hasPermission(role, "assistant", "read"),
    },
    {
      href: "/Dashboard/patients",
      label: t("Patients"),
      icon: <UserIcon className="h-5 w-5" />,
      permission: hasPermission(role, "patient", "read"),
    },
    {
      href: "/Dashboard/vital-history",
      label: t("VitalHistory"),
      icon: <BriefcaseMedicalIcon className="h-5 w-5" />,
      permission: hasPermission(role, "patient", "read"),
    },
    {
      href: "/Dashboard/appointments",
      label: t("Appointments"),
      icon: <CalendarIcon className="h-5 w-5" />,
      permission: hasPermission(role, "appointment", "read"),
    },
    {
      href: "/Dashboard/reservations",
      label: t("Reservations"),
      icon: <CalendarCheckIcon className="h-5 w-5" />,
      permission: hasPermission(role, "reservation", "read"),
    },
    {
      href: "/Dashboard/examinationType",
      label: t("ExaminationType"),
      icon: <ClipboardIcon className="h-5 w-5" />,
      permission: hasPermission(role, "examination Type", "read"),
    },
    {
      href: "/Dashboard/visits",
      label: t("Visits"),
      icon: <MapPinIcon className="h-5 w-5" />,
      permission: hasPermission(role, "visits", "read"),
    },
    {
      href: "/Dashboard/income",
      label: t("Income"),
      icon: <DollarSignIcon className="h-5 w-5" />,
      permission: hasPermission(role, "income", "read"),
    },
  ];
};
