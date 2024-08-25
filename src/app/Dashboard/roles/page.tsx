"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { rolesUrl } from "@/backend/backend";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { Role } from "@/types/RolesTypes/role";
import { AddDialog } from "@/components/Dashboard/roles/AddRoleDialog";
import EditDialog from "@/components/Dashboard/roles/EditRoleDialog";
import useUser from "@/customHooks/loginHooks/useUser";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<Role | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { data } = useGetData(
    rolesUrl,
    "allRole",
    [],
    true,
    page,
    pageSize,
    selectedFilterKey,
    filterValue
  );
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;
  const roleData: Role[] = data?.data;
  const handleOpenAddDialog = () => {
    setOpenAdd(true);
  };

  const handleOpenEditDialog = (data: Role) => {
    setSelectedData(data);
    setOpenEdit(true);
  };

  const handleOpenDeleteDialog = (data: Role) => {
    setSelectedData(data);
    setOpenDelete(true);
  };
  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };
  const { user, role, isSuccess } = useUser();
  const columns = createColumns<Role>(
    ["name"],
    "doctor",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );
  if (isSuccess && role?.name !== "superAdmin") {
    router.push("/unauthorized");
  }
  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Roles" />
        <Button onClick={handleOpenAddDialog}>Add New</Button>
      </div>
      {roleData && (
        <DataTable
          columns={columns}
          data={roleData}
          filterKeys={["name"]}
          filterPlaceholder="Filter..."
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
        role={selectedData}
      />
      <DeleteDialog<Role>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={rolesUrl}
        mutationKey="deleteRole"
        queryKey="allRole"
        itemName="role"
      />
    </>
  );
}
