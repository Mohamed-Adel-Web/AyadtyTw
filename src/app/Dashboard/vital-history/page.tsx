"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { vitalHistoryUrl } from "@/backend/backend";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import { useRouter } from "next/navigation";
import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";
import { AddDialog } from "@/components/Dashboard/vitalHistory/AddVitalDialog";
import { EditDialog } from "@/components/Dashboard/vitalHistory/EditVitalDialog";
import ReportSheetComponent from "@/components/Dashboard/vitalHistory/ReportDialog";
export default function App() {
  const { user, role, isSuccess } = useUser();
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openSheet, setOpenSheet] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<IVitalHistory | null>(
    null
  );
  const { data } = useGetData(vitalHistoryUrl, "allVitalHistory");
  const assistantsData = data?.data.data || [];
  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };
  const handleOpenEditDialog = (data: IVitalHistory) => {
    setSelectedData(data);
    setOpenEdit(true);
  };
  const handleOpenDeleteDialog = (data: IVitalHistory) => {
    setSelectedData(data);
    setOpenDelete(true);
  };
  const handleShowReportDialog = (data: IVitalHistory) => {
    setSelectedData(data);
    setOpenSheet(true)
  };
  const columns = createColumns<IVitalHistory>(
    ["patient_id", "pressure", "weight", "blood_sugar"],
    "vital history",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    undefined,
    handleShowReportDialog
  );
  if (isSuccess && !hasPermission(role, "vital history", "read")) {
    router.push("/unauthorized");
  }
  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Vital History" />
        {hasPermission(role, "assistant", "create") && (
          <Button onClick={handleOpenAddDialog}>Add New</Button>
        )}
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
        vitalHistory={selectedData}
      />
      <DeleteDialog<IVitalHistory>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={vitalHistoryUrl}
        mutationKey="deleteVitalHistory"
        queryKey="allVitalHistory"
        itemName="vital history"
      />
      <ReportSheetComponent openSheet={openSheet} setOpenSheet={setOpenSheet}  />
    </>
  );
}
