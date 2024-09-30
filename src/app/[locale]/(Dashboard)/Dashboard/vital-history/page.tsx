"use client";
import * as React from "react";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { vitalHistoryUrl } from "@/backend/backend";
import { hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import { IVitalHistory } from "@/types/vitalHistoryTypes/vitalHistory";
import { AddDialog } from "@/components/Dashboard/vitalHistory/AddVitalDialog";
import { EditDialog } from "@/components/Dashboard/vitalHistory/EditVitalDialog";
import ReportSheetComponent from "@/components/Dashboard/vitalHistory/ReportDialog";
import AddButton from "@/components/Dashboard/DashboardLayout/AddButton";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import { CreateColumns } from "@/components/Dashboard/Datatable/columns";
import { DataTable } from "@/components/Dashboard/Datatable/DataTable";
import DeleteDialog from "@/components/Dashboard/generalDialog/DeleteDialog";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl"; // Import useTranslations

export default function App() {
  const t = useTranslations("Dashboard.vitalHistory"); // Initialize useTranslations hook
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
    vitalHistoryUrl,
    "allVitalHistory",
    [],
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

  const columns = CreateColumns<IVitalHistory>(
    [
      { key: "patient_id", label: t("patient_id") },
      { key: "pressure", label: t("pressure") },
      { key: "weight", label: t("weight") },
      { key: "blood_sugar", label: t("blood_sugar") },
      { key: "doctor_id", label: t("doctor_id") },
    ],
    "vitalHistory",
    role,
    handleOpenEditDialog,
    handleOpenDeleteDialog,
    undefined,
    handleShowReportDialog
  );

  if (isSuccess && !hasPermission(role, "vitalHistory", "read")) {
    router.push("/unauthorized");
  }

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };

  return (
    <>
      <TableHeadLayout>
        <Heading title={t("vitalHistory")} />
        {hasPermission(role, "vitalHistory", "create") && (
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
          filterPlaceholder={t("Filter")} // Use translation for filter placeholder
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
        vitalHistory={selectedData}
      />
      <DeleteDialog<IVitalHistory>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={vitalHistoryUrl}
        mutationKey="deleteVitalHistory"
        queryKey="allVitalHistory"
        itemName={t("vitalHistory")} // Use translation for item name
      />
      <ReportSheetComponent
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        vitalHistory={selectedData}
      />
    </>
  );
}
