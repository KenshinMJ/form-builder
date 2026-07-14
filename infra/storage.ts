const applicationTypesTable = new sst.aws.Dynamo("ApplicationTypes", {
  fields: { id: "string" },
  primaryIndex: { hashKey: "id" },
});

const applicationsTable = new sst.aws.Dynamo("Applications", {
  fields: {
    id: "string",
    applicationTypeId: "string",
    applicant: "string",
    status: "string",
  },
  primaryIndex: { hashKey: "id" },
  globalIndexes: {
    applicationTypeIdIndex: {
      hashKey: "applicationTypeId",
    },
    applicantStatusIndex: {
      hashKey: "applicant",
      rangeKey: "status",
    },
  },
});
