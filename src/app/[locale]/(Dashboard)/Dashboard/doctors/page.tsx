"use client";
import * as React from "react";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { doctorUrl } from "@/backend/backend";
import { Doctor, DoctorDetails } from "@/types/doctorsTypes/doctors";
import { AddDialog } from "@/components/Dashboard/doctors/AddDoctorDialog";
import { EditDialog } from "@/components/Dashboard/doctors/EditDoctorDialog";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import { CreateColumns } from "@/components/Dashboard/Datatable/columns";
import DeleteDialog from "@/components/Dashboard/generalDialog/DeleteDialog";
import { DataTable } from "@/components/Dashboard/Datatable/DataTable";
import { useTranslations } from "next-intl"; // Import useTranslations
import { useRouter } from "@/i18n/routing";

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

  const t = useTranslations("Dashboard.doctor"); // Initialize useTranslations hook

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
  const columns = CreateColumns<DoctorDetails>(
    [
      { key: "id", label: t("ID") }, // Translated
      { key: "first_name", label: t("FirstName") }, // Translated
      { key: "last_name", label: t("LastName") }, // Translated
      { key: "email", label: t("EmailAddress") }, // Translated
      { key: "phone", label: t("PhoneNumber") }, // Translated
      { key: "specialization.name", label: t("Specialization") }, // Translated
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
        <Heading title={t("Doctors")} /> {/* Translated */}
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
            "specialization.name",
          ]}
          filterPlaceholder={t("Filter")} // Translated
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
        itemName={t("DeleteDoctor")} // Translated
      />
    </>
  );
}
