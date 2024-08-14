"use client";

import { useAction } from "next-safe-action/hooks";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo, useState } from "react";
import {
  ChartOfAccountType,
  ChartOfAccountWithLevel,
} from "../../../../../../entities/finance/chart-of-account.entity";
import { createChartOfAccountAction } from "@/actions/chart_of_account/chart-of-account.action";
import { newAccountSchema } from "@/schemas/chart-of-account.schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export default function NewAccountDialog({
  accounts,
}: {
  accounts: ChartOfAccountWithLevel[];
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof newAccountSchema>>({
    defaultValues: {
      name: "",
      code: "",
    },
    resolver: zodResolver(newAccountSchema),
  });

  const parentOptions = useMemo(() => {
    return accounts.filter((item) => item.type == ChartOfAccountType.View);
  }, [accounts]);

  const createAction = useAction(createChartOfAccountAction, {
    onSuccess: () => {
      setOpen(false);
      form.reset();
      router.refresh();
      toast({
        title: "Success",
        description: "Account created successfully",
        variant: "success",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Account created failed",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  function handleSubmit(values: z.infer<typeof newAccountSchema>) {
    createAction.execute({ ...values });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size={"sm"}>
          New Accounts
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-40 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <DialogHeader>
              <DialogTitle>Add New Accounts</DialogTitle>
            </DialogHeader>
            {/* Content Form */}
            {/* <FormChartOfAccount form={form} parentOptions={parentOptions} /> */}
            <div className="flex flex-col space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Account Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Account Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Account Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="parent"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Account Parent</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between hover:text-muted",
                              !field.value && "text-muted"
                            )}
                          >
                            {field.value
                              ? parentOptions.find(
                                  (option) => option.id === field.value?.id
                                )?.name
                              : "Select Account Parent"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              {parentOptions.map((option) => (
                                <CommandItem
                                  key={option.id}
                                  onSelect={() => {
                                    form.setValue("parent", {
                                      id: option.id!,
                                      name: option.name,
                                    });
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      option.id === field.value?.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {option.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex gap-x-1 justify-end flex-1">
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
