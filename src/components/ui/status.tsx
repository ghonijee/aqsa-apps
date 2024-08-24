import { cn } from "@/lib/utils/utils";
import { cva, VariantProps } from "class-variance-authority";

const statusVariant = cva(
  "text-xs border border-inherit px-3 py-1 rounded-3xl",
  {
    variants: {
      status: {
        active: "bg-success-200 text-sucess",
        inactive: "bg-red-100 text-danger",
      },
    },
    defaultVariants: {
      status: "active",
    },
  }
);

interface StatusProps extends VariantProps<typeof statusVariant> {
  value: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}

const Status = ({
  value,
  activeLabel = "Active",
  inactiveLabel = "Inactive",
  status,
}: StatusProps) => {
  return (
    <span
      className={cn(statusVariant({ status: value ? "active" : "inactive" }))}
    >
      {value ? activeLabel : inactiveLabel}
    </span>
  );
};

export { Status };
