import { notFound } from "next/navigation";
import {
  applicationRepository,
  applicationTypeRepository,
} from "@/lib/application-repository";
import ApplicationForm from "@/features/application/components/ApplicationForm";

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = await applicationRepository.getById(id);

  if (!application) {
    notFound();
  }
  const applicationType = await applicationTypeRepository.getById(
    application.applicationTypeId,
  );
  if (!applicationType) {
    notFound();
  }

  return (
    <main className="p-8">
      <ApplicationForm
        formDefinition={applicationType.formDefinition}
        application={application}
      />
    </main>
  );
}
