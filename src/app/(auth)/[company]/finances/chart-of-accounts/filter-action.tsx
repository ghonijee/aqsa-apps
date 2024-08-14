import { ChartOfAccountWithLevel } from "@/entities";
import NewAccountDialog from "./components/new-account-dialog";

export default function FilterAction({
  accounts,
}: {
  accounts: ChartOfAccountWithLevel[];
}) {
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
        <NewAccountDialog accounts={accounts} />
      </div>
    </div>
  );
}
