import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({
  onChange,
  value,
}: {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) {
  const onChangeDebounced = useDebouncedCallback(onChange, 500);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute left-3 top-3 text-muted" />
      <Input
        defaultValue={value}
        placeholder="Search "
        onChange={onChangeDebounced}
        className="h-10 w-full active:border-primary pl-10"
      />
    </div>
  );
}
