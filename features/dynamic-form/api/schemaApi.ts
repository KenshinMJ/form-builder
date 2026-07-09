import type { FormDefinition } from "../types";
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
