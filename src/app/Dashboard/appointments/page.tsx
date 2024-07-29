"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { appointmentUrl } from "@/backend/backend";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import { useRouter } from "next/navigation";
import { appointmentDetails } from "@/types/appointmentTypes/appointments";
import { AddDialog } from "@/components/Dashboard/appointments/AddAppointmentsDialog";
import { EditDialog } from "@/components/Dashboard/appointments/EditAppointmentsDialog";
import SelectDoctorAppointment from "@/components/Dashboard/appointments/SelectDoctorAppointment";
export default function App() {
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [doctorId, setDoctorId] = React.useState("");
  const [selectedData, setSelectedData] =
    React.useState<appointmentDetails | null>(null);
  let { data } = useGetData(`${appointmentUrl}${doctorId}`, "allAppointment", [
    doctorId,
  ]);
  const appointmentsData = data?.data.data;
  const handleAppointment = (doctorId: string) => {
    setDoctorId(doctorId);
  };
  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleOpenEditDialog = (data: appointmentDetails) => {
    setSelectedData(data);
    setOpenEdit(true);
  };

  const handleOpenDeleteDialog = (data: appointmentDetails) => {
    setSelectedData(data);
    setOpenDelete(true);
  };
  const { user } = useUser();
  const columns = createColumns<appointmentDetails>(
    [
      "time_start",
      "time_end",
      "status",
      "doctor.first_name",
      "doctor.last_name",
    ],
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    "appointment",
    user?.role
  );
  if (user && !hasPermission(user?.role, "appointment", "read")) {
    router.push("/unauthorized");
  }
  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="appointments" />

        {hasPermission(user?.role, "appointment", "create") && (
          <>
            <SelectDoctorAppointment handleAppointment={handleAppointment} />

            <Button onClick={handleOpenAddDialog}>Add New</Button>
          </>
        )}
      </div>
      {appointmentsData && (
        <DataTable
          columns={columns}
          data={appointmentsData}
          filterKeys={["time_start", "time_end", "status", "doctor.full_name"]}
          filterPlaceholder="Filter name..."
        />
      )}

      <AddDialog open={openAdd} onOpenChange={setOpenAdd} />
      <EditDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        appointment={selectedData}
      />
      <DeleteDialog<appointmentDetails>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={appointmentUrl}
        mutationKey="deleteAppointment"
        queryKey="allAppointment"
        itemName="appointment"
      />
    </>
  );
}
