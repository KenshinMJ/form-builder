import type { FieldTemplateProps } from "@rjsf/utils";
import { Label } from "@/components/ui/label";

export function FieldTemplate({
  id,
  label,
  required,
  description,
  errors,
  children,
}: FieldTemplateProps) {
  return (
    <div className="mb-4 flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </Label>
      )}
      {description}
      {children}
      {errors && <div className="text-sm text-destructive">{errors}</div>}
    </div>
  );
}
