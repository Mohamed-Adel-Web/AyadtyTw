import { assistant } from "@/types/assistantTypes/assistants";
import { Doctor } from "@/types/doctorsTypes/doctors";
import { patient } from "@/types/patientTypes/patient";
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
    label: "Pressure",
    required: "Pressure is required",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "blood_sugar",
    type: "number",
    label: "Blood Sugar",
    required: "Blood Sugar is required",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "weight",
    type: "number",
    label: "Weight",
    required: "Weight is required",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "date",
    type: "date",
    label: "Date",
    required: "Date is required",
    validate: false,
    showInAdd: true,
    showInEdit: true,
  },

];
