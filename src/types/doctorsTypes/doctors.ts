import { OmitKeyof } from "@tanstack/react-query";
import { omit } from "lodash";
import { Specialization } from "../specializationsTypes/specialization";

export interface Doctor {
  id: number;
  full_name: string;
  phone: string;
  image: File[];
  email: string;
  password: string;
  specialization_id: number;
  consultant_price: number;
  disclosure_price: number;
}
export interface DoctorDetails extends Omit<Doctor, " specialization_id"> {
  specialization: Specialization;
}
