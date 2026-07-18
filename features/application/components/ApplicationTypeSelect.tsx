"use client";

import Link from "next/link";
import { Table, Button } from "react-bootstrap";
import { ApplicationType } from "@/features/dynamic-form/types";

type ApplicationTypeSelectProps = {
  applicationTypes: ApplicationType[];
};

export function ApplicationTypeSelect({
  applicationTypes,
}: ApplicationTypeSelectProps) {
  return (
    <div className="py-3">
      <h1>申請種別一覧</h1>
      <section>
        選んでね。
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
                  <Link href={`/application-types/${type.id}`}>
                    <Button variant="primary" size="sm">
                      申請書を作成する
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </div>
  );
}
