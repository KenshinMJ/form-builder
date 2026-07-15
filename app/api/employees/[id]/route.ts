import { employeeRepository } from "@/lib/employee-repository";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const employee = await employeeRepository.getById(id);

  if (!employee) {
    return NextResponse.json({ error: "Employee not found" }, { status: 404 });
  }

  return NextResponse.json(employee);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = await req.json();

  if (id !== data.id) {
    return NextResponse.json({ error: "ID mismatch" }, { status: 400 });
  }

  try {
    const updatedEmployee = await employeeRepository.save(data);
    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error("failed to save employee", error);
    return NextResponse.json(
      { error: "Failed to save employee" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await employeeRepository.delete(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("failed to delete employee", error);
    return NextResponse.json(
      { error: "Failed to delete employee" },
      { status: 500 },
    );
  }
}
