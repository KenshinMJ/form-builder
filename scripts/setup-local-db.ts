import {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
  ResourceNotFoundException,
  CreateTableCommandInput,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "local-env",
  endpoint: "http://localhost:8000",
  credentials: { accessKeyId: "dummy", secretAccessKey: "dummy" },
});

const APPLICATION_TYPE_TABLE_DEF: CreateTableCommandInput = {
  TableName: "ApplicationTypes",
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  BillingMode: "PAY_PER_REQUEST",
};

const APPLICATION_TABLE_DEF: CreateTableCommandInput = {
  TableName: "Applications",
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
    { AttributeName: "applicationTypeId", AttributeType: "S" },
    { AttributeName: "applicant", AttributeType: "S" },
    { AttributeName: "status", AttributeType: "S" },
  ],
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  GlobalSecondaryIndexes: [
    {
      IndexName: "applicationTypeIdIndex",
      KeySchema: [{ AttributeName: "applicationTypeId", KeyType: "HASH" }],
      Projection: {
        ProjectionType: "ALL",
      },
    },
    {
      IndexName: "applicantStatusIndex",
      KeySchema: [
        { AttributeName: "applicant", KeyType: "HASH" },
        { AttributeName: "status", KeyType: "RANGE" },
      ],
      Projection: {
        ProjectionType: "ALL",
      },
    },
  ],
  BillingMode: "PAY_PER_REQUEST",
};

const TABLE_DEFINITIONS: CreateTableCommandInput[] = [
  APPLICATION_TYPE_TABLE_DEF,
  APPLICATION_TABLE_DEF,
];

async function tableExists(tableName: string): Promise<boolean> {
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    return true;
  } catch (e) {
    if (e instanceof ResourceNotFoundException) return false;
    throw e;
  }
}

async function createTableIfNotExists(def: CreateTableCommandInput) {
  const exists = await tableExists(def.TableName!);
  if (exists) {
    console.log(`Table ${def.TableName} already exists. Skipping creation.`);
    return;
  }

  await client.send(new CreateTableCommand(def));
  console.log(`Table ${def.TableName} created.`);
}

async function main() {
  for (const def of TABLE_DEFINITIONS) {
    await createTableIfNotExists(def);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
