import { NextResponse } from "next/server";
import { applicationRepository } from "../../../../lib/application-repository";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const application = await applicationRepository.getById(params.id);

  if (!application) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(application);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const updatedApplication = await req.json();
  try {
    const existingApplication = await applicationRepository.getById(params.id);
    if (!existingApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }
    const savedApplication = await applicationRepository.save({
      ...existingApplication,
      ...updatedApplication,
    });
    return NextResponse.json(savedApplication);
  } catch (error) {
    console.error("Failed to update application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await applicationRepository.delete(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete application:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 },
    );
  }
}
