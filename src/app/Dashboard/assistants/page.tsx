"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { assistantsUrl } from "@/backend/backend";
import { assistant, assistantDetails } from "@/types/assistantTypes/assistants";
import { EditDialog } from "@/components/Dashboard/assistants/EditAssistantsDialog";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { AddDialog } from "@/components/Dashboard/assistants/AddAssistantsDialog";
import { hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import { useRouter } from "next/navigation";
export default function App() {
  const { user, role, isSuccess } = useUser();
  const router = useRouter();
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
      "id",
      "first_name",
      "last_name",
      "phone",
      "email",
      "doctor.first_name",
      "doctor.last_name",
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
      <div className="flex justify-between align-items-center">
        <Heading title="assistants" />
        {hasPermission(role, "assistant", "create") && (
          <Button onClick={handleOpenAddDialog}>Add New</Button>
        )}
      </div>
      {assistantsData && (
        <DataTable
          columns={columns}
          data={assistantsData}
          filterKeys={["id", "first_name", "last_name", "email", "phone"]}
          filterPlaceholder="Filter name..."
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
        itemName="assistant"
      />
    </>
  );
}
