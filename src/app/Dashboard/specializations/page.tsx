"use client";
import * as React from "react";
import { createColumns } from "../../../components/columns";
import { DataTable } from "../../../components/DataTable";
export default function App() {
 const  columns = createColumns<Specialization>(["name"]);

  return (
    <>
      <h2>Payments</h2>
      <DataTable
        columns={columns}
        data={payments}
        filterKey="name"
        filterPlaceholder="Filter emails..."
      />
    </>
  );
}
