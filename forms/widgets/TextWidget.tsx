import type { WidgetProps } from "@rjsf/utils";
import { Input } from "@/components/ui/input";

export function TextWidget({
  id,
  value,
  required,
  disabled,
  onChange,
}: WidgetProps) {
  return (
    <Input
      id={id}
      value={value ?? ""}
      required={required}
      disabled={disabled}
      onChange={(e) =>
        onChange(e.target.value === "" ? undefined : e.target.value)
      }
    />
  );
}
