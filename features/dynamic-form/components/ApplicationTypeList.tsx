"use client";

import { Table } from "lucide-react";
import { useApplicationTypes } from "../hooks/useApplicationTypes";
import Link from "next/link";
import { Button } from "react-bootstrap";

export function ApplicationTypeList() {
  const { applicationTypes, error, loading } = useApplicationTypes();

  return (
    <div>
      <h1>申請種別一覧</h1>
      <ol>
        {applicationTypes?.map((form) => (
          <li key={form.id}>
            <a
              href={`/management/applicationTypes/${form.id}`}
              className="flex items-center gap-2"
            >
              <Table className="h-4 w-4" />
              {form.name}
            </a>
          </li>
        ))}
      </ol>
      <Link href="/management/applicationTypes/register">
        <Button variant="primary">申請種別を追加</Button>
      </Link>
    </div>
  );
}
