import { dynamoDb } from "./dynamodb";
import { v4 as uuidv4 } from "uuid";
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { Employee } from "@/features/employee/types";

const EMPLOYEES_TABLE_NAME = process.env.EMPLOYEES_TABLE_NAME || "Employees";

export const employeeRepository = {
  async getAll(): Promise<Employee[]> {
    const command = new ScanCommand({
      TableName: EMPLOYEES_TABLE_NAME,
    });
    const result = await dynamoDb.send(command);
    return (result.Items as unknown as Employee[]) || [];
  },

  async getById(id: string): Promise<Employee | null> {
    const command = new GetCommand({
      TableName: EMPLOYEES_TABLE_NAME,
      Key: { id },
    });
    const result = await dynamoDb.send(command);
    return (result.Item as Employee) || null;
  },

  async save(employee: Employee): Promise<Employee> {
    const item = { ...employee };
    if (!item.id) {
      item.id = uuidv4();
    }

    const command = new PutCommand({
      TableName: EMPLOYEES_TABLE_NAME,
      Item: item,
    });
    await dynamoDb.send(command);

    return item;
  },

  async delete(id: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: EMPLOYEES_TABLE_NAME,
      Key: { id },
    });
    await dynamoDb.send(command);
  },
};
