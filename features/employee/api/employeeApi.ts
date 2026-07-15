import { Employee } from "../types";

export async function fetchEmployees(): Promise<Employee[]> {
  const res = await fetch(`/api/employees`);
  if (!res.ok) throw new Error("failed to fetch employees");
  return res.json();
}

export async function fetchEmployee(id: string): Promise<Employee> {
  const res = await fetch(`/api/employees/${id}`);
  if (!res.ok) throw new Error("failed to fetch employee");
  return res.json();
}

export async function saveEmployee(data: Employee): Promise<Employee> {
  const res = await fetch(`/api/employees/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("failed to save employee");
  return res.json();
}
