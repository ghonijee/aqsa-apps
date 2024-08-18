"use client";

import { useDebouncedCallback } from "use-debounce";
import { Company } from "@/entities";
import FilterTable from "./filter-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { companyColums } from "./column";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArchiveX } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CompanyTableView({ data }: { data: Company[] }) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get("search") || ""
  );

  const resetFilter = useDebouncedCallback(() => {
    setGlobalFilter("");
  }, 500);

  const table = useReactTable({
    data,
    getRowId: (originalRow) => originalRow.id!.toString(),
    columns: companyColums,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      rowSelection,
      columnVisibility,
      globalFilter,
    },
    meta: {
      resetFilter,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (globalFilter !== "" && globalFilter !== undefined) {
      params.set("search", globalFilter);
    } else {
      params.delete("search");
      table.resetGlobalFilter();
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [globalFilter]);

  return (
    <div className="flex flex-col gap-y-5">
      <FilterTable table={table} />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      width: `${header.getSize()}px`,
                    }}
                    className={header.column.columnDef.meta?.headerStyle}
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
        <TableBody>
          {table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-12 max-h-12"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-[50vh] text-center"
              >
                <div className="flex flex-col items-center gap-y-5">
                  <ArchiveX size={64} className="text-gray-300" />
                  Belum ada data
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
