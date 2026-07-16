import { employeeRepository } from "@/lib/employee-repository";
import { EmployeeList } from "@/features/employee/components/EmployeeList";

export default async function EmployeeListPage() {
  const employees = await employeeRepository.getAll();

  return (
    <main className="p-8">
      <EmployeeList initialEmployees={employees} />
    </main>
  );
}
