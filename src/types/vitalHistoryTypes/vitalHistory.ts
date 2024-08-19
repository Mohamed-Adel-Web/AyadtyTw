import { patient } from "@/types/patientTypes/patient";
export interface IVitalHistory {
  id: number;
  patient_id: number;
 doctor_id: number;
  pressure: number;
  weight: number;
  blood_sugar: number;
  report: string;
  date: Date;
  patient: patient;
}
