export type FormDefinition = Record<string, any>;

export type ApplicationType = {
  id: string;
  name: string;
  description: string;
  formDefinition: FormDefinition;
};
