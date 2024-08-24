/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import SearchInput from "@/components/filter/search-input";
import { ColumnVisibility } from "@/components/table/column-visibility";
import { Button } from "@/components/ui/button";
import { Company } from "@/entities";
import { Table } from "@tanstack/react-table";
import { useMemo } from "react";
import CreateCompanyDialog from "./create-company-dialog";
import { Trash2 } from "lucide-react";
import AlertDelete from "@/components/ui/alert-delete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterActionTableProps {
  table: Table<Company>;
}

export default function FilterActionTable({ table }: FilterActionTableProps) {
  const hasFilter = useMemo(() => {
    return (
      !!table.getState().globalFilter ||
      table.getColumn("status")?.getIsFiltered()
    );
  }, [
    table,
    table.getState().globalFilter,
    table.getColumn("status")?.getIsFiltered(),
  ]);

  return (
    <div className="flex space-x-5 justify-between">
      {/* Filters */}
      <div className="flex space-x-2 w-auto ">
        <div className="w-full sm:w-32 md:w-80 lg:w-96">
          <SearchInput
            defaultValue={table.getState().globalFilter}
            onChange={(value) => {
              table.setGlobalFilter(value.target.value);
            }}
          />
        </div>
        <div className="w-full sm:w-32 md:w-80 lg:w-96">
          <Select
            onValueChange={(value) => {
              table.getColumn("status")?.setFilterValue(value);
            }}
            value={
              table.getColumn("status")?.getFilterValue()?.toString() || ""
            }
          >
            <SelectTrigger>
              {table.getColumn("status")?.getIsFiltered() ? (
                <SelectValue placeholder="Status" />
              ) : (
                <span className="text-muted font-normal">Status</span>
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasFilter && (
          <Button
            variant={"secondary"}
            className=""
            onClick={() => {
              table.options.meta?.resetFilter();
              table.resetColumnFilters(true);
            }}
          >
            Reset
          </Button>
        )}
      </div>
      {/* Actions */}
      <div className="w-auto flex space-x-2">
        {table.getIsSomeRowsSelected() && (
          <>
            <AlertDelete
              handleOnDelete={() => {
                const selectedData = table
                  .getSelectedRowModel()
                  .rows.flatMap((row) => row.original);

                table.options.meta?.handleDeletedata?.(selectedData);
              }}
            >
              <Button variant={"destructive"}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDelete>
            {/* <Button>Active</Button>
            <Button>Inactive</Button> */}
          </>
        )}

        <CreateCompanyDialog />

        <ColumnVisibility table={table} />
      </div>
    </div>
  );
}
