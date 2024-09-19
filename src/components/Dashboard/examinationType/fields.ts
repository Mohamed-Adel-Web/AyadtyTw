import { examination } from "@/types/examinationTypes/examinationTypes";

export const fields: {
  name: keyof examination;
  type: string;
  label: string; // Translation key
  required?: string; // Translation key for error message
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "name",
    type: "text",
    label: "Name", // Translation key
    required: "NameRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "amount",
    type: "number",
    label: "Amount", // Translation key
    required: "AmountRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "color",
    type: "color",
    label: "Color", // Translation key
    required: "ColorRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
];
