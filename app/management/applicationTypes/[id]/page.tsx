import { ApplicationTypeEditor } from "@/features/dynamic-form/components/ApplicationTypeEditor";

export default async function ApplicationTypeEditPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  return <ApplicationTypeEditor formId={id} />;
}
