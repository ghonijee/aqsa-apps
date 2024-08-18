"use client";

import SearchInput from "@/components/filter/search-input";
import { ColumnVisibility } from "@/components/table/column-visibility";
import { Button } from "@/components/ui/button";
import { Company } from "@/entities";
import { Table } from "@tanstack/react-table";
import { useEffect } from "react";

interface FilterTableProps {
  table: Table<Company>;
}

export default function FilterTable({ table }: FilterTableProps) {
  return (
    <div className="flex space-x-5 justify-between">
      {/* Filters */}
      <div className="flex space-x-2 w-auto bg-red-50">
        <div className="w-full sm:w-32 md:w-80 lg:w-96">
          <SearchInput
            value={table.getState().globalFilter}
            onChange={(value) => {
              table.setGlobalFilter(value.target.value);
            }}
          />
        </div>

        <Button
          variant={"secondary"}
          className=""
          onClick={() => {
            table.options.meta?.resetFilter();
          }}
        >
          Reset
        </Button>
      </div>
      {/* Actions */}
      <div className="w-auto flex space-x-2">
        <Button variant={"default"} size={"default"}>
          Add Company
        </Button>
        <ColumnVisibility table={table} />
      </div>
    </div>
  );
}
