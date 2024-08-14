import { ChartOfAccountWithLevel } from "@/entities";
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
import { Button } from "@/components/ui/button";

export function FormChartOfAccount({
  form,
  parentOptions,
}: {
  form: UseFormReturn<
    {
      id?: number;
      name: string;
      code: string;
      parent?:
        | {
            id: number;
            name: string;
          }
        | undefined;
      isActive?: boolean;
    },
    any,
    undefined
  >;
  parentOptions: ChartOfAccountWithLevel[];
}) {
  return (
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
  );
}
