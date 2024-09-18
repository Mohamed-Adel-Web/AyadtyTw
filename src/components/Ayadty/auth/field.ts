import { ISuperAdmin } from "@/types/superAdminTypes/isuperAdmin";

export const fields: {
  name: keyof ISuperAdmin;
  type: string;
  label: string;
  required: string;
}[] = [
  {
    name: "subdomain",
    type: "text",
    label: "Subdomain",
    required: "Subdomain is required",
  },
  {
    name: "first_name",
    type: "text",
    label: "First Name",
    required: "First  name is required",
  },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
    required: "Last  name is required",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: "Email is required",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: "Password is required",
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    required: "Phone number is required",
  },
  {
    name: "clinic_name_en",
    type: "text",
    label: "Clinic Name",
    required: "Clinic Name is required",
  },
];
