"use client";

import { useCallback, useEffect, useState } from "react";
import { Employee } from "../types";
import {
  fetchEmployee,
  fetchEmployees,
  saveEmployee,
} from "../api/employeeApi";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchEmployees().then(setEmployees);
  }, []);

  return { employees };
}

export function useEmployee(id: string | null) {
  const [employee, setEmployee] = useState<Employee>();
  const [isSaving, setSaving] = useState(false);

  if (id) {
    useEffect(() => {
      fetchEmployee(id).then(setEmployee);
    }, [id]);
  }

  const submit = useCallback(async (data: Employee) => {
    setSaving(true);
    try {
      // サーバーに送信 → 再取得（最新の正としてサーバー値を使う）
      await saveEmployee(data);
      const latest = await fetchEmployee(data.id);
      setEmployee(latest);
    } finally {
      setSaving(false);
    }
  }, []);

  return { employee, submit, isSaving };
}
