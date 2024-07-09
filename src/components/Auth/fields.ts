import { RegisterData } from "@/types/AuthTypes/registerTypes";

export const fields: {
  name: keyof RegisterData;
  type: string;
  label: string;
  required: string;
}[] = [
  {
    name: "full_name",
    type: "text",
    label: "Full Name",
    required: "full  name is required",
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
    name: "weight",
    type: "number",
    label: "Weight",
    required: "Weight is required",
  },
];
