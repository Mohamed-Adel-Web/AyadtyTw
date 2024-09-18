"use client";
import * as React from "react";
import useGetData from "@/customHooks/crudHooks/useGetData";
import {
  doctorUrl,
  examinationTypeUrl,
  patientsUrl,
  reservationUrl,
} from "@/backend/backend";
import { IPayment } from "@/types/paymentTypes/payment";
import { patient } from "@/types/patientTypes/patient";
import { Doctor } from "@/types/doctorsTypes/doctors";
import PremiumPatientInvoice from "./PremiumPatientInvoice";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import LoadingSpinner from "../Common/LoadingSpinner";

interface TransactionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: IPayment | null;
}
const TransactionDetailsDialog: React.FC<TransactionDetailsDialogProps> = ({
  open,
  onOpenChange,
  payment,
}) => {
  const { data: reservationData, isLoading: isLoadingReservation } = useGetData(
    `${reservationUrl}/${payment?.reservation_id}`,
    "transactionDetails",
    [payment?.reservation_id],
    !!payment?.reservation_id
  );
  const reservation = reservationData?.data.data;
  const { data: examinationData, isLoading: isLoadingExamination } = useGetData(
    `${examinationTypeUrl}/${reservation?.examination_id}`,
    "transactionDetails",
    [reservation?.examination_id],
    !!reservation?.examination_id
  );
  const examination = examinationData?.data;

  const { data: patientData, isLoading: isLoadingPatient } = useGetData(
    `${patientsUrl}/${reservation?.patient_id}`,
    "transactionDetails",
    [reservation?.patient_id],
    !!reservation?.patient_id
  );
  const patient: patient = patientData?.data.data;

  const { data: doctorData, isLoading: isLoadingDoctor } = useGetData(
    `${doctorUrl}/${reservation?.appointment.doctor_id}`,
    "transactionDetails",
    [reservation?.appointment.doctor_id],
    !!reservation?.appointment.doctor_id
  );
  const doctor: Doctor = doctorData?.data.data;

  if (
    isLoadingReservation ||
    isLoadingPatient ||
    isLoadingDoctor ||
    isLoadingExamination
  ) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side={"top"} className="w-[500px] sm:w-full  ">
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={"top"} className="w-[500px] sm:w-full  ">
        {patient && reservation && doctor && payment && examination && (
          <PremiumPatientInvoice
            payment={payment}
            patient={patient}
            doctor={doctor}
            reservation={reservation}
            examination={examination}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default TransactionDetailsDialog;
