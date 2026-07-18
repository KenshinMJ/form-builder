import { ApplicationTypeSelect } from "@/features/application/components/ApplicationTypeSelect";
import { applicationTypeRepository } from "@/lib/application-repository";

export default async function ApplicationTypesSelectPage() {
  const applicationTypes = await applicationTypeRepository.getAll();

  return (
    <main className="p-8">
      <ApplicationTypeSelect applicationTypes={applicationTypes} />
    </main>
  );
}
