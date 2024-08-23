"use client";

import { useDebouncedCallback } from "use-debounce";
import { Company, GetListCompaniesParams } from "@/entities";
import FilterActionTable from "./filter-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
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
import { useAction } from "next-safe-action/hooks";
import { deleteCompanyAction } from "@/actions/company/company.action";
import { useToast } from "@/components/ui/use-toast";
import { DataTablePagination } from "@/components/table/table-pagination";

export default function CompanyTableView({
  data,
  totalData,
  param,
}: {
  data: Company[];
  totalData: number;
  param: GetListCompaniesParams;
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get("search") || ""
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: param.page - 1,
    pageSize: param.pageSize,
  });
  const { toast } = useToast();

  const resetFilter = () => {
    setGlobalFilter("");
  };

  const deleteAction = useAction(deleteCompanyAction, {
    onSuccess: () => {
      router.refresh();
      toast({
        variant: "success",
        title: "Success",
        description: "Company deleted successfully",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete company",
        duration: 2000,
      });
    },
  });

  const onDelete = async (data: Company) => {
    await deleteAction.executeAsync({ id: data.id! });
  };

  const table = useReactTable({
    data,
    getRowId: (originalRow) => originalRow.id!.toString(),
    columns: companyColums,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: true,
    manualFiltering: true,
    rowCount: totalData,
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      columnVisibility,
      globalFilter,
      pagination,
    },
    meta: {
      resetFilter,
      handleDeletedata: onDelete,
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

    params.set("page", pagination.pageIndex + 1 + "");
    params.set("pageSize", pagination.pageSize + "");
    router.replace(`${pathname}?${params.toString()}`);
  }, [globalFilter, pathname, router, searchParams, table, pagination]);

  return (
    <div className="flex flex-col gap-y-5">
      <FilterActionTable table={table} />
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
      <div className="py-4 px-5">{<DataTablePagination table={table} />}</div>
    </div>
  );
}
