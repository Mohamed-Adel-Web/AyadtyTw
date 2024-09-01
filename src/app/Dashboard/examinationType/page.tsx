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
import AddButton from "@/components/Common/AddButton";
import TableHeadLayout from "@/components/Common/TableHeadingLayout";
export default function App() {
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedData, setSelectedData] =
    React.useState<examinationDetails | null>(null);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { data } = useGetData(
    examinationTypeUrl,
    "allExaminationType",
    [],
    true,
    page,
    pageSize,
    selectedFilterKey,
    filterValue
  );
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;
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
  const { user, role, isSuccess } = useUser();
  const columns = createColumns<examinationDetails>(
    ["id", "name", "amount", "color", "doctor.first_name", "doctor.last_name"],

    "examination Type",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog
  );
  if (isSuccess && !hasPermission(role, "examination Type", "read")) {
    router.push("/unauthorized");
  }
  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };
  return (
    <>
      <TableHeadLayout>
      <Heading title="Examination Type" />
        {hasPermission(role, "examination Type", "create") ? (
            <AddButton handleAddDialog={handleOpenAddDialog} />
          ) : (
          ""
        )}
      </TableHeadLayout>
      {examinationData && (
        <DataTable
          columns={columns}
          data={examinationData}
          filterKeys={["name", "amount", "doctor_firstName", "doctor_lastName"]}
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
