import { appointment } from "@/types/appointmentTypes/appointments";

export const fields: {
  name: keyof appointment;
  type: string;
  label: string; // This should now be the translation key
  required?: string; // This should now be the translation key for the error message
  validate?: boolean;
  showInAdd?: boolean;
  showInEdit?: boolean;
}[] = [
  {
    name: "time_start",
    type: "datetime-local",
    label: "TimeStart", // Translation key
    required: "TimeRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "time_end",
    type: "datetime-local",
    label: "TimeEnd", // Translation key
    required: "TimeRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: true,
  },
  {
    name: "duration",
    type: "number",
    label: "DurationInMinutes", // Translation key
    required: "DurationRequired", // Translation key for error message
    validate: true,
    showInAdd: true,
    showInEdit: false,
  },
];
