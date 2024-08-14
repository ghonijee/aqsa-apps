import { Search } from "lucide-react";
import { Input } from "../ui/input";

export default function SearchInput({
  onChange,
  value,
}: {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) {
  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute left-3 top-3 text-muted" />
      <Input
        placeholder="Search "
        onChange={onChange}
        className="h-10 w-full active:border-primary pl-10"
      />
    </div>
  );
}
