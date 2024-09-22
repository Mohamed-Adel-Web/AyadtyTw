"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { patientsUrl } from "@/backend/backend";
import { AddDialog } from "@/components/Dashboard/patients/AddPateintDialog";
import { EditDialog } from "@/components/Dashboard/patients/EditPatientDialog";
import { patient, patientDetails } from "@/types/patientTypes/patient";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import { createColumns } from "@/components/Dashboard/Datatable/columns";
import { DataTable } from "@/components/Dashboard/Datatable/DataTable";
import DeleteDialog from "@/components/Dashboard/generalDialog/DeleteDialog";
import { useTranslations } from "next-intl"; // Import useTranslations
import Heading from "@/components/Dashboard/DashboardLayout/Heading";

export default function App() {
  const router = useRouter();
  const t = useTranslations("Dashboard.Patients"); 

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<patientDetails | null>(
    null
  );
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");

  const { data } = useGetData(
    patientsUrl,
    "allPatient",
    [],
    true,
    page,
    pageSize,
    selectedFilterKey,
    filterValue
  );

  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;
  const patientsData = data?.data.data || [];

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleOpenEditDialog = (data: patientDetails) => {
    setSelectedData(data);
    setOpenEdit(true);
  };

  const handleOpenDeleteDialog = (data: patientDetails) => {
    setSelectedData(data);
    setOpenDelete(true);
  };

  const { user, role, isSuccess } = useUser();

  const columns = createColumns<patientDetails>(
    [
      { key: "id", label: t("id") },
      { key: "first_name", label: t("firstName") },
      { key: "last_name", label: t("lastName") },
      { key: "phone", label: t("phone") },
      { key: "email", label: t("email") },
    ],
    "patient",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog
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
      <TableHeadLayout>
        <Heading title={t("patients")} /> {/* Translated */}
        {/* {hasPermission(role, "patient", "create") && ( */}
          <AddButton handleAddDialog={handleOpenAddDialog} />
        {/* )} */}
      </TableHeadLayout>
      {patientsData && (
        <DataTable
          columns={columns}
          data={patientsData}
          filterKeys={["id", "first_name", "last_name", "phone", "email"]}
          filterPlaceholder={t("filterPlaceholder")} // Translated
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onFilterChange={handleFilterChange}
          clickable={true}
        />
      )}

      <AddDialog open={openAdd} onOpenChange={setOpenAdd} />
      <EditDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        patient={selectedData}
      />
      <DeleteDialog<patient>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={patientsUrl}
        mutationKey="deletePatient"
        queryKey="allPatient"
        itemName={t("deletePatient")} // Translated
      />
    </>
  );
}
