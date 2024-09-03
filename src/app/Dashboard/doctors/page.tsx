"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { doctorUrl } from "@/backend/backend";
import { Doctor, DoctorDetails } from "@/types/doctorsTypes/doctors";
import { AddDialog } from "@/components/Dashboard/doctors/AddDoctorDialog";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { EditDialog } from "@/components/Dashboard/doctors/EditDoctorDialog";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import { useRouter } from "next/navigation";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";

export default function App() {
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<DoctorDetails | null>(
    null
  );
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");

  const { data } = useGetData(
    doctorUrl,
    "allDoctor",
    [],
    true,
    page,
    pageSize,
    selectedFilterKey,
    filterValue
  );

  const doctorsData = data?.data.data || [];
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleOpenEditDialog = (data: DoctorDetails) => {
    setSelectedData(data);
    setOpenEdit(true);
  };

  const handleOpenDeleteDialog = (data: DoctorDetails) => {
    setSelectedData(data);
    setOpenDelete(true);
  };

  const { user, role, isSuccess } = useUser();
  const columns = createColumns<DoctorDetails>(
    [
      { key: "id", label: "ID" },
      { key: "first_name", label: "First Name" },
      { key: "last_name", label: "Last Name" },
      { key: "email", label: "Email Address" },
      { key: "phone", label: "Phone Number" },
      { key: "specialization.name", label: "Specialization" },
    ],
    "doctor",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );

  if (isSuccess && !hasPermission(role, "doctor", "read")) {
    router.push("/unauthorized");
  }

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };

  return (
    <>
      <TableHeadLayout>
        <Heading title="Doctors" />
        {hasPermission(role, "doctor", "create") && (
          <AddButton handleAddDialog={handleOpenAddDialog} />
        )}
      </TableHeadLayout>
      {doctorsData && (
        <DataTable
          columns={columns}
          data={doctorsData}
          filterKeys={[
            "first_name",
            "last_name",
            "email",
            "phone",
            "specialization_ name",
          ]}
          filterPlaceholder="Filter..."
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onFilterChange={handleFilterChange}
        />
      )}
      <AddDialog open={openAdd} onOpenChange={setOpenAdd} />
      <EditDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        doctor={selectedData}
      />
      <DeleteDialog<Doctor>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={doctorUrl}
        mutationKey="deleteDoctor"
        queryKey="allDoctor"
        itemName="doctor"
      />
    </>
  );
}
