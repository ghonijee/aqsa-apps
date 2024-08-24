import {
  Table as TTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender, Table as Table } from "@tanstack/react-table";
import { ArchiveX } from "lucide-react";
import { DataTablePagination } from "./table-pagination";

interface BasicTableProps<T> {
  table: Table<T>;
}

export default function BasicTable<T>({ table }: BasicTableProps<T>) {
  return (
    <>
      <TTable>
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
                  <p className="text-gray-400">No data found</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TTable>
      <div className="py-4 px-5">
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
