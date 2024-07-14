"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { doctorUrl, patientsUrl } from "@/backend/backend";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { AddDialog } from "@/components/Dashboard/patients/AddPateintDialog";
import { EditDialog } from "@/components/Dashboard/patients/EditPatientDialog";
import { patient } from "@/types/patientTypes/pateint";

export default function App() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<patient | null>(null);
  const { data } = useGetData(patientsUrl, "allPatient");
  const patientsData: patient[] = data?.data.data;

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleOpenEditDialog = (data: patient) => {
    setSelectedData(data);
    setOpenEdit(true);
  };

  const handleOpenDeleteDialog = (data: patient) => {
    setSelectedData(data);
    setOpenDelete(true);
  };

  const columns = createColumns<patient>(
    ["full_name"],
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );

  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Patients        " />
        <Button onClick={handleOpenAddDialog}>Add New</Button>
      </div>
      {patientsData && (
        <DataTable
          columns={columns}
          data={patientsData}
          filterKeys={["full_name"]}
          filterPlaceholder="Filter..."
        />
      )}

      <AddDialog open={openAdd} onOpenChange={setOpenAdd} />
      <EditDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        patient={selectedData}
      />
      <DeleteDialog<patient>
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
