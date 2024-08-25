import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/customHooks/useDebounce";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  filterPlaceholder?: string;
  filterKeys?: Array<keyof TData | string>;
  page: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
  onFilterChange?: (key: string, value: string) => void;
}

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((o, p) => (o ? o[p] : ""), obj);
}

export function DataTable<TData>({
  columns,
  data,
  filterPlaceholder = "Filter...",
  filterKeys = [],
  page,
  pageSize,
  totalPages,
  totalRecords,
  onPageChange,
  onPageSizeChange,
  onFilterChange,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<
    { id: string; value: string }[]
  >([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(() =>
      columns.reduce((acc, col) => {
        acc[col.id as string] = true;
        return acc;
      }, {} as VisibilityState)
    );
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedFilterKey, setSelectedFilterKey] = React.useState<
    string | null
  >(null);
  const [filterValue, setFilterValue] = React.useState("");

  // Debounce the filter value
  const debouncedFilterValue = useDebounce(filterValue, 500);

  React.useEffect(() => {
    if (selectedFilterKey) {
      if (onFilterChange) {
        onFilterChange(selectedFilterKey, debouncedFilterValue);
      }
    }
  }, [debouncedFilterValue, selectedFilterKey, onFilterChange]);

  const filteredData = React.useMemo(() => {
    if (!selectedFilterKey || !filterValue) return data;
    return data.filter((item) =>
      String(getNestedValue(item, selectedFilterKey))
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    );
  }, [data, selectedFilterKey, filterValue]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: { pagination: { pageSize } },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleFilterKeyChange = (key: string) => {
    setSelectedFilterKey(key);
    setFilterValue("");
  };

  const handleFilterValueChange = (value: string) => {
    setFilterValue(value);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onPageSizeChange(Number(event.target.value));
  };

  return (
    <div className="w-full shadow-2xl rounded-lg border border-gray-200">
      <div className="flex items-center py-4 px-6 space-x-4 bg-gray-50 rounded-t-lg">
        {filterKeys.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {selectedFilterKey || "Select Filter"}{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {filterKeys.map((key: any) => (
                <DropdownMenuCheckboxItem
                  key={key as string}
                  checked={selectedFilterKey === key}
                  onCheckedChange={() => handleFilterKeyChange(key as string)}
                  className="capitalize"
                >
                  {key}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {selectedFilterKey && (
          <Input
            placeholder={filterPlaceholder}
            value={filterValue}
            onChange={(event) => handleFilterValueChange(event.target.value)}
            className="max-w-sm"
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id as string}
                checked={columnVisibility[column.id as string] ?? true}
                onCheckedChange={() =>
                  setColumnVisibility((prev) => ({
                    ...prev,
                    [column.id as string]: !prev[column.id as string],
                  }))
                }
                className="capitalize"
              >
                {String(column.id)}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto rounded-b-lg border-t border-gray-200">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`font-medium text-lg `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 px-6 bg-gray-50 rounded-b-lg">
        <div className="flex-1 text-sm text-gray-500">
          Showing {page * pageSize - pageSize + 1} to{" "}
          {Math.min(page * pageSize, totalRecords)} of {totalRecords} results.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={page >= totalPages}
          >
            Next
          </Button>
        </div>
        <div>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="ml-2 border rounded-md p-2"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
}
