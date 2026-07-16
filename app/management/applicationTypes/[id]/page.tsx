import { applicationTypeRepository } from "@/lib/application-repository";
import { ApplicationTypeEditor } from "@/features/dynamic-form/components/ApplicationTypeEditor";
import { notFound } from "next/navigation";

export default async function ApplicationTypeEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const applicationType = await applicationTypeRepository.getById(id);

  if (!applicationType) {
    notFound();
  }

  return (
    <main className="p-8">
      <ApplicationTypeEditor applicationType={applicationType} />
    </main>
  );
}
