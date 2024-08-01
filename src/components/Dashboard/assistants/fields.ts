import { assistant } from "@/types/assistantTypes/assistants";
export const fields: {
  name: keyof assistant;
  type: string;
  label: string;
  required?: string;
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "first_name",
    type: "text",
    label: "First Name",
    required: "Full name is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
    required: "Full name is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: "Email is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: "Password is required",
    validate: true,
    showInAdd: true,
    showInEdit: false,
  },
  {
    name: "phone",
    type: "text",
    label: "Phone",
    required: "Phone number is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "image",
    type: "file",
    label: "Image",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
];
