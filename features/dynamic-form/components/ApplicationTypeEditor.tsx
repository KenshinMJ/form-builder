"use client";

import { Button, Form } from "react-bootstrap";
import FormEditor from "./FormEditor";
import Link from "next/link";
import { useState } from "react";
import { useApplicationType } from "../hooks/useApplicationTypes";
import { useFormSchema } from "../hooks/useFormSchema";

type ApplicationTypeEditorProps = {
  formId: string | null;
};

export function ApplicationTypeEditor({ formId }: ApplicationTypeEditorProps) {
  const isNew = !formId;

  const [inputFormId, setInputFormId] = useState<string>(formId ?? "new");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { applicationType, loading, error, submit, isSaving } =
    useApplicationType(formId || "");
  const { definition } = useFormSchema(formId || "");

  if (error)
    return <p className="text-destructive">スキーマの取得に失敗しました</p>;
  if (loading || !applicationType) return <p>読み込み中...</p>;

  const handleSave = async () => {
    await submit({
      id: inputFormId,
      name: title,
      description: description,
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
        <FormEditor definition={definition} loading={false} error={null} />
      </Form>
    </main>
  );
}
