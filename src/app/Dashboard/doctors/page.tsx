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
import useUser from "@/customHooks/loginHooks/useUser";
import { hasPermission } from "@/lib/utils";
import { useRouter } from "next/navigation";
export default function App() {
  const router = useRouter();
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
  const { user, role, isSuccess } = useUser();

  const columns = createColumns<DoctorDetails>(
    ["first_name", "last_name", "email", "phone", "specialization.name"],

    "doctor",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );
  if (isSuccess && !hasPermission(role, "doctor", "read")) {
    router.push("/unauthorized");
  }
  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Doctors" />
        {hasPermission(role, "doctor", "create") && (
          <Button onClick={handleOpenAddDialog}>Add New</Button>
        )}
      </div>
      {doctorsData && (
        <DataTable
          columns={columns}
          data={doctorsData}
          filterKeys={[
            "first_name",
            "last_name",
            "email",
            "phone",
            "specialization.name",
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
