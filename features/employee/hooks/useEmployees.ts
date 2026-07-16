"use client";

import { useCallback, useState } from "react";
import { Employee } from "../types";
import { saveEmployee } from "../api/employeeApi";

export function useEmployee(initialEmployee?: Employee) {
  const [employee, setEmployee] = useState<Employee | undefined>(
    initialEmployee,
  );
  const [isSaving, setSaving] = useState(false);

  const submit = useCallback(async (data: Employee) => {
    setSaving(true);
    try {
      // サーバーに送信 → 戻り値を最新の正として使う
      const updated = await saveEmployee(data);
      setEmployee(updated);
    } finally {
      setSaving(false);
    }
  }, []);

  return { employee, submit, isSaving };
}
