"use client";
import { useState } from "react";
import { reservation } from "@/types/reservationTypes/reservation";
import useGetData from "@/customHooks/crudHooks/useGetData";
import {
  appointmentUrl,
  doctorReservationsUrl,
  patientsUrl,
} from "@/backend/backend";
import { DataTable } from "../../Datatable/DataTable";
import { CreateColumns } from "../../Datatable/columns";
import useUser from "@/customHooks/loginHooks/useUser";
import AppointmentDetails from "./AppointementDetails";
import PatientDetails from "./PatientDetails";
import { useTranslations } from "next-intl"; // Import useTranslations

export default function DoctorProfileReservation({
  doctorId,
}: {
  doctorId: number;
}) {
  const { role } = useUser();

  const t = useTranslations("Dashboard.profile.DoctorProfileReservation"); // Initialize useTranslations hook
  const [patientId, setPatientId] = useState<number | null>(null);
  const [appointmentId, setAppointmentId] = useState<number | null>(null);
  const { data, isLoading: isLoadingReservation } = useGetData(
    doctorId ? `${doctorReservationsUrl}/${doctorId}` : "",
    "reservationDetails",
    [doctorId],
    !!doctorId
  );
  const { data: appointmentDetails, isLoading: isLoadingAppointment } =
    useGetData(
      appointmentId ? `${appointmentUrl}/${appointmentId}` : "",
      "appointmentDetails",
      [appointmentId],
      !!appointmentId
    );
  const { data: patientDetails, isLoading: isLoadingPatient } = useGetData(
    patientId ? `${patientsUrl}/${patientId}` : "",
    "patientDetails",
    [patientId],
    !!patientId
  );
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;
  const reservations = data?.data.data || [];
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedFilterKey, setSelectedFilterKey] = useState<string>();
  const [filterValue, setFilterValue] = useState<string>("");

  const handleViewPatientDetails = (reservation: reservation) => {
    setPatientId(reservation.patient_id);
  };
  const handleViewAppointmentDetails = (reservation: reservation) => {
    setAppointmentId(reservation.appointment_id);
  };
  const columns = CreateColumns<reservation>(
    [
      { key: "id", label: t("id") }, // Translated
      { key: "patient_id", label: t("patientId") }, // Translated
      { key: "status", label: t("status") }, // Translated
      { key: "created_at", label: t("createdAt") }, // Translated
      { key: "examination_type.amount", label: t("examinationAmount") }, // Translated
      { key: "examination_type.name", label: t("examinationType") }, // Translated
    ],
    "reservation",
    role,
    undefined,
    undefined,
    undefined,
    undefined,
    handleViewPatientDetails,
    handleViewAppointmentDetails
  );

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };

  const handleCloseModal = () => {
    setPatientId(null);
    setAppointmentId(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen shadow-lg rounded-lg">
      <DataTable
        columns={columns}
        data={reservations}
        filterKeys={["name"]}
        filterPlaceholder={t("filterPlaceholder")} // Translated
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        totalRecords={totalRecords}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onFilterChange={handleFilterChange}
      />
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
