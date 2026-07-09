"use client";

import { ShadcnForm, validator } from "@/forms/theme";
import { useFormSchema } from "../hooks/useFormSchema";
import { Button } from "@/components/ui/button";

type DynamicFormProps = {
  formId: string;
  formData?: unknown;
  onSubmit: (data: unknown) => void;
  saving?: boolean;
};

export function DynamicForm({
  formId,
  formData,
  onSubmit,
  saving,
}: DynamicFormProps) {
  const { definition, error, loading } = useFormSchema(formId);

  if (error)
    return <p className="text-destructive">スキーマの取得に失敗しました</p>;
  if (loading || !definition) return <p>読み込み中...</p>;

  return (
    <ShadcnForm
      schema={definition.schema}
      uiSchema={definition.uiSchema}
      formData={formData}
      validator={validator}
      onSubmit={({ formData }) => onSubmit(formData)}
    >
      <Button type="submit" disabled={saving}>
        {saving ? "保存中..." : "保存する"}
      </Button>
    </ShadcnForm>
  );
}
