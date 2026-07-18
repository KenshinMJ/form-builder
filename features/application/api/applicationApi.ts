import { Application } from "../types";

export async function fetchApplications(): Promise<Application[]> {
  const res = await fetch(`/api/applications`);
  if (!res.ok) throw new Error("Failed to fetch applications");
  return res.json();
}

export async function fetchApplication(id: string): Promise<Application> {
  const res = await fetch(`/api/applications/${id}`);
  if (!res.ok) throw new Error("Failed to fetch application");
  return res.json();
}

export async function saveApplication(data: Application): Promise<Application> {
  const method = data.id ? "PUT" : "POST";
  const url = data.id ? `/api/applications/${data.id}` : `/api/applications`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save application");
  return res.json();
}
