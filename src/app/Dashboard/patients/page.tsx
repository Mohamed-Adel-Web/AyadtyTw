"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { patientsUrl } from "@/backend/backend";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { AddDialog } from "@/components/Dashboard/patients/AddPateintDialog";
import { EditDialog } from "@/components/Dashboard/patients/EditPatientDialog";
import { patient, patientDetails } from "@/types/patientTypes/patient";
import { useRouter } from "next/navigation";
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
export default function App() {
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<patientDetails | null>(
    null
  );
  const { data } = useGetData(patientsUrl, "allPatient");
  const patientsData = data?.data.data;

  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleOpenEditDialog = (data: patientDetails) => {
    setSelectedData(data);
    setOpenEdit(true);
  };

  const handleOpenDeleteDialog = (data: patientDetails) => {
    setSelectedData(data);
    setOpenDelete(true);
  };
  const { user } = useUser();
  const columns = createColumns<patientDetails>(
    ["full_name", "phone", "email", "doctor.full_name"],
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    "patient",
    user?.role
  );
  if (user && !hasPermission(user?.role, "patient", "read")) {
    router.push("/unauthorized");
  }
  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Patients        " />
        {hasPermission(user?.role, "patient", "create") ? (
          <Button onClick={handleOpenAddDialog}>Add New</Button>
        ) : (
          ""
        )}
      </div>
      {patientsData && (
        <DataTable
          columns={columns}
          data={patientsData}
          filterKeys={["full_name", "phone", "email", "doctor.full_name"]}
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
        url={patientsUrl}
        mutationKey="deletePatient"
        queryKey="allPatient"
        itemName="patient"
      />
    </>
  );
}
