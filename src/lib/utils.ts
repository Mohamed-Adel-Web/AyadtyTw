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
  role: Role |undefined,
  section: string,
  action: "create" | "read" | "update" | "delete"
): boolean {
  return role?.permissions[section]?.[action] ?? false;
}
