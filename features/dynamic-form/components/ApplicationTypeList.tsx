"use client";

import { Table, Button } from "react-bootstrap";
import Link from "next/link";
import { ApplicationType } from "../types";

type ApplicationTypeListProps = {
  applicationTypes: ApplicationType[];
};

export function ApplicationTypeList({
  applicationTypes,
}: ApplicationTypeListProps) {
  return (
    <div className="py-3">
      <h1>申請種別一覧</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>説明</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {applicationTypes.map((type) => (
            <tr key={type.id}>
              <td>{type.id}</td>
              <td>{type.name}</td>
              <td>{type.description}</td>
              <td>
                <Link href={`/management/applicationTypes/${type.id}`}>
                  <Button variant="primary" size="sm">
                    編集
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link href="/management/applicationTypes/register">
        <Button variant="primary">新規登録</Button>
      </Link>
    </div>
  );
}
