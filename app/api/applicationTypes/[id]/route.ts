import { NextResponse } from "next/server";
import { applicationTypeRepository } from "../../../../lib/application-repository";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const applicationType = await applicationTypeRepository.getById(id);

  if (!applicationType) {
    return NextResponse.json(
      { error: "Application type not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(applicationType);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const updatedApplicationType = await req.json();
  try {
    const savedApplicationType = await applicationTypeRepository.save({
      ...updatedApplicationType,
    });
    return NextResponse.json(savedApplicationType);
  } catch (error) {
    console.error("Failed to update application type:", error);
    return NextResponse.json(
      { error: "Failed to update application type" },
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
    await applicationTypeRepository.delete(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete application type:", error);
    return NextResponse.json(
      { error: "Failed to delete application type" },
      { status: 500 },
    );
  }
}
