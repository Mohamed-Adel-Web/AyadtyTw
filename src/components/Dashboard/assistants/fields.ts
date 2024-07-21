import { assistant } from "@/types/assistantTypes/assistants";
import { Doctor } from "@/types/doctorsTypes/doctors";

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
    name: "full_name",
    type: "text",
    label: "Full Name",
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
