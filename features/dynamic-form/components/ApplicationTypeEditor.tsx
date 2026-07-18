"use client";

import { Button, Form } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useApplicationType } from "../hooks/useApplicationTypes";
import dynamic from "next/dynamic";
import { ApplicationType, FormDefinition } from "../types";
import { INITIAL_FORM_SCHEMA } from "./FormEditor";

const FormEditor = dynamic(() => import("./FormEditor"), {
  ssr: false,
});

type ApplicationTypeEditorProps = {
  applicationType?: ApplicationType;
};

export function ApplicationTypeEditor({
  applicationType: initialApplicationType,
}: ApplicationTypeEditorProps) {
  const isNew = !initialApplicationType;

  const { applicationType, submit, isSaving } = useApplicationType(
    initialApplicationType,
  );

  const [inputFormId, setInputFormId] = useState<string>(
    initialApplicationType?.id ?? "new",
  );
  const [title, setTitle] = useState<string>(applicationType?.name ?? "");
  const [description, setDescription] = useState<string>(
    applicationType?.description ?? "",
  );
  const [definition, setDefinition] = useState<FormDefinition>(
    applicationType?.formDefinition ?? INITIAL_FORM_SCHEMA,
  );

  const handleSave = async () => {
    await submit({
      id: inputFormId,
      name: title,
      description,
      formDefinition: definition,
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
