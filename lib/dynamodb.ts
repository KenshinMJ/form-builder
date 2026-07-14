import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const isLocal = process.env.APP_ENV === "local";

const awsDynamoDBClientConfig = {
  region: process.env.AWS_REGION || "ap-northeast-1",
  endpoint: process.env.DYNAMODB_ENDPOINT,
} as const satisfies DynamoDBClientConfig;

const localDynamoDBClientConfig = {
  region: "local-env",
  endpoint: "http://localhost:8000",
  credentials: { accessKeyId: "dummy", secretAccessKey: "dummy" },
} as const satisfies DynamoDBClientConfig;

const client = new DynamoDBClient(
  isLocal ? localDynamoDBClientConfig : awsDynamoDBClientConfig,
);
const dynamoDb = DynamoDBDocumentClient.from(client);

export { dynamoDb };
