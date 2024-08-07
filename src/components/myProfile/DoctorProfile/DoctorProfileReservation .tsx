"use client";
import { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { reservation } from "@/types/reservationTypes/reservation";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { appointmentUrl, patientsUrl } from "@/backend/backend";
import PatientDetails from "./PatientDetails";
import AppointmentDetails from "./AppointementDetails";

export default function DoctorProfileReservation({
  reservations,
}: {
  reservations: reservation[];
}) {
  const [patientId, setPatientId] = useState<number | null>(null);
  const [appointmentId, setAppointmentId] = useState<number | null>(null);

  const { data: patientDetails, isLoading: isLoadingPatient } = useGetData(
    patientId ? `${patientsUrl}/${patientId}` : "",
    "patientDetails",
    [patientId],
    !!patientId
  );

  const { data: appointmentDetails, isLoading: isLoadingAppointment } =
    useGetData(
      appointmentId ? `${appointmentUrl}/${appointmentId}` : "",
      "appointmentDetails",
      [appointmentId],
      !!appointmentId
    );

  const handleViewPatientDetails = (patientId: number) => {
    setPatientId(patientId);
  };

  const handleViewAppointmentDetails = (appointmentId: number) => {
    setAppointmentId(appointmentId);
  };

  const handleCloseModal = () => {
    setPatientId(null);
    setAppointmentId(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Reservations</h2>
      {reservations.length === 0 ? (
        <p className="text-gray-500">No reservations for today.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation: reservation) => (
            <Card
              key={reservation.id}
              className="shadow-lg rounded-lg transition transform hover:scale-105"
            >
              <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-lg">
                <CardTitle className="text-xl text-gray-700">
                  Reservation at{" "}
                  {format(new Date(reservation.created_at), "PPpp")}
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <p className="text-gray-600">
                  <strong>Patient ID:</strong> {reservation.patient_id}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      reservation.status == "reserved"
                        ? "text-green-700  bg-green-200  "
                        : "text-red-700 bg-red-200"
                    } py-1 px-2 rounded inline-block font-extrabold`}
                  >
                    {" "}
                    {reservation.status}
                  </span>
                </p>
                {reservation.examination_type && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-md  bg-slate-300">
                    <p className="text-gray-700 font-semibold">
                      Examination Type
                    </p>
                    <p className="text-gray-600">
                      <strong>Name:</strong> {reservation.examination_type.name}
                    </p>
                    <p className="text-gray-600">
                      <strong>Amount:</strong>{" "}
                      {reservation.examination_type.amount}
                    </p>
                    <div
                      className="w-6 h-6 mt-2 rounded-full "
                      style={{
                        backgroundColor: reservation.examination_type.color,
                      }}
                    ></div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-b-lg space-x-2 p-2">
                <Button
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  onClick={() =>
                    handleViewPatientDetails(reservation.patient_id)
                  }
                >
                  View Patient Details
                </Button>
                <Button
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                  onClick={() =>
                    handleViewAppointmentDetails(reservation.appointment_id)
                  }
                >
                  View Appointment Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {patientId && patientDetails && (
        <PatientDetails
          patientDetails={patientDetails.data.data}
          onClose={handleCloseModal}
        />
      )}

      {appointmentId && appointmentDetails && (
        <AppointmentDetails
          appointmentDetails={appointmentDetails.data.data}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
