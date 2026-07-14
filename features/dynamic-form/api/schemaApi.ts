import type { ApplicationType, FormDefinition } from "../types";
import Ajv from "ajv";
const ajv = new Ajv();

export async function fetchFormDefinition(
  formId: string,
): Promise<FormDefinition> {
  const data = await fetch(`/api/schemas/${formId}`).then((r) => r.json());
  const validate = ajv.compile({ type: "object" }); // meta-schema検証
  if (!ajv.validateSchema(data.schema)) {
    throw new Error("invalid JSON Schema from external tool");
  }
  return data;
}

export async function fetchApplicationTypes(): Promise<ApplicationType[]> {
  const res = await fetch(`/api/applicationTypes`);
  if (!res.ok) throw new Error("invalid JSON Schema from external tool");
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
  console.warn(res);
  if (!res.ok) throw new Error("failed to save application type");
  return res.json();
}
