import { ApplicationTypeList } from "@/features/dynamic-form/components/ApplicationTypeList";
import { applicationTypeRepository } from "@/lib/application-repository";

export default async function ApplicationTypesPage() {
  const applicationTypes = await applicationTypeRepository.getAll();

  return (
    <main className="p-8">
      <ApplicationTypeList applicationTypes={applicationTypes} />
    </main>
  );
}
