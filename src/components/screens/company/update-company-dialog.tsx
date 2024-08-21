import { updateCompanyAction } from "@/actions/company/company.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  createCompanySchema,
  updateCompanySchema,
} from "@/schemas/company.schema";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContent from "./form-content";
import { Company } from "@/entities";
import { PencilLine } from "lucide-react";

export default function UpdateCompanyDialog({ company }: { company: Company }) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof updateCompanySchema>>({
    values: {
      id: company.id!,
      name: company.name,
      address: company.address ?? "",
      phoneNumber: company.phoneNumber ?? "",
      isActive: company.isActive,
      email: company.email ?? "",
      code: company.code ?? "",
    },
  });

  const updateAction = useAction(updateCompanyAction, {
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Company updated successfully",
        duration: 2000,
      });
      router.refresh();
      setOpen(false);
    },
    onError: ({ error }) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update company " + error.serverError,
        duration: 2000,
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof updateCompanySchema>) => {
    await updateAction.executeAsync({ ...data });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PencilLine size={18} className=" text-amber-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <DialogHeader>
              <DialogTitle>Update Company</DialogTitle>
            </DialogHeader>
            {/* Content Form */}
            <FormContent control={form.control} />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" variant="default">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
