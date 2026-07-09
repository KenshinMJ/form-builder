import type { Profile } from "../types";

export async function fetchProfile(): Promise<Profile> {
  const res = await fetch("/api/profile");
  if (!res.ok) throw new Error("failed to fetch profile");
  return res.json();
}

export async function saveProfile(data: Profile): Promise<Profile> {
  const res = await fetch("/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("failed to save profile");
  return res.json();
}
