"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { doctorUrl, patientsUrl, reservationUrl } from "@/backend/backend";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPayment } from "@/types/paymentTypes/payment";
import { patient } from "@/types/patientTypes/patient";
import { Doctor } from "@/types/doctorsTypes/doctors";
import { Loader } from "lucide-react";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

interface EditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: IPayment | null;
}

const TransactionDetailsDialog: React.FC<EditDialogProps> = ({
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogClose />
        </DialogHeader>

        {/* Show loading indicator while data is being fetched */}
        {isLoadingReservation || isLoadingPatient || isLoadingDoctor ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
            {/* Replace with your spinner component */}
          </div>
        ) : (
          patient &&
          reservation &&
          doctor && (
            <div className="space-y-4">
              {/* Two-column layout for patient and doctor details */}
              <div className="grid grid-cols-2 gap-4">
                {/* Patient Details */}
                <Card className="border-b pb-4">
                  <CardHeader>
                    <CardTitle>Patient Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Name:</strong>{" "}
                      {patient.first_name + " " + patient.last_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {patient.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {patient.phone}
                    </p>
                  </CardContent>
                </Card>

                {/* Doctor Details */}
                <Card className="border-b pb-4">
                  <CardHeader>
                    <CardTitle>Doctor Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Name:</strong> Dr.{" "}
                      {doctor.first_name + " " + doctor.last_name}
                    </p>

                    <p>
                      <strong>Email:</strong> {doctor.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {doctor.phone}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Appointment Details */}
              <Card className="border-b pb-4">
                <CardHeader>
                  <CardTitle>Appointment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Appointment ID:</strong>{" "}
                    {reservation.appointment.id}
                  </p>
                  <p>
                    <strong>Time Start:</strong>{" "}
                    {formatDateTime(reservation.appointment.time_start)}
                  </p>
                  <p>
                    <strong>Time End:</strong>{" "}
                    {formatDateTime(reservation.appointment.time_end)}
                  </p>
                </CardContent>
              </Card>

              {/* Reservation Details */}
              <Card className="border-b pb-4">
                <CardHeader>
                  <CardTitle>Reservation Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Reservation ID:</strong> {reservation.id}
                  </p>

                  <p>
                    <strong>Created At:</strong>{" "}
                    {formatDateTime(reservation.created_at)}
                  </p>
                </CardContent>
              </Card>
            </div>
          )
        )}
        <DialogFooter className="mt-3">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetailsDialog;
