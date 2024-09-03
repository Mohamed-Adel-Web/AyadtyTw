"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { patientVitalHistoryUrl, vitalHistoryUrl } from "@/backend/backend";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import { useRouter } from "next/navigation";
import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";
import { AddDialog } from "@/components/Dashboard/vitalHistory/AddVitalDialog";
import { EditDialog } from "@/components/Dashboard/vitalHistory/EditVitalDialog";
import ReportSheetComponent from "@/components/Dashboard/vitalHistory/ReportDialog";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
export default function PatientVitalHistory({
  patientId,
}: {
  patientId: string;
}) {
  const { user, role, isSuccess } = useUser();
  const router = useRouter();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openSheet, setOpenSheet] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<IVitalHistory | null>(
    null
  );
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { data } = useGetData(
    `${patientVitalHistoryUrl}/${patientId}`,
    "allVitalHistory",
    [patientId],
    true,
    page,
    pageSize,
    selectedFilterKey,
    filterValue
  );
  const vitalHistoryData = data?.data.data || [];
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;
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
    setOpenSheet(true);
  };
  const columns = createColumns<IVitalHistory>(
    [
      { key: "patient_id", label: "patient id" },
      { key: "pressure", label: "Pressure" },
      { key: "weight", label: "Weight" },
      { key: "blood_sugar", label: "Blood Sugar" },
      { key: "doctor_id", label: "Doctor id" },
    ],
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

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };
  return (
    <>
      <TableHeadLayout>
        <Heading title="Vital History" />
        {hasPermission(role, "vital history", "create") && (
          <AddButton handleAddDialog={handleOpenAddDialog} />
        )}
      </TableHeadLayout>
      {vitalHistoryData && (
        <DataTable
          columns={columns}
          data={vitalHistoryData}
          filterKeys={[
            "patient_id",
            "pressure",
            "weight",
            "blood_sugar",
            "doctor_id",
          ]}
          filterPlaceholder="Filter name..."
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onFilterChange={handleFilterChange}
        />
      )}

      <AddDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        patientId={patientId}
      />
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
      <ReportSheetComponent
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        vitalHistory={selectedData}
      />
    </>
  );
}
