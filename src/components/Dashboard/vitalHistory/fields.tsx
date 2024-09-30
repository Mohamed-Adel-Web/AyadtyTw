import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";

export const fields: {
  name: keyof IVitalHistory;
  type: string;
  label: string;
  required?: string;
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "pressure",
    type: "number",
    label: "pressure", // Translation key for the label
    required: "pressureRequired", // Translation key for the required message
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "blood_sugar",
    type: "number",
    label: "bloodSugar", // Translation key for the label
    required: "bloodSugarRequired", // Translation key for the required message
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "weight",
    type: "number",
    label: "weight", // Translation key for the label
    required: "weightRequired", // Translation key for the required message
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "date",
    type: "date",
    label: "date", // Translation key for the label
    required: "dateRequired", // Translation key for the required message
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
];
