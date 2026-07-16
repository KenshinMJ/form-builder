"use client";

import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useApplicationType } from "../hooks/useApplicationTypes";
import { FormDefinition } from "../types";
import { ApplicationType } from "@/types/application";
import dynamic from "next/dynamic";

const FormEditor = dynamic(() => import("./FormEditor"), {
  ssr: false,
});

type ApplicationTypeEditorProps = {
  applicationType?: ApplicationType;
};

export function ApplicationTypeEditor({
  applicationType: initialApplicationType,
}: ApplicationTypeEditorProps) {
  const applicationTypeId = initialApplicationType?.id;
  const isNew = !applicationTypeId;

  const { applicationType, submit, isSaving } = useApplicationType(
    initialApplicationType,
  );

  const [inputFormId, setInputFormId] = useState<string>(
    applicationTypeId ?? "new",
  );
  const [title, setTitle] = useState<string>(applicationType?.name ?? "");
  const [description, setDescription] = useState<string>(
    applicationType?.description ?? "",
  );
  const [definition, setDefinition] = useState<FormDefinition | null>(
    applicationType?.formDefinition ?? null,
  );

  // データが取得できたらセットする
  useEffect(() => {
    if (applicationType) {
      setTitle(applicationType.name);
      setDescription(applicationType.description);
      setDefinition(applicationType.formDefinition ?? null);
    }
  }, [applicationType]);

  const handleSave = async () => {
    await submit({
      id: inputFormId,
      name: title,
      description,
      formDefinition: definition ?? undefined,
    });
  };

  return (
    <main className="py-3">
      <h1>申請種別編集</h1>
      <div className="d-flex flex-column flex-md-row gap-3">
        <Link href="/management/applicationTypes">
          <Button variant="light">Cancel</Button>
        </Link>
        <Button
          as="input"
          type="submit"
          onClick={handleSave}
          value="保存"
          disabled={isSaving}
        />
      </div>
      <Form>
        <div>
          <Form.Group className="mb-3" controlId="applicationTypeId">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              value={inputFormId}
              onChange={(e) => setInputFormId(e.target.value)}
              disabled={!isNew}
              placeholder="profile"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>申請種別名</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="○○申請"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>説明</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </div>
        <FormEditor
          id={inputFormId}
          definition={definition}
          onChange={(e) => setDefinition(e)}
        />
      </Form>
    </main>
  );
}
