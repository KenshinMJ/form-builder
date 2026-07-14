export type ApplicationType = {
  id: string;
  name: string;
  description: string;
  schema: any; // Form.io schema
};

export type Application = {
  id: string;
  applicationTypeId: string;
  applicant: string;
  title: string;
  status: "pending" | "approved" | "rejected";
  data: any;
  createdAt: string;
  updatedAt: string;
};
