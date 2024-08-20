import { Specialization } from "../specializationsTypes/specialization";
import { Role } from "../RolesTypes/role";

export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  image: File[];
  email: string;
  password: string;
  specialization_id: number;
  role: Role;
  role_id: number;
}
export interface DoctorDetails extends Omit<Doctor, " specialization_id"> {
  specialization: Specialization;
}
export interface IDoctorSetting {
  id:number;
  doctor_id: number;
  api_key_myfatoorah: string;
}
