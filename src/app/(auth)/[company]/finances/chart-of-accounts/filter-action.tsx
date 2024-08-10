"use client";

import MultiSelectDropdown from "@/components/filter/multi-select-dropdown";
import SearchInput from "@/components/filter/search-input";
import { Button } from "@/components/ui/button";
import { ChartOfAccountOptions } from "@/entities";

export default function FilterAction() {
  return (
    <div className="flex space-x-5 justify-start">
      {/* Filters */}
      {/* <div className="flex space-x-2">
        <div className="w-60">
          <SearchInput onChange={() => {}} />
        </div>
        <div className="w-60">
          <MultiSelectDropdown
            placeholder="Type"
            items={ChartOfAccountOptions.map((value) => ({
              label: value,
              value: value,
            }))}
            selectedItems={[]}
            onSelected={() => {}}
          />
        </div>
        <Button variant={"soft"} className="">
          Apply
        </Button>
      </div> */}
      {/* Actions */}
      <div>
        <Button className="w-full" size={"sm"}>
          New Accounts
        </Button>
      </div>
    </div>
  );
}
