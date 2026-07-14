import type { RJSFSchema, UiSchema } from "@rjsf/utils";

export type FormDefinition = {
  schema: RJSFSchema;
  uiSchema: UiSchema;
};

export type ApplicationType = {
  id: string;
  name: string;
  description: string;
  formDefinition?: FormDefinition;
};
