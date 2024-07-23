export interface appointment {
  id: number;
  time_start: Date;
  time_end: Date;
  duration: number;
  status: string;
  doctor_id: number;
}

export interface appointmentDetails extends Omit<appointment, "doctor_id"> {
  doctor: {
    id: number;
    full_name: string;
  };
}
