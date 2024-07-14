"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { doctorUrl } from "@/backend/backend";
import { Doctor, DoctorDetails } from "@/types/doctorsTypes/doctors";
import { AddDialog } from "@/components/Dashboard/doctors/AddDoctorDialog";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { EditDialog } from "@/components/Dashboard/doctors/EditDoctorDialog";

export default function App() {
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<DoctorDetails | null>(
    null
  );
  const { data } = useGetData(doctorUrl, "allDoctor");
  const doctorsData: DoctorDetails[] = data?.data.data;

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

  const columns = createColumns<DoctorDetails>(
    [
      "full_name",
      "email",
      "phone",
      "specialization.name",
      "consultant_price",
      "disclosure_price",
    ],
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );

  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Doctors" />
        <Button onClick={handleOpenAddDialog}>Add New</Button>
      </div>
      {doctorsData && (
        <DataTable
          columns={columns}
          data={doctorsData}
          filterKeys={[
            "full_name",
            "email",
            "phone",
            "specialization.name",
            "consultant_price",
            "disclosure_price",
          ]}
          filterPlaceholder="Filter..."
    
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
        itemName="doctor"
      />
    </>
  );
}
