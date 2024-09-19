import { assistant } from "@/types/assistantTypes/assistants";

export const fields: {
  name: keyof assistant;
  type: string;
  label: string; // This should now be the translation key
  required?: string; // This should now be the translation key for the error message
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "first_name",
    type: "text",
    label: "FirstName", // Translation key
    required: "FirstNameRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "last_name",
    type: "text",
    label: "LastName", // Translation key
    required: "LastNameRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email", // Translation key
    required: "EmailRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password", // Translation key
    required: "PasswordRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: false,
  },
  {
    name: "phone",
    type: "text",
    label: "Phone", // Translation key
    required: "PhoneRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "image",
    type: "file",
    label: "Image", // Translation key
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
];
