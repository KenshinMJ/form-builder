import { employeeRepository } from "@/lib/employee-repository";
import { EmployeeEditor } from "@/features/employee/components/EmployeeEditor";
import { notFound } from "next/navigation";

export default async function EmployeeEditPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const employee = await employeeRepository.getById(id);

  if (!employee) {
    notFound();
  }

  return (
    <main className="p-8">
      <EmployeeEditor initialEmployee={employee} />
    </main>
  );
}
