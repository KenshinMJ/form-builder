import { ApplicationType } from "../types";

export async function fetchApplicationTypes(): Promise<ApplicationType[]> {
  const res = await fetch(`/api/applicationTypes`);
  if (!res.ok) throw new Error("failed to fetch application types");
  return res.json();
}

export async function fetchApplicationType(
  id: string,
): Promise<ApplicationType> {
  const res = await fetch(`/api/applicationTypes/${id}`);
  if (!res.ok) throw new Error("failed to fetch application type");
  return res.json();
}

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
