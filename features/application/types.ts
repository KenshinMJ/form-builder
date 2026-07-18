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
