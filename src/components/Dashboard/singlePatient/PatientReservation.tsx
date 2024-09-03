"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { patientReservationUrl, patientsUrl } from "@/backend/backend";
import { useRouter } from "next/navigation";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import { reservationDetails } from "@/types/reservationTypes/reservation";
export default function PatientReservation({
  patientId,
}: {
  patientId: string;
}) {
  const router = useRouter();
  React.useState<reservationDetails | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { data } = useGetData(
    `${patientReservationUrl}/${patientId}`,
    "allPatientReservation",
    [patientId],
    !!patientId,
    page,
    pageSize,
    selectedFilterKey,
    filterValue
  );
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;
  const patientReservationData = data?.data.data || [];

  const { user, role, isSuccess } = useUser();
  const columns = createColumns<reservationDetails>(
    [
      { key: "id", label: " ID" },
      { key: "status", label: "Status" },
      { key: "created_at", label: "Created At" },
      { key: "appointment.time_start", label: "Start Time" },
      { key: "appointment.doctor.first_name", label: "Doctor First Name" },
      { key: "appointment.doctor.last_name", label: "Doctor Last Name" },
    ],

    "patient",
    role,
    undefined,
    undefined
  );
  if (isSuccess && !hasPermission(role, "patient", "read")) {
    router.push("/unauthorized");
  }
  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };
  return (
    <>
      {patientReservationData && (
        <DataTable
          columns={columns}
          data={patientReservationData}
          filterKeys={["id", "first_name", "last_name", "phone", "email"]}
          filterPlaceholder="Filter..."
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onFilterChange={handleFilterChange}
          clickable={false}
        />
      )}
    </>
  );
}
