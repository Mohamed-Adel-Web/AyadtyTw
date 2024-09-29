"use client";
import * as React from "react";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { examinationTypeUrl } from "@/backend/backend";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import { examinationDetails } from "@/types/examinationTypes/examinationTypes";
import { AddDialog } from "@/components/Dashboard/examinationType/AddExaminationTypeDialog";
import { EditDialog } from "@/components/Dashboard/examinationType/EditExaminationTypeDialog";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import { DataTable } from "@/components/Dashboard/Datatable/DataTable";
import DeleteDialog from "@/components/Dashboard/generalDialog/DeleteDialog";
import { createColumns } from "@/components/Dashboard/Datatable/columns";
import { useTranslations } from "next-intl"; // Import useTranslations
import { useRouter } from "@/i18n/routing";

export default function App() {
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedData, setSelectedData] =
    React.useState<examinationDetails | null>(null);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");

  const t = useTranslations("Dashboard.examinationType");

  const { data } = useGetData(
    examinationTypeUrl,
    "allExaminationType",
    [],
    true,
    page,
    pageSize,
    selectedFilterKey,
    filterValue
  );

  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;
  const examinationData = data?.data.data || [];

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleOpenEditDialog = (data: examinationDetails) => {
    setSelectedData(data);
    setOpenEdit(true);
  };

  const handleOpenDeleteDialog = (data: examinationDetails) => {
    setSelectedData(data);
    setOpenDelete(true);
  };

  const { user, role, isSuccess } = useUser();

  const columns = createColumns<examinationDetails>(
    [
      { key: "id", label: t("ID") }, // Translated
      { key: "name", label: t("Name") }, // Translated
      { key: "amount", label: t("Amount") }, // Translated
      { key: "color", label: t("Color") }, // Translated
      { key: "doctor.first_name", label: t("DoctorFirstName") }, // Translated
      { key: "doctor.last_name", label: t("DoctorLastName") }, // Translated
    ],
    "examination Type",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );

  if (isSuccess && !hasPermission(role, "examination Type", "read")) {
    router.push("/unauthorized");
  }

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };

  return (
    <>
      <TableHeadLayout>
        <Heading title={t("ExaminationType")} /> 
        {hasPermission(role, "examination Type", "create") && (
          <AddButton handleAddDialog={handleOpenAddDialog} />
        )}
      </TableHeadLayout>
      {examinationData && (
        <DataTable
          columns={columns}
          data={examinationData}
          filterKeys={["name", "amount", "doctor_firstName", "doctor_lastName"]}
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
        examinationType={selectedData}
      />
      <DeleteDialog<examinationDetails>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={examinationTypeUrl}
        mutationKey="deleteExamination"
        queryKey="allExaminationType"
        itemName={t("DeleteExaminationType")} // Translated
      />
    </>
  );
}
