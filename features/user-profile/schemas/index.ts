import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import rawSchema from "./profileSchema.json";
import rawUiSchema from "./profileUiSchema.json";

export const profileSchema = rawSchema as RJSFSchema;
export const profileUiSchema = rawUiSchema as UiSchema;
