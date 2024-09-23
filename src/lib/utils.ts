import { Role } from "@/types/RolesTypes/role";
import { type ClassValue, clsx } from "clsx";
import Cookies from "js-cookie";

import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatUrl = (str: string): string => {
  return str.toLowerCase().replace(/ /g, "-");
};

export function hasPermission(
  role: Role,
  section: string,
  action: "create" | "read" | "update" | "delete"
): boolean {
  return role?.permissions[section]?.[action] ? true : false;
}
export function formatDateTime(dateTime: string | Date): string {
  const date = new Date(dateTime);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
export const generateDefaultPermissions = (sections: string[]) => {
  return sections.reduce((acc, section) => {
    acc[section] = {
      create: false,
      read: false,
      update: false,
      delete: false,
    };
    return acc;
  }, {} as Record<string, { create: boolean; read: boolean; update: boolean; delete: boolean }>);
};
export const getBadgeClass = (status: string) => {
  switch (status) {
    case "reserved":
      return "bg-black text-white";
    case "visited":
      return "bg-green-500 text-white";
    case "canceled":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-300 text-black";
  }
};
export const generateYears = (startYear: number, endYear: number) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year.toString());
  }
  return years;
};
export const getBaseUrl = () => {
  const subdomain = Cookies.get("subdomain");
  if (subdomain) {
    return `https://${subdomain}.ayadty.com/el3yada_new/api`;
  }
};
