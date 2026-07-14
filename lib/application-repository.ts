import { dynamoDb } from "./dynamodb";
import { ApplicationType, Application } from "../types/application";
import { v4 as uuidv4 } from "uuid";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const APPLICATION_TYPES_TABLE_NAME =
  process.env.APPLICATION_TYPES_TABLE_NAME || "ApplicationTypes";
const APPLICATIONS_TABLE_NAME =
  process.env.APPLICATIONS_TABLE_NAME || "Applications";

export const applicationTypeRepository = {
  async getAll(): Promise<ApplicationType[]> {
    const command = new ScanCommand({
      TableName: APPLICATION_TYPES_TABLE_NAME,
    });
    const result = await dynamoDb.send(command);
    const record = result.Items![0];
    const x = record[""];
    return (result.Items as unknown as ApplicationType[]) || [];
  },

  async getById(id: string): Promise<ApplicationType | null> {
    const command = new GetCommand({
      TableName: APPLICATION_TYPES_TABLE_NAME,
      Key: { id },
    });
    const result = await dynamoDb.send(command);
    return (result.Item as ApplicationType) || null;
  },

  async save(applicationType: ApplicationType): Promise<ApplicationType> {
    const now = new Date().toISOString();
    const item = { ...applicationType, updatedAt: now };
    if (!item.id) {
      item.id = uuidv4();
      // TODO: createdAtを設定
    }

    const command = new PutCommand({
      TableName: APPLICATION_TYPES_TABLE_NAME,
      Item: item,
    });
    await dynamoDb.send(command);

    return item;
  },

  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: APPLICATION_TYPES_TABLE_NAME,
      Key: { id },
    });
    await dynamoDb.send(command);
  },
};

export const applicationRepository = {
  async getAll(): Promise<Application[]> {
    const command = new ScanCommand({
      TableName: APPLICATIONS_TABLE_NAME,
    });
    const result = await dynamoDb.send(command);
    return (result.Items as unknown as Application[]) || [];
  },

  async getById(id: string): Promise<Application | null> {
    const command = new GetCommand({
      TableName: APPLICATIONS_TABLE_NAME,
      Key: { id },
    });
    const result = await dynamoDb.send(command);
    return (result.Item as Application) || null;
  },

  async save(application: Application): Promise<Application> {
    const now = new Date().toISOString();
    const item = { ...application, updatedAt: now };
    if (!item.id) {
      item.id = uuidv4();
      item.createdAt = now;
    }
    const command = new PutCommand({
      TableName: APPLICATIONS_TABLE_NAME,
      Item: item,
    });
    await dynamoDb.send(command);
    return item;
  },

  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: APPLICATIONS_TABLE_NAME,
      Key: { id },
    });
    await dynamoDb.send(command);
  },

  async find(query: {
    applicationTypeId?: string;
    applicant?: string;
    title?: string;
    status?: "pending" | "approved" | "rejected";
  }): Promise<Application[]> {
    const command = new ScanCommand({
      TableName: APPLICATIONS_TABLE_NAME,
      FilterExpression: "",
      ExpressionAttributeValues: {},
    });

    const exprAttrVals: Record<string, string> = {};
    let exprAttrNames: Record<string, string> = {};
    const conditions: string[] = [];

    if (query.applicationTypeId) {
      conditions.push("applicationTypeId = :applicationTypeId");
      exprAttrVals[":applicationTypeId"] = query.applicationTypeId;
    }
    if (query.applicant) {
      conditions.push("applicant = :applicant");
      exprAttrVals[":applicant"] = query.applicant;
    }
    if (query.title) {
      conditions.push("contains(title, :title)");
      exprAttrVals[":title"] = query.title;
    }
    if (query.status) {
      conditions.push("#s = :status");
      exprAttrVals[":status"] = query.status;
      exprAttrNames = { "#s": "status" };
    }

    if (conditions.length > 0) {
      command.input.FilterExpression = conditions.join(" AND ");
    }

    command.input.ExpressionAttributeValues = exprAttrVals as any;
    command.input.ExpressionAttributeNames = exprAttrNames;

    const result = await dynamoDb.send(command);
    return (result.Items as unknown as Application[]) || [];
  },
};
