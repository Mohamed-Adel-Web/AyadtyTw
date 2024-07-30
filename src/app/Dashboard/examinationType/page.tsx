"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { examinationTypeUrl } from "@/backend/backend";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { useRouter } from "next/navigation";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import { examinationDetails } from "@/types/examinationTypes/examinationTypes";
import { AddDialog } from "@/components/Dashboard/examinationType/AddExaminationTypeDialog";
import { EditDialog } from "@/components/Dashboard/examinationType/EditExaminationTypeDialog";
export default function App() {
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] =
    React.useState<examinationDetails | null>(null);
  const { data } = useGetData(examinationTypeUrl, "allExaminationType");
  const examinationData = data?.data.data;

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
  const { user,role,isSuccess } = useUser();
  const columns = createColumns<examinationDetails>(
    ["name", "amount", "color", "doctor.first_name", "doctor.last_name"],
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    "examination Type",
    role
  );
  if (isSuccess && !hasPermission(role, "examination Type", "read")) {
    router.push("/unauthorized");
  }
  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Examination Type" />
        {hasPermission(role, "examination Type", "create") ? (
          <Button onClick={handleOpenAddDialog}>Add New</Button>
        ) : (
          ""
        )}
      </div>
      {examinationData && (
        <DataTable
          columns={columns}
          data={examinationData}
          filterKeys={[
            "name",
            "amount",
            "color",
            "doctor.firstName",
            "doctor.lastName",
          ]}
          filterPlaceholder="Filter..."
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
        itemName="Examination Type"
      />
    </>
  );
}
