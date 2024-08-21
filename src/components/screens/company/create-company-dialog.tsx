import { createCompanyAction } from "@/actions/company/company.action";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createCompanySchema } from "@/schemas/company.schema";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormContent from "./form-content";

export default function CreateCompanyDialog() {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createCompanySchema>>({
    defaultValues: {
      isActive: true,
    },
  });

  const createAction = useAction(createCompanyAction, {
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Company created successfully",
        duration: 2000,
      });
      router.refresh();
      setOpen(false);
    },
    onError: ({ error }) => {
      console.log(error);
      toast({
        variant: "destructive",

        title: "Error",
        description: "Failed to create company",
        duration: 2000,
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof createCompanySchema>) => {
    await createAction.executeAsync({ ...data });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"} size={"default"}>
          Add Company
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
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
