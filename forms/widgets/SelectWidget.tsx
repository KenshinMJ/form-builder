import type { WidgetProps } from "@rjsf/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectWidget({
  id,
  value,
  disabled,
  options,
  onChange,
}: WidgetProps) {
  const { enumOptions } = options;

  return (
    <Select value={value ?? ""} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger id={id}>
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        {enumOptions?.map((opt) => (
          <SelectItem key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
