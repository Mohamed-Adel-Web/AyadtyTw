export interface examination {
  id: number;
  name: string;
  amount: number;
  color: string;
  doctor_id: number;
}
export interface examinationDetails extends Omit<examination, "doctor_id"> {
  doctor: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
