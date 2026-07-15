import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ formId: string }> },
) {
  const { formId } = await params;
  const schemasPath = "features/user-profile/schemas";

  // 例: json をそのまま配信
  const schemaPath = path.join(
    process.cwd(),
    schemasPath,
    `${formId}Schema.json`,
  );
  const uiSchemaPath = path.join(
    process.cwd(),
    schemasPath,
    `${formId}UiSchema.json`,
  );

  const [schema, uiSchema] = await Promise.all([
    readFile(schemaPath, "utf-8").then(JSON.parse),
    readFile(uiSchemaPath, "utf-8")
      .then(JSON.parse)
      .catch(() => ({})),
  ]);

  return NextResponse.json({ schema, uiSchema });
}
