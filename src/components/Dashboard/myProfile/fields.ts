import { assistant } from "@/types/assistantTypes/assistants";
import { Doctor, DoctorDetails } from "@/types/doctorsTypes/doctors";
import { patient, patientDetails } from "@/types/patientTypes/patient";

export const fields: {
  name: keyof  DoctorDetails ;
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
    label: "firstName",
    required: "First name is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "last_name",
    type: "text",
    label: "lastName",
    required: "last name is required",
    validate: true,
  },
  {
    name: "email",
    type: "email",
    label: "email",
    required: "Email name is required",
    validate: true,
  },
  {
    name: "phone",
    type: "phone",
    label: "phone",
    required: "Phone number is required",
    validate: true,
  },

  {
    name: "image",
    type: "file",
    label: "image",
    required: "Image is required",
    validate: false,
  },
];
