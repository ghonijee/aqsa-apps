import AlertDelete from "@/components/ui/alert-delete";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Status } from "@/components/ui/status";
import { Company } from "@/entities";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { PencilLine, Trash2 } from "lucide-react";

export const companyColums: ColumnDef<Company>[] = [
  {
    id: "select",
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={table.getIsAllRowsSelected()}
    //     onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
    //   />
    // ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 44,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: (info) => info.getValue(),
    size: 40,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: (info) => info.getValue(),
    size: 350,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: (info) => {
      return <Status value={info.getValue() as boolean} />;
    },
    size: 40,
  },
  {
    header: "Actions",
    meta: {
      headerStyle: "text-right",
    },
    size: 40,
    cell: (info) => {
      return (
        <div className="flex justify-end">
          {/* <UpdateAccountDialog data={item} accounts={data} key={item.id}> */}
          <Button variant="ghost" size="icon">
            <PencilLine size={18} className=" text-amber-500" />
          </Button>
          {/* </UpdateAccountDialog> */}
          <AlertDelete
            handleOnDelete={() => {
              // deleteAction.execute({ id: item.id! });
            }}
          >
            <Button variant="ghost" size="icon">
              <Trash2 size={18} className=" text-red-500" />
            </Button>
          </AlertDelete>
        </div>
      );
    },
  },
];
