"use client";

import { Company, GetListCompaniesParams } from "@/entities";
import FilterActionTable from "./filter-table";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  PaginationState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { companyColums } from "./column";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { deleteCompanyAction } from "@/actions/company/company.action";
import { useToast } from "@/components/ui/use-toast";
import { DataTablePagination } from "@/components/table/table-pagination";
import { hasValue, isNotNullOrUndefined } from "@/lib/utils/utils";
import BasicTable from "@/components/table/basic-table";

export default function CompanyTableView({
  data,
  totalData,
  param,
}: {
  data: Company[];
  totalData: number;
  param: GetListCompaniesParams;
}) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Table State
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState(
    searchParams.get("search") || ""
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: param.page - 1,
    pageSize: param.pageSize,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: "status",
      value: searchParams.get("status"),
    },
  ]);

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

  const onDelete = async (data: Company | Company[]) => {
    if (Array.isArray(data)) {
      await deleteAction.executeAsync({ id: data.map((d) => d.id!) });
    } else {
      await deleteAction.executeAsync({ id: data.id! });
    }
  };

  const resetFilter = () => {
    setGlobalFilter("");
    setColumnFilters([]);
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
    onColumnFiltersChange: setColumnFilters,
    state: {
      rowSelection,
      columnVisibility,
      globalFilter,
      pagination,
      columnFilters,
    },
    meta: {
      resetFilter,
      handleDeletedata: onDelete,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (hasValue(globalFilter)) {
      params.set("search", globalFilter);
    } else {
      params.delete("search");
      table.resetGlobalFilter();
    }

    const valueStatus = columnFilters.find((c) => c.id === "status")?.value;
    if (isNotNullOrUndefined(valueStatus) && valueStatus !== "all") {
      params.set("status", valueStatus as string);
    } else {
      params.delete("status");
    }

    params.set("page", pagination.pageIndex + 1 + "");
    params.set("pageSize", pagination.pageSize + "");

    router.replace(`${pathname}?${params.toString()}`);
  }, [
    globalFilter,
    pathname,
    router,
    searchParams,
    table,
    pagination,
    columnFilters,
  ]);

  return (
    <div className="flex flex-col gap-y-5">
      <FilterActionTable table={table} />
      <BasicTable table={table} />
    </div>
  );
}
