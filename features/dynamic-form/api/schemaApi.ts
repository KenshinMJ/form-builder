import { ApplicationType } from "@/types/application";

export async function saveApplicationType(
  data: ApplicationType,
): Promise<ApplicationType> {
  const res = await fetch(`/api/applicationTypes/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("failed to save application type");
  return res.json();
}
