"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { patientsUrl } from "@/backend/backend";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { AddDialog } from "@/components/Dashboard/patients/AddPateintDialog";
import { EditDialog } from "@/components/Dashboard/patients/EditPatientDialog";
import { patient, patientDetails } from "@/types/patientTypes/patient";
import { useRouter } from "next/navigation";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
export default function App() {
  const router = useRouter();
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
      { key: "id", label: "id" },
      { key: "first_name", label: "First Name" },
      { key: "last_name", label: "last Name" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
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
        <Heading title="Patients" />
        {hasPermission(role, "patient", "create") ? (
          <AddButton handleAddDialog={handleOpenAddDialog} />
        ) : (
          ""
        )}
      </TableHeadLayout>
      {patientsData && (
        <DataTable
          columns={columns}
          data={patientsData}
          filterKeys={["id", "first_name", "last_name", "phone", "email"]}
          filterPlaceholder="Filter..."
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
        itemName="patient"
      />
    </>
  );
}
