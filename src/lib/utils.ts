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
  role: Role | undefined,
  section: string,
  action: "create" | "read" | "update" | "delete"
): boolean {
  return role?.permissions[section]?.[action] ?? false;
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
