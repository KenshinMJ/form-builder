import { NextResponse } from "next/server";
import { applicationTypeRepository } from "../../../lib/application-repository";

export async function GET() {
  const applicationTypes = await applicationTypeRepository.getAll();
  return NextResponse.json(applicationTypes);
}

export async function POST(req: Request) {
  const newApplicationType = await req.json();
  try {
    const savedApplicationType =
      await applicationTypeRepository.save(newApplicationType);
    return NextResponse.json(savedApplicationType, { status: 201 });
  } catch (error) {
    console.error("Failed to save application type:", error);
    return NextResponse.json(
      { error: "Failed to save application type" },
      { status: 500 },
    );
  }
}
