import {
  appointment,
  appointmentDetails,
} from "@/types/appointmentTypes/appointments";
import { patient, patientDetails } from "./../patientTypes/patient";
export interface reservation {
  id: number;
  patient_id: number;
  appointment_id: number;
}
export interface reservationDetails extends reservation {
  patient: patientDetails;
  appointment: appointmentDetails;
}
