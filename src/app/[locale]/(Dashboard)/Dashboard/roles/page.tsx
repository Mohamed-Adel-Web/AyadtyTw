"use client";
import * as React from "react";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { rolesUrl } from "@/backend/backend";
import { Role } from "@/types/RolesTypes/role";
import { AddDialog } from "@/components/Dashboard/roles/AddRoleDialog";
import EditDialog from "@/components/Dashboard/roles/EditRoleDialog";
import useUser from "@/customHooks/loginHooks/useUser";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import { DataTable } from "@/components/Dashboard/Datatable/DataTable";
import DeleteDialog from "@/components/Dashboard/generalDialog/DeleteDialog";
import { CreateColumns } from "@/components/Dashboard/Datatable/columns";
import { useTranslations } from "next-intl"; // Import useTranslations
import { useRouter } from "@/i18n/routing";
export default function App() {
  const t = useTranslations("Dashboard.role");
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<Role | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { user, role, isSuccess } = useUser();

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
  const roleData: Role[] = data?.data || [];

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

  console.log(role);
  const columns = CreateColumns<Role>(
    [{ key: "name", label: t("Name") }],
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
      <TableHeadLayout>
        <Heading title={t("Roles")} /> {/* Translated */}
        <AddButton handleAddDialog={handleOpenAddDialog} /> {/* Translated */}
      </TableHeadLayout>
      {roleData && (
        <DataTable
          columns={columns}
          data={roleData}
          filterKeys={["name"]}
          filterPlaceholder={t("Filter")} // Translated
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
        itemName={t("Role")} // Translated
      />
    </>
  );
}
