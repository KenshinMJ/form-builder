"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEmployeeSearch } from "../hooks/useEmployeeSearch";
import type { Employee } from "../types";

type EmployeeComboboxProps = {
  value?: Employee | null;
  onChange: (employee: Employee | null) => void;
  disabled?: boolean;
};

export function EmployeeCombobox({
  value,
  onChange,
  disabled,
}: EmployeeComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { results, loading } = useEmployeeSearch(query);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          className="w-full justify-between"
        >
          {value ? `${value.name}（${value.department}）` : "社員を選択"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-75 p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="名前で検索..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {loading && <CommandEmpty>検索中...</CommandEmpty>}
            {!loading && results.length === 0 && (
              <CommandEmpty>該当する社員がいません</CommandEmpty>
            )}
            <CommandGroup>
              {results.map((emp) => (
                <CommandItem
                  key={emp.id}
                  value={emp.id}
                  onSelect={() => {
                    onChange(emp);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value?.id === emp.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {emp.name}（{emp.department}）
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
