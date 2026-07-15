"use client";

import { useEffect, useState } from "react";
import { useEmployee } from "../hooks/useEmployees";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";

type EmployeeEditorProps = {
  empId: string | null;
};

export function EmployeeEditor({ empId }: EmployeeEditorProps) {
  const isNew = !empId;

  const { employee, submit, isSaving } = useEmployee(empId);

  const [id, setId] = useState<string>(empId ?? "");
  const [name, setName] = useState<string>(employee?.name ?? "");

  // 社員データが取得できたら名前をセットする
  useEffect(() => {
    if (employee) {
      setName(employee.name);
    }
  }, [employee]);

  const handleSave = async () => {
    await submit({
      id,
      name,
    });
  };

  return (
    <main className="py-3">
      <h1>社員編集</h1>
      <div className="d-flex flex-column flex-md-row gap-3">
        <Link href="/management/employees">
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
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled={!isNew}
              placeholder="hjnisuhgjk"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>氏名</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="佐藤太郎"
            />
          </Form.Group>
        </div>
      </Form>
    </main>
  );
}
