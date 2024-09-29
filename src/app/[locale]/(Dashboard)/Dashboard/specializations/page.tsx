"use client";
import * as React from "react";
import { Specialization } from "@/types/specializationsTypes/specialization";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { specializationUrl } from "@/backend/backend";
import { AddDialog } from "@/components/Dashboard/specializations/AddSpecializationDialog";
import EditDialog from "@/components/Dashboard/specializations/EditSpecializationDialog";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import DeleteDialog from "@/components/Dashboard/generalDialog/DeleteDialog";
import { DataTable } from "@/components/Dashboard/Datatable/DataTable";
import { createColumns } from "@/components/Dashboard/Datatable/columns";
import { useTranslations } from "next-intl"; // Import useTranslations
import { useRouter } from "@/i18n/routing";

export default function App() {
  const t = useTranslations("Dashboard.Specializations"); // Initialize useTranslations hook
  const router = useRouter();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedData, setSelectedData] = React.useState<Specialization | null>(
    null
  );
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");

  const { data } = useGetData(
    specializationUrl,
    "allSpecialization",
    [],
    true,
    page,
    pageSize,
    selectedFilterKey,
    filterValue
  );

  const specializationsData = data?.data.data || [];
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleOpenEditDialog = (data: Specialization) => {
    setSelectedData(data);
    setOpenEdit(true);
  };

  const handleOpenDeleteDialog = (data: Specialization) => {
    setSelectedData(data);
    setOpenDelete(true);
  };

  const { user, role, isSuccess } = useUser();

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };

  const columns = createColumns<Specialization>(
    [{ key: "name", label: t("name") }], // Translated
    "specialization",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );

  if (isSuccess && !hasPermission(role, "specialization", "read")) {
    router.push("/unauthorized");
  }

  return (
    <>
      <TableHeadLayout>
        <Heading title={t("title")} /> {/* Translated */}
        {hasPermission(role, "specialization", "create") ? (
          <AddButton handleAddDialog={handleOpenAddDialog} />
        ) : (
          ""
        )}
      </TableHeadLayout>
      {specializationsData && (
        <DataTable
          columns={columns}
          data={specializationsData}
          filterKeys={["name"]}
          filterPlaceholder={t("filterPlaceholder")} 
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
        specialization={selectedData}
      />
      <DeleteDialog<Specialization>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={specializationUrl}
        mutationKey="deleteSpecialization"
        queryKey="allSpecialization"
        itemName={t("deleteSpecialization")} // Translated
      />
    </>
  );
}
