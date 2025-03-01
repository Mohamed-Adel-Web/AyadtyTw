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
import { useTranslations } from "next-intl"; // Import useTranslations

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((o, p) => (o ? o[p] : ""), obj);
}

interface BaseData {
  id: string | number;
}

export function hasStatus(obj: any): obj is { status: boolean } {
  return "status" in obj;
}

interface ColumnConfig<T> {
  key: keyof T | string;
  label: string;
}

export function CreateColumns<T extends BaseData>(
  props: ColumnConfig<T>[],
  currentSection: string,
  role: Role,
  handleOpenEditDialog?: (row: T) => void,
  handleOpenDeleteDialog?: (row: T) => void,
  handleShowTransactionsDialog?: (row: T) => void,
  handleShowReportDialog?: (row: T) => void,
  handleShowPatientDetails?: (row: T) => void,
  handleShowAppointmentDetails?: (row: T) => void
): ColumnDef<T>[] {
  const t = useTranslations("Dashboard.column");

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
          aria-label={t("selectAll")} // Translated
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={t("selectRow")} // Translated
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...props.map((prop) => ({
      id: prop.key as string,
      accessorKey: prop.key as string,
      header: ({ column }: { column: any }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {prop.label} {/* Translated */}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }: { row: any }) =>
        prop.key === "status" ? (
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
                : row.original.status === "reserved"
                ? "text-yellow-700 font-extrabold bg-yellow-200 inline-block py-1 px-2 rounded"
                : ""
            }`}
          >
            {row.original.status.charAt(0).toUpperCase() +
              row.original.status.slice(1)}{" "}
            {/* Translated */}
          </div>
        ) : prop.key === "time_start" ||
          prop.key === "time_end" ||
          prop.key === "created_at" ? (
          <div className="border-r border-gray-200 px-3 py-2">
            {formatDateTime(getNestedValue(row.original, prop.key as string))}
          </div>
        ) : prop.key === "color" ? (
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: row.original.color }}
            ></div>
            <span>{row.original.color}</span>
          </div>
        ) : (
          <div className="border-r border-gray-200 px-3 py-2">
            {getNestedValue(row.original, prop.key as string)}
          </div>
        ),
    })),
    {
      id: "actions",
      header:
        hasPermission(role, currentSection, "update") ||
        hasPermission(role, currentSection, "delete")
          ? t("action") // Translated
          : "",
      enableHiding: false,
      cell: ({ row }) => {
        const rowOriginal = row.original;
        return hasPermission(role, currentSection, "update") ||
          hasPermission(role, currentSection, "delete") ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t("openMenu")}</span>{" "}
                {/* Translated */}
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>{" "}
              {/* Translated */}
              <DropdownMenuSeparator />
              {hasPermission(role, currentSection, "delete") &&
              handleOpenDeleteDialog ? (
                <Button
                  className="w-full bg-red-700 hover:bg-red-700"
                  onClick={() => handleOpenDeleteDialog(rowOriginal)}
                >
                  {t("delete")} {/* Translated */}
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
                  {t("edit")} {/* Translated */}
                </Button>
              ) : (
                ""
              )}
              {handleShowTransactionsDialog ? (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-600"
                  onClick={() => handleShowTransactionsDialog(rowOriginal)}
                >
                  {t("showTransactionDetails")} {/* Translated */}
                </Button>
              ) : (
                ""
              )}
              {handleShowReportDialog ? (
                <Button
                  className="w-full bg-green-600 hover:bg-green-600 my-2"
                  onClick={() => handleShowReportDialog(rowOriginal)}
                >
                  {t("showReport")} {/* Translated */}
                </Button>
              ) : (
                ""
              )}
              {handleShowPatientDetails ? (
                <Button
                  className="w-full bg-green-600 hover:bg-green-600 my-2"
                  onClick={() => handleShowPatientDetails(rowOriginal)}
                >
                  {t("showPatientDetails")} {/* Translated */}
                </Button>
              ) : (
                ""
              )}
              {handleShowAppointmentDetails ? (
                <Button
                  className="w-full bg-sky-700 hover:bg-sky-700  my-2"
                  onClick={() => handleShowAppointmentDetails(rowOriginal)}
                >
                  {t("showAppointmentDetails")} {/* Translated */}
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
