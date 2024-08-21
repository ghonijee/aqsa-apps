/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import SearchInput from "@/components/filter/search-input";
import { ColumnVisibility } from "@/components/table/column-visibility";
import { Button } from "@/components/ui/button";
import { Company } from "@/entities";
import { Table } from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import CreateCompanyDialog from "./create-company-dialog";

interface FilterActionTableProps {
  table: Table<Company>;
}

export default function FilterActionTable({ table }: FilterActionTableProps) {
  const hasFilter = useMemo(() => {
    return !!table.getState().globalFilter;
  }, [table, table.getState().globalFilter]);

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

        {hasFilter && (
          <Button
            variant={"secondary"}
            className=""
            onClick={() => {
              table.options.meta?.resetFilter();
            }}
          >
            Reset
          </Button>
        )}
      </div>
      {/* Actions */}
      <div className="w-auto flex space-x-2">
        <CreateCompanyDialog />

        <ColumnVisibility table={table} />
      </div>
    </div>
  );
}
