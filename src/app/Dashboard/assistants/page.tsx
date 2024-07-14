"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { assistantsUrl} from "@/backend/backend";
import { assistant } from "@/types/assistantTypes/assistants";
import { EditDialog } from "@/components/Dashboard/assistants/EditAssistantsDialog";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { AddDialog } from "@/components/Dashboard/assistants/AddAssistantsDialog";
export default function App() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<assistant | null>(
    null
  );
  const { data } = useGetData(assistantsUrl, "allAssistant");
  const assistantsData = data?.data.data;

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleOpenEditDialog = (data: assistant) => {
    setSelectedData(data);
    setOpenEdit(true);
  };

  const handleOpenDeleteDialog = (data: assistant) => {
    setSelectedData(data);
    setOpenDelete(true);
  };

  const columns = createColumns<assistant>(
    ["full_name"],
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );

  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="assistants" />
        <Button onClick={handleOpenAddDialog}>Add New</Button>
      </div>
      {assistantsData && (
        <DataTable
          columns={columns}
          data={assistantsData}
          filterKeys={["name"]}
          filterPlaceholder="Filter name..."
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
