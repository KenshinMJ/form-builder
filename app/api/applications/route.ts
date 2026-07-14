import { NextResponse } from "next/server";
import { applicationRepository } from "../../../lib/application-repository";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const applicationTypeId = searchParams.get("applicationTypeId") || undefined;
  const applicant = searchParams.get("applicant") || undefined;
  const title = searchParams.get("title") || undefined;
  const status = searchParams.get("status") || undefined;

  const applications = await applicationRepository.find({
    applicationTypeId,
    applicant,
    title,
    status: status as "pending" | "approved" | "rejected" | undefined,
  });
  return NextResponse.json(applications);
}

export async function POST(req: Request) {
  const newApplication = await req.json();
  try {
    const savedApplication = await applicationRepository.save(newApplication);
    return NextResponse.json(savedApplication, { status: 201 });
  } catch (error) {
    console.error("Failed to save application:", error);
    return NextResponse.json(
      { error: "Failed to save application" },
      { status: 500 },
    );
  }
}
