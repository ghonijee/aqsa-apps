import "@tanstack/react-table"; //or vue, svelte, solid, qwik, etc.
import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    // updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    resetFilter: () => void;
    handleDeletedata?: (row: TData | TData[]) => void;
  }
  interface ColumnMeta<TData extends RowData, TValue> {
    headerStyle: string;
  }
}
