import type { Employee } from "../types";

export async function searchEmployees(query: string): Promise<Employee[]> {
  const res = await fetch(`/api/employees?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("failed to search employees");
  return res.json();
}

export async function fetchEmployeeById(id: string): Promise<Employee | null> {
  const res = await fetch(`/api/employees/${id}`);
  if (!res.ok) return null;
  return res.json();
}
