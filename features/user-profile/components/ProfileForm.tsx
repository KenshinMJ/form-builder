"use client";

// import { ShadcnForm, validator } from "@/forms/theme";
// import { Button } from "@/components/ui/button";
import { DynamicForm } from "@/features/dynamic-form/components/DynamicForm";
import { useProfileForm } from "../hooks/useProfileForm";
import type { Profile } from "../types";
// import { profileSchema, profileUiSchema } from "../schemas";

export function ProfileForm() {
  const { profile, saving, submit } = useProfileForm();

  if (!profile) return <p>読み込み中...</p>;

  return (
    // <ShadcnForm
    //   schema={profileSchema}
    //   uiSchema={profileUiSchema}
    //   formData={profile}
    //   validator={validator}
    //   onSubmit={({ formData }) => submit(formData as Profile)}
    // >
    //   <Button type="submit" disabled={saving}>
    //     {saving ? "保存中..." : "保存する"}
    //   </Button>
    // </ShadcnForm>
    <DynamicForm
      formId="profile"
      formData={profile}
      saving={saving}
      onSubmit={(data) => submit(data as Profile)}
    />
  );
}
