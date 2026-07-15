import { employeeRepository } from "@/lib/employee-repository";
import { NextResponse } from "next/server";

export async function GET() {
  const employees = await employeeRepository.getAll();
  return NextResponse.json(employees);
}
