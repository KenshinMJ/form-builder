// import { applicationTypesTable, applicationsTable } from "./storage";

export const site = new sst.aws.Nextjs("Site", {
  link: [applicationTypesTable, applicationsTable, employeesTable],
  environment: {
    NEXT_PUBLIC_FORMIO_URL:
      process.env.NEXT_PUBLIC_FORMIO_URL || "https://examples.form.io",
    NEXT_PUBLIC_FORMIO_PROJECT_ID:
      process.env.NEXT_PUBLIC_FORMIO_PROJECT_ID || "64a7e0f3c1b6d8e5f9a2b1c4",
    AWS_REGION: aws.getRegionOutput().region,
    APPLICATION_TYPES_TABLE_NAME: applicationTypesTable.name,
    APPLICATIONS_TABLE_NAME: applicationsTable.name,
    EMPLOYEE_TABLE_NAME: employeesTable.name,
  },
});
