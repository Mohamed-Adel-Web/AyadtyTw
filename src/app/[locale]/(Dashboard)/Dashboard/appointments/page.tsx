"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { appointmentUrl, deleteAllAppointmentsUrl } from "@/backend/backend";
import { hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import { appointmentDetails } from "@/types/appointmentTypes/appointments";
import { AddDialog } from "@/components/Dashboard/appointments/AddAppointmentsDialog";
import { EditDialog } from "@/components/Dashboard/appointments/EditAppointmentsDialog";
import SelectDoctorAppointment from "@/components/Dashboard/appointments/SelectDoctorAppointment";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import { CreateColumns } from "@/components/Dashboard/Datatable/columns";
import { DataTable } from "@/components/Dashboard/Datatable/DataTable";
import DeleteDialog from "@/components/Dashboard/generalDialog/DeleteDialog";
import DeleteAllDialog from "@/components/Dashboard/generalDialog/DeleteAllDialog";
import { useTranslations } from "next-intl"; // Import useTranslations
import { useRouter } from "@/i18n/routing";

export default function App() {
  const t = useTranslations("Dashboard.appointment"); // Initialize useTranslations hook
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
  const columns = CreateColumns<appointmentDetails>(
    [
      { key: "id", label: "id" },
      { key: "time_start", label: t("start_time") }, // Use translated text
      { key: "time_end", label: t("end_time") }, // Use translated text
      { key: "status", label: t("status") }, // Use translated text
      { key: "doctor.first_name", label: t("doctor_first_name") }, // Use translated text
      { key: "doctor.last_name", label: t("doctor_last_name") }, // Use translated text
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
        <Heading title={t("appointments")} />

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
            filterPlaceholder={t("filter_placeholder")}
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
                {t("delete_all_appointments")} {/* Use translated text */}
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
