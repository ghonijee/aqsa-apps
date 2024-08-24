"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";

export default function SearchInput({
  onChange,
  defaultValue,
}: {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
}) {
  const [value, setValue] = useState("");

  const onChangeDebounced = useDebouncedCallback(onChange, 500);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChangeDebounced(e);
  };

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute left-3 top-3 text-muted" />
      <Input
        type="search"
        value={value}
        placeholder="Search "
        onChange={onChangeInput}
        className="h-10 w-full active:border-primary pl-10"
      />
    </div>
  );
}
