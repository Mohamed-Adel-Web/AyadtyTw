"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { appointmentUrl, deleteAllAppointmentsUrl } from "@/backend/backend";
import { hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import { useRouter } from "next/navigation";
import { appointmentDetails } from "@/types/appointmentTypes/appointments";
import { AddDialog } from "@/components/Dashboard/appointments/AddAppointmentsDialog";
import { EditDialog } from "@/components/Dashboard/appointments/EditAppointmentsDialog";
import SelectDoctorAppointment from "@/components/Dashboard/appointments/SelectDoctorAppointment";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import { createColumns } from "@/components/Dashboard/Datatable/columns";
import { DataTable } from "@/components/Dashboard/Datatable/DataTable";
import DeleteDialog from "@/components/Dashboard/generalDialog/DeleteDialog";
import DeleteAllDialog from "@/components/Dashboard/generalDialog/DeleteAllDialog";
export default function App() {
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openDeleteAll, setOpenDeleteAll] = React.useState(false);
  const [doctorId, setDoctorId] = React.useState("");
  const [selectedData, setSelectedData] =
    React.useState<appointmentDetails | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  let { data } = useGetData(
    `${appointmentUrl}${doctorId}`,
    "allAppointment",
    [doctorId],
    true,
    page,
    pageSize
  );
  const appointmentsData = data?.data.data || [];
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;
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
  const handleOpenDeleteAllDialog = () => {
    setOpenDeleteAll(true);
  };
  const { user, role, isSuccess } = useUser();
  const columns = createColumns<appointmentDetails>(
    [
      { key: "id", label: "id" },
      { key: "time_start", label: "Start time" },
      { key: "time_end", label: "End time" },
      { key: "status", label: "Status" },
      { key: "doctor.first_name", label: "Doctor first name" },
      { key: "doctor.last_name", label: "Doctor last name" },
    ],

    "appointment",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );
  if (isSuccess && !hasPermission(role, "appointment", "read")) {
    router.push("/unauthorized");
  }
  return (
    <>
      <TableHeadLayout>
        <Heading title="appointments" />

        {hasPermission(role, "appointment", "create") && (
          <>
            <SelectDoctorAppointment handleAppointment={handleAppointment} />

            <AddButton handleAddDialog={handleOpenAddDialog} />
          </>
        )}
      </TableHeadLayout>{" "}
      {appointmentsData && (
        <>
          <DataTable
            columns={columns}
            data={appointmentsData}
            filterKeys={["id"]}
            filterPlaceholder="Filter name..."
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
            totalRecords={totalRecords}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
          <div className="flex justify-end my-2">
            {appointmentsData.length > 0 && (
              <Button
                className="inline"
                variant={"destructive"}
                onClick={handleOpenDeleteAllDialog}
              >
                Delete All Appointment
              </Button>
            )}
          </div>
        </>
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
      <DeleteAllDialog
        open={openDeleteAll}
        onOpenChange={setOpenDeleteAll}
        url={deleteAllAppointmentsUrl}
        mutationKey="deleteAllAppointment"
        queryKey="allAppointment"
        itemName="appointment"
      />
    </>
  );
}
