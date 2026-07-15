import { EmployeeEditor } from "@/features/employee/components/EmployeeEditor";

export default async function EmployeeEditPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  return <EmployeeEditor empId={id} />;
}
