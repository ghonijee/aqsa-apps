import { ChartOfAccountWithLevel } from "../../../../../entities/finance/chart-of-account.entity";
import { Suspense } from "react";
import DataTableLoading from "@/components/table/table-loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";

export default async function TreeChartOfAccounts({
  data,
}: {
  data: ChartOfAccountWithLevel[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">Code</TableHead>
          <TableHead className="w-5/12">Name</TableHead>
          <TableHead className="w-2/12">Status</TableHead>
          <TableHead className="w-2/12 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-1/12">{item.code}</TableCell>
            <TableCell className={cn("w-5/12", `pl-${item.level * 4}`)}>
              {item.name}
            </TableCell>
            <TableCell className="w-2/12">
              <span
                className={cn(
                  "text-xs border border-inherit px-2 py-1 rounded",
                  item.isActive
                    ? "bg-success-100 text-sucess"
                    : "bg-red-100 text-danger"
                )}
              >
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </TableCell>
            <TableCell className="w-2/12 text-right"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
