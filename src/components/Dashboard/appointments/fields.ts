import { appointment } from "@/types/appointmentTypes/appointments";

export const fields: {
  name: keyof appointment;
  type: string;
  label: string;
  required?: string;
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "time_start",
    type: "datetime-local",
    label: "Time Start",
    required: "Time is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "time_end",
    type: "datetime-local",
    label: "Time End",
    required: "Time is required",
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "duration",
    type: "number",
    label: "Duration in minutes",
    required: "Duration is required",
    validate: true,
    showInAdd: true,
    showInEdit: false,
  },
];
