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
export default function App() {
  const { user, role, isSuccess } = useUser();
  const router = useRouter();
  const [openTransaction, setOpenTransaction] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<IPayment | null>(null);
  const { data } = useGetData(paymentUrl, "allPayments");
  const paymentsData = data?.data.data || [];

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
  //   if (isSuccess && !hasPermission(role, "income", "read")) {
  //     router.push("/unauthorized");
  //   }
  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Transactions" />
      </div>
      {paymentsData && (
        <DataTable
          columns={columns}
          data={paymentsData}
          filterKeys={[
            "status,amount",
            "extra_amount",
            "created_at",
            "payment_method",
          ]}
          filterPlaceholder="Filter ..."
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
