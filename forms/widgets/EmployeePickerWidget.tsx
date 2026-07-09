"use client";

import { useEffect, useState } from "react";
import type { WidgetProps } from "@rjsf/utils";
import { EmployeeCombobox } from "@/features/employee-picker/components/EmployeeCombobox";
import { fetchEmployeeById } from "@/features/employee-picker/api/employeeApi";
import type { Employee } from "@/features/employee-picker/types";

export function EmployeePickerWidget({
  id,
  value,
  disabled,
  onChange,
}: WidgetProps) {
  const [selected, setSelected] = useState<Employee | null>(null);

  // formData に入っているのは社員ID（string）のみなので、表示用に社員情報を取得
  useEffect(() => {
    if (!value) {
      setSelected(null);
      return;
    }
    fetchEmployeeById(value).then(setSelected);
  }, [value]);

  return (
    <div id={id}>
      <EmployeeCombobox
        value={selected}
        disabled={disabled}
        onChange={(employee) => {
          setSelected(employee);
          onChange(employee?.id); // RJSFのformDataにはIDだけ保存
        }}
      />
    </div>
  );
}
