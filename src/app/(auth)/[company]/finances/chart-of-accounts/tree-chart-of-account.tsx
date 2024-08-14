"use client";

import { ChartOfAccountWithLevel } from "../../../../../entities/finance/chart-of-account.entity";
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
import AlertDelete from "@/components/ui/alert-delete";
import { PencilLine, Trash2 } from "lucide-react";
import UpdateAccountDialog from "./components/update-account-dialog";
import { deleteChartOfAccountAction } from "../../../../../actions/chart_of_account/chart-of-account.action";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function TreeChartOfAccounts({
  data,
}: {
  data: ChartOfAccountWithLevel[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const deleteAction = useAction(deleteChartOfAccountAction, {
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Success",
        description: "Account deleted successfully",
        variant: "success",
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete account",
        variant: "destructive",
        duration: 3000,
      });
    },
  });
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
                  "text-xs border border-inherit px-3 py-1 rounded-3xl",
                  item.isActive
                    ? "bg-success-200 text-sucess"
                    : "bg-red-100 text-danger"
                )}
              >
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </TableCell>
            <TableCell className="w-2/12 text-right">
              {item.isManageable ? (
                <div>
                  <UpdateAccountDialog
                    data={item}
                    accounts={data}
                    key={item.id}
                  >
                    <Button variant="ghost" size="sm">
                      <PencilLine size={18} className=" text-amber-500" />
                    </Button>
                  </UpdateAccountDialog>
                  <AlertDelete
                    handleOnDelete={() => {
                      deleteAction.execute({ id: item.id! });
                    }}
                  >
                    <Button variant="ghost" size="sm">
                      <Trash2 size={18} className=" text-red-500" />
                    </Button>
                  </AlertDelete>
                </div>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
