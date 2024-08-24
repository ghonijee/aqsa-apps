import { Column, Table } from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Columns3Icon, ColumnsIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

export function ColumnVisibility<T>({ table }: { table: Table<T> }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="soft" size="icon">
          <Columns3Icon size={20} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0" align="end" sideOffset={8}>
        <div className="border-b-[1px] p-4">
          <p className="font-medium text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Hide columns
          </p>
        </div>

        <div className="flex flex-col p-4 space-y-4 max-h-[352px] overflow-auto">
          {table
            .getAllColumns()
            .filter((column: Column<T>) =>
              column.columnDef.enableHiding === false ? false : true
            )
            .map((column: any) => {
              return (
                <div key={column.id} className="flex items-center space-x-4">
                  <Checkbox
                    id={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(checked) =>
                      column.toggleVisibility(checked)
                    }
                  />
                  <label
                    htmlFor={column.id}
                    className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {column.columnDef.header}
                  </label>
                </div>
              );
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
