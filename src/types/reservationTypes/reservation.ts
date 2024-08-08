import { examination } from "./../examinationTypes/examinationTypes";
import {
  appointment,
  appointmentDetails,
} from "@/types/appointmentTypes/appointments";
import { patient, patientDetails } from "./../patientTypes/patient";
import { Doctor } from "../doctorsTypes/doctors";
export interface reservation {
  id: number;
  patient_id: number;
  appointment_id: number;
  examination_id: number;
  status: string;
  created_at: string;
  examination_type: examination;
}
export interface reservationDetails extends reservation {
  patient: patientDetails;
  appointment: appointmentDetails;
  doctor: Doctor;
}
export interface confirmData {
  extra_amount: number;
  comment: string;
}
