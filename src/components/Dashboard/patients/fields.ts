import { assistant } from "@/types/assistantTypes/assistants";
import { Doctor } from "@/types/doctorsTypes/doctors";
import { patient } from "@/types/patientTypes/patient";

export const fields: {
  name: keyof patient;
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
    required: "Email name is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "phone",
    type: "phone",
    label: "Phone",
    required: "Phone number is required",
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
    name: "image",
    type: "file",
    label: "Image",
    required: "Image is required",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
];
