"use client";

import { Button, Form } from "react-bootstrap";
import FormEditor from "./FormEditor";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useApplicationType } from "../hooks/useApplicationTypes";
import { FormDefinition } from "../types";

type ApplicationTypeEditorProps = {
  formId: string | null;
};

export function ApplicationTypeEditor({ formId }: ApplicationTypeEditorProps) {
  const isNew = !formId;

  const { applicationType, loading, error, submit, isSaving } =
    useApplicationType(formId || "");

  const [inputFormId, setInputFormId] = useState<string>(formId ?? "new");
  const [title, setTitle] = useState<string>(applicationType?.name ?? "");
  const [description, setDescription] = useState<string>(
    applicationType?.description ?? "",
  );
  const [definition, setDefinition] = useState<FormDefinition | null>(
    applicationType?.formDefinition ?? null,
  );

  // 社員データが取得できたら名前をセットする
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
      formDefinition: definition ?? {},
    });
  };

  return (
    <main className="py-3">
      <h1>申請種別編集</h1>
      <div className="d-flex flex-column flex-md-row gap-3">
        <Link href="/management/applicationTypes">
          <Button variant="light">Cancel</Button>
        </Link>
        <Button as="input" type="submit" onClick={handleSave} value="保存" />
      </div>
      <Form>
        <div>
          <Form.Group className="mb-3" controlId="title">
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
          definition={definition}
          loading={loading}
          error={error}
          onChange={(e) => setDefinition(e)}
        />
      </Form>
    </main>
  );
}
