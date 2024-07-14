"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BaseData {
  id: string | number;
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((o, p) => (o ? o[p] : ''), obj);
}

export function createColumns<T extends BaseData>(
  props: (keyof T | string)[],
  handleOpenEditDialog: (row: T) => void,
  handleOpenDeleteDialog: (row: T) => void
): ColumnDef<T>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...props.map((prop) => ({
      id: prop as string, // Ensure the id is set correctly
      accessorKey: prop as string,
      header: ({ column }: { column: any }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {String(prop).split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: any }) => (
        <div>{getNestedValue(row.original, prop as string)}</div>
      ),
    })),
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        const rowOriginal = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Button
                className="w-full bg-red-700 hover:bg-red-700"
                onClick={() => handleOpenDeleteDialog(rowOriginal)}
              >
                Delete
              </Button>
              <DropdownMenuSeparator />
              <Button
                className="w-full bg-blue-600 hover:bg-blue-600"
                onClick={() => handleOpenEditDialog(rowOriginal)}
              >
                Edit
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
