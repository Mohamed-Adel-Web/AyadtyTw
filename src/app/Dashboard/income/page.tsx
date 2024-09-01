"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { paymentUrl } from "@/backend/backend";
import DeleteDialog from "@/components/generalDialog/DeleteDialog";
import { hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import { useRouter } from "next/navigation";
import { IPayment } from "@/types/paymentTypes/payment";
import TransactionDetailsDialog from "@/components/Dashboard/income/TransactionDetailsDialog";
import TableHeadLayout from "@/components/Common/TableHeadingLayout";
export default function App() {
  const { user, role, isSuccess } = useUser();
  const router = useRouter();
  const [openTransaction, setOpenTransaction] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<IPayment | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { data } = useGetData(
    paymentUrl,
    "allPayments",
    [],
    true,
    page,
    pageSize,
    selectedFilterKey,
    filterValue
  );

  const paymentsData = data?.data.data || [];
  const totalPages = data?.data.last_page || 1;
  const totalRecords = data?.data.total || 0;

  const handleShowTransactionsDialog = (data: IPayment) => {
    setSelectedData(data);
    setOpenTransaction(true);
  };

  const handleOpenDeleteDialog = (data: IPayment) => {
    setSelectedData(data);
    setOpenDelete(true);
  };
  const columns = createColumns<IPayment>(
    [
      "id",
      "amount",
      "extra_amount",
      "discount",
      "total",
      "status",
      "created_at",
      "payment_method",
    ],

    "income",
    role,
    undefined,
    handleOpenDeleteDialog,
    handleShowTransactionsDialog
  );
  if (isSuccess && !hasPermission(role, "income", "read")) {
    router.push("/unauthorized");
  }
  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilterKey(key);
    setFilterValue(value);
  };
  return (
    <>
      <TableHeadLayout>
      <Heading title="Transactions" />
      </TableHeadLayout>
      {paymentsData && (
        <DataTable
          columns={columns}
          data={paymentsData}
          filterKeys={[
            "status",
            "amount",
            "extra_amount",
            "created_at",
            "payment_method",
          ]}
          filterPlaceholder="Filter ..."
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalRecords={totalRecords}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          onFilterChange={handleFilterChange}
        />
      )}

      <TransactionDetailsDialog
        open={openTransaction}
        onOpenChange={setOpenTransaction}
        payment={selectedData}
      />
      <DeleteDialog<IPayment>
        open={openDelete}
        onOpenChange={setOpenDelete}
        item={selectedData}
        url={paymentUrl}
        mutationKey="deletePayment"
        queryKey="allPayment"
        itemName="Transaction"
      />
    </>
  );
}
