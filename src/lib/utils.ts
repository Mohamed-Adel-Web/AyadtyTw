import { Role } from "@/types/RolesTypes/role";
import { type ClassValue, clsx } from "clsx";
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
export function formatDateTime(dateTime: string): string {
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
