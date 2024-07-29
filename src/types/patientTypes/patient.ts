import { Role } from "../RolesTypes/role";

export interface patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  doctor_id: number;
  image: File[];
  role: Role;
}
export interface patientDetails extends Omit<patient, " doctor_id"> {
  doctor: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
