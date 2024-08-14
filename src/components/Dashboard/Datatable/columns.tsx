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
import { formatDateTime, hasPermission } from "@/lib/utils";
import { Role } from "@/types/RolesTypes/role";

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((o, p) => (o ? o[p] : ""), obj);
}

interface BaseData {
  id: string | number;
}

export function hasStatus(obj: any): obj is { status: boolean } {
  return "status" in obj;
}

export function createColumns<T extends BaseData>(
  props: (keyof T | string)[],
  currentSection: string,
  role: Role,
  handleOpenEditDialog?: (row: T) => void,
  handleOpenDeleteDialog?: (row: T) => void,
  handleShowTransactionsDialog?: (row: T) => void
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
      id: prop as string,
      accessorKey: prop as string,
      header: ({ column }: { column: any }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {String(prop)
            .split(".")
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(" ")}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: any }) =>
        prop === "status" ? (
          <div
            className={` ${
              row.original.status === "confirmed"
                ? "text-green-700 font-extrabold bg-green-200 inline-block py-1 px-2 rounded"
                : row.original.status === "pending"
                ? "text-yellow-700 font-extrabold bg-yellow-200 inline-block py-1 px-2 rounded"
                : row.original.status === "canceled"
                ? "text-red-700 font-extrabold bg-red-200 inline-block py-1 px-2 rounded"
                : row.original.status === "available"
                ? "text-green-700 font-extrabold bg-green-200 inline-block py-1 px-2 rounded"
                : row.original.status === "not-available"
                ? "text-red-700 font-extrabold bg-red-200 inline-block py-1 px-2 rounded"
                : ""
            }`}
          >
            {row.original.status.charAt(0).toUpperCase() +
              row.original.status.slice(1)}
          </div>
        ) : prop === "time_start" ||
          prop === "time_end" ||
          prop === "created_at" ? (
          <div className="border-r border-gray-200 px-3 py-2">
            {formatDateTime(getNestedValue(row.original, prop as string))}
          </div>
        ) : prop === "color" ? (
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: row.original.color }}
            ></div>
            <span>{row.original.color}</span>
          </div>
        ) : (
          <div className="border-r border-gray-200 px-3 py-2">
            {getNestedValue(row.original, prop as string)}
          </div>
        ),
    })),
    {
      id: "actions",
      header:
        hasPermission(role, currentSection, "update") ||
        hasPermission(role, currentSection, "delete")
          ? "Action"
          : "",
      enableHiding: false,
      cell: ({ row }) => {
        const rowOriginal = row.original;
        return hasPermission(role, currentSection, "update") ||
          hasPermission(role, currentSection, "delete") ? (
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
              {hasPermission(role, currentSection, "delete") &&
              handleOpenDeleteDialog ? (
                <Button
                  className="w-full bg-red-700 hover:bg-red-700"
                  onClick={() => handleOpenDeleteDialog(rowOriginal)}
                >
                  Delete
                </Button>
              ) : (
                ""
              )}
              <DropdownMenuSeparator />

              {hasPermission(role, currentSection, "update") &&
              handleOpenEditDialog ? (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-600"
                  onClick={() => handleOpenEditDialog(rowOriginal)}
                >
                  Edit
                </Button>
              ) : (
                ""
              )}

              {handleShowTransactionsDialog ? (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-600"
                  onClick={() => handleShowTransactionsDialog(rowOriginal)}
                >
                  Show Transaction Details
                </Button>
              ) : (
                ""
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          ""
        );
      },
    },
  ];
}
