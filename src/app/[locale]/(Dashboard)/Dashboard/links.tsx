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
export const links = (role: Role) => {
  return [
    {
      href: "/Dashboard",
      label: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
      permission: role?.name == "superAdmin",
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
      permission: hasPermission(role, "income", "read"),
    },
  ];
};
