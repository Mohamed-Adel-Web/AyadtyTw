"use client";
import * as React from "react";
import { createColumns } from "../../../components/Dashboard/Datatable/columns";
import { DataTable } from "../../../components/Dashboard/Datatable/DataTable";
import Heading from "@/components/Dashboard/DashboardLayout/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { patientTransactionUrl } from "@/backend/backend";
import { hasPermission } from "@/lib/utils";
import useUser from "@/customHooks/loginHooks/useUser";
import { IPayment } from "@/types/paymentTypes/payment";
import TransactionDetailsDialog from "@/components/Dashboard/income/TransactionDetailsDialog";
import TableHeadLayout from "@/components/Dashboard/DashboardLayout/TableHeadingLayout";
import { useRouter } from "@/i18n/routing";
export default function PatientTransactionDetails({
  patientId,
}: {
  patientId: string;
}) {
  const { user, role, isSuccess } = useUser();
  const router = useRouter();
  const [openTransaction, setOpenTransaction] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<IPayment | null>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<string>();
  const [filterValue, setFilterValue] = React.useState<string>("");
  const { data } = useGetData(
    `${patientTransactionUrl}/${patientId}`,
    "allPayments",
    [patientId],
    !!patientId,
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


  const columns = createColumns<IPayment>(
    [
      { key: "id", label: "ID" },
      { key: "amount", label: "Amount" },
      { key: "extra_amount", label: "Extra Amount" },
      { key: "discount", label: "Discount" },
      { key: "total", label: "Total" },
      { key: "status", label: "Status" },
      { key: "created_at", label: "Created At" },
      { key: "payment_method", label: "Payment Method" },
    ],

    "income",
    role,
    undefined,
    undefined,
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
      
    </>
  );
}
