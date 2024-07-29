import { Role } from "../RolesTypes/role";
export interface assistant {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  doctor_id: number;
  image: File[];
}
export interface assistantDetails extends Omit<assistant, " doctor_id"> {
  doctor: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
