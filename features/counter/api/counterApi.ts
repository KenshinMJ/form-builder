import type { CounterResponse } from "../types";

export async function fetchCounter(): Promise<CounterResponse> {
  const res = await fetch("/api/counter");
  if (!res.ok) throw new Error("failed to fetch counter");
  return res.json();
}

export async function incrementCounter(): Promise<CounterResponse> {
  const res = await fetch("/api/counter", { method: "POST" });
  if (!res.ok) throw new Error("failed to increment counter");
  return res.json();
}
