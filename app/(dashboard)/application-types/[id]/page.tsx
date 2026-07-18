import { notFound } from "next/navigation";
import {
  applicationRepository,
  applicationTypeRepository,
} from "@/lib/application-repository";
import ApplicationForm from "@/features/application/components/ApplicationForm";

export default async function NewApplicationPage({
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
      <ApplicationForm formDefinition={applicationType.formDefinition} />
    </main>
  );
}
