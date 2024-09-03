import { PaymentMethod } from "../reservationTypes/reservation";

export interface IPayment {
  id: number;
  reservation_id: number;
  amount: number;
  extra_amount: number;
  total: number;
  comment:string;
  discount:number;
  status: string;
  created_at: string;
  payment_method: PaymentMethod;
}
