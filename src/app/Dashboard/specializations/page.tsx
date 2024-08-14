"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import { Specialization } from "@/types/specializationsTypes/specialization";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { specializationUrl } from "@/backend/backend";
import { AddDialog } from "@/components/Dashboard/specializations/AddSpecializationDialog";
import EditDialog from "@/components/Dashboard/specializations/EditSpecializationDialog";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import useUser from "@/customHooks/loginHooks/useUser";
import { useRouter } from "next/navigation";
import { hasPermission } from "@/lib/utils";

export default function App() {
  const router = useRouter();

  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<Specialization | null>(
    null
  );
  const { data } = useGetData(specializationUrl, "allSpecialization");
  const specializationsData = data?.data.data;

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

  const columns = createColumns<Specialization>(
    ["name"],

    "specialization",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );
  if (isSuccess && !hasPermission(role, "assistant", "read")) {
    router.push("/unauthorized");
  }

  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Specializations" />
        {hasPermission(role, "specialization", "create") ? (
          <Button onClick={handleOpenAddDialog}>Add New</Button>
        ) : (
          ""
        )}
      </div>
      {specializationsData && (
        <DataTable
          columns={columns}
          data={specializationsData}
          filterKeys={["name"]}
          filterPlaceholder="Filter name..."
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
        itemName="specialization"
      />
    </>
  );
}
