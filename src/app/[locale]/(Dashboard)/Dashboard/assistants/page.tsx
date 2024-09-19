"use client";
import * as React from "react";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { assistantsUrl } from "@/backend/backend";
import { assistant, assistantDetails } from "@/types/assistantTypes/assistants";
import { EditDialog } from "@/components/Dashboard/assistants/EditAssistantsDialog";
import { AddDialog } from "@/components/Dashboard/assistants/AddAssistantsDialog";
import { hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import { useRouter } from "next/navigation";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import { DataTable } from "@/components/Dashboard/Datatable/DataTable";
import DeleteDialog from "@/components/Dashboard/generalDialog/DeleteDialog";
import { createColumns } from "@/components/Dashboard/Datatable/columns";
import { useTranslations } from "next-intl"; // Import useTranslations

export default function App() {
  const { user, role, isSuccess } = useUser();
  const router = useRouter();
  const t = useTranslations("Dashboard.assistant"); 

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] =
    React.useState<assistantDetails | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");

  const { data } = useGetData(
    assistantsUrl,
    "allAssistant",
    [],
    true,
    page,
    pageSize,
    selectedFilterKey,
    filterValue
  );
  const assistantsData = data?.data.data || [];
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleOpenEditDialog = (data: assistantDetails) => {
    setSelectedData(data);
    setOpenEdit(true);
  };
  const handleOpenDeleteDialog = (data: assistantDetails) => {
    setSelectedData(data);
    setOpenDelete(true);
  };

  const columns = createColumns<assistantDetails>(
    [
      { key: "id", label: "ID" },
      { key: "first_name", label: t("FirstName") }, // Use translated label
      { key: "last_name", label: t("LastName") }, // Use translated label
      { key: "phone", label: t("PhoneNumber") }, // Use translated label
      { key: "email", label: t("EmailAddress") }, // Use translated label
      { key: "doctor.first_name", label: t("DoctorFirstName") }, // Use translated label
      { key: "doctor.last_name", label: t("DoctorLastName") }, // Use translated label
    ],
    "assistant",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );

  if (isSuccess && !hasPermission(role, "assistant", "read")) {
    router.push("/unauthorized");
  }

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };

  return (
    <>
      <TableHeadLayout>
        <Heading title={t("assistants")} /> {/* Use translated title */}
        {/* {hasPermission(role, "assistant", "create") && ( */}
          <AddButton handleAddDialog={handleOpenAddDialog} />
        {/* )} */}
      </TableHeadLayout>

      {assistantsData && (
        <DataTable
          columns={columns}
          data={assistantsData}
          filterKeys={["id", "first_name", "last_name", "email", "phone"]}
          filterPlaceholder={t("FilterName")} // Use translated placeholder
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
        assistant={selectedData}
      />
      <DeleteDialog<assistant>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={assistantsUrl}
        mutationKey="deleteAssistant"
        queryKey="allAssistant"
        itemName={t("DeleteAssistant")} // Use translated item name
      />
    </>
  );
}
