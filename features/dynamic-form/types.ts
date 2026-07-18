import type { FormType } from "@formio/react";

export type FormDefinition = FormType;

export type ApplicationType = {
  id: string;
  name: string;
  description: string;
  formDefinition: FormDefinition;
};
