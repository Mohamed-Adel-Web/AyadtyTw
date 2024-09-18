import { RegisterData } from "@/types/AuthTypes/registerTypes";

export const fields: {
  name: keyof RegisterData;
  type: string;
  label: string;
  required: string;
}[] = [
  {
    name: "first_name",
    type: "text",
    label: "firstNameLabel", // Use translation key
    required: "firstNameRequired", // Use translation key
  },
  {
    name: "last_name",
    type: "text",
    label: "lastNameLabel",
    required: "lastNameRequired",
  },
  {
    name: "email",
    type: "email",
    label: "emailLabel",
    required: "emailRequired",
  },
  {
    name: "password",
    type: "password",
    label: "passwordLabel",
    required: "passwordRequired",
  },
  {
    name: "phone",
    type: "text",
    label: "phoneLabel",
    required: "phoneRequired",
  },
  {
    name: "weight",
    type: "number",
    label: "weightLabel",
    required: "weightRequired",
  },
];
