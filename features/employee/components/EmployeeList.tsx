"use client";

import { Button, Table } from "react-bootstrap";
import Link from "next/link";
import { Employee } from "../types";

type EmployeeListProps = {
  initialEmployees: Employee[];
};

export function EmployeeList({ initialEmployees }: EmployeeListProps) {
  return (
    <div>
      <h1>社員一覧</h1>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>社員名</th>
          </tr>
        </thead>
        <tbody>
          {initialEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>
                <Link
                  href={`/management/employees/${emp.id}`}
                  className="flex items-center gap-2"
                >
                  {emp.id}
                </Link>
              </td>
              <td>{emp.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link href="/management/employees/register">
        <Button variant="primary">社員を追加</Button>
      </Link>
    </div>
  );
}
