import type { WidgetProps } from "@rjsf/utils";
import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxWidget({ id, value, disabled, onChange }: WidgetProps) {
  return (
    <Checkbox
      id={id}
      checked={!!value}
      disabled={disabled}
      onCheckedChange={(checked) => onChange(checked === true)}
    />
  );
}
