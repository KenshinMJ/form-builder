"use client";

import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useApplication } from "@/features/application/hooks/useApplications";
import { Application } from "@/features/application/types";
import { FormDefinition } from "@/features/dynamic-form/types";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ApplicationFormRenderer = dynamic(
  () => import("@/features/application/components/ApplicationFormRenderer"),
  {
    ssr: false,
  },
);

type ApplicationProps = {
  formDefinition: FormDefinition;
  application?: Application;
};

export const s = {
  id: "",
  applicationTypeId: "new",
  applicant: "",
  title: "",
  status: "pending" as const,
  data: {},
  createdAt: "",
  updatedAt: "",
} as const satisfies Application;

export default function ApplicationForm({
  formDefinition,
  application: initialApplication,
}: ApplicationProps) {
  const router = useRouter();
  const isNew = !initialApplication;

  const { application, submit, isSaving } = useApplication(initialApplication);

  const [title, setTitle] = useState(initialApplication?.title || "");
  const [applicant, setApplicant] = useState(
    initialApplication?.applicant || "",
  );
  const [formData, setFormData] = useState(initialApplication?.data || {});

  const handleFormChange = (newForm: any) => {
    setFormData(newForm.data);
  };

  const handleSave = async () => {
    if (!title) {
      alert("申請タイトルを入力してください。");
      return;
    }

    const saved = await submit({
      id: initialApplication?.id || "",
      applicationTypeId: initialApplication?.applicationTypeId ?? "new",
      applicant: "申請者",
      title: title,
      status: initialApplication?.status || "pending",
      data: formData,
      createdAt: initialApplication?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    if (isNew && saved) {
      router.push(`/applications/${saved.id}`);
    }
  };

  return (
    <main className="py-3">
      <h1>{isNew ? "新規申請" : "申請編集"}</h1>
      <div className="d-flex flex-column flex-md-row gap-3">
        <Button variant="light" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button
          as="input"
          type="submit"
          onClick={handleSave}
          value="保存"
          disabled={isSaving}
        />
      </div>
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>申請タイトル</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="applicant">
          <Form.Label>申請者</Form.Label>
          <Form.Control
            type="text"
            value={applicant}
            onChange={(e) => setApplicant(e.target.value)}
          />
        </Form.Group>

        <div className="my-4 p-3 border rounded">
          <h3>フォーム内容</h3>
          <ApplicationFormRenderer
            formDefinition={formDefinition}
            onSubmit={(content) => {
              console.info(content);
            }}
          />
        </div>
      </Form>
    </main>
  );
}
