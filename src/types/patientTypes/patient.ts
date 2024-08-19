import { Role } from "../RolesTypes/role";

export interface patient {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  image: File[];
  role_id:number
}
export interface patientDetails extends Omit<patient, " doctor_id"> {
  doctor: {
    id: number;
    first_name: string;
    last_name: string;
  };
  role: Role;
}
