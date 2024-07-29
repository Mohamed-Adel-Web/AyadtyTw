import { Doctor } from "@/types/doctorsTypes/doctors";
import { examination } from "@/types/examinationTypes/examinationTypes";

export const fields: {
  name: keyof examination;
  type: string;
  label: string;
  required?: string;
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "name",
    type: "text",
    label: "Name",
    required: "Full name is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "amount",
    type: "number",
    label: "amount",
    required: "Full name is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "color",
    type: "color",
    label: "Color",
    required: "Email is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },

];
