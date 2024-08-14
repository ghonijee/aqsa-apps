import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils/utils";

type DropdownOption = {
  label: string;
  value: any;
};

interface MultiSelectDropdownProps {
  placeholder: string;
  selectedItems: DropdownOption[];
  items: DropdownOption[];
  onSelected: (item: DropdownOption) => void;
}

export default function MultiSelectDropdown({
  placeholder,
  selectedItems,
  items,
  onSelected,
}: MultiSelectDropdownProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      <Popover open={openDropdown} onOpenChange={setOpenDropdown}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between font-normal text-muted-foreground h-10"
          >
            {selectedItems.length > 0 ? (
              <span className="text-ellipsis overflow-hidden">
                {selectedItems.flatMap((item) => item.label).join(", ")}
              </span>
            ) : (
              <span className="text-slate-500">{placeholder ?? "Pilih"}</span>
            )}

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandGroup>
              <CommandList>
                {items.map((value: DropdownOption, index) => {
                  const isSelected = selectedItems.some(
                    (item) => item.value == value.value
                  );

                  return (
                    <CommandItem
                      key={index}
                      value={value.value}
                      onSelect={() => {
                        onSelected(value);
                        setOpenDropdown(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {value.label}
                    </CommandItem>
                  );
                })}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
