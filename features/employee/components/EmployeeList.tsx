"use client";

import { Button, Table } from "react-bootstrap";
import { useEmployees } from "../hooks/useEmployees";
import Link from "next/link";

export function EmployeeList() {
  const { employees } = useEmployees();

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
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>
                <a
                  href={`/management/employees/${emp.id}`}
                  className="flex items-center gap-2"
                >
                  {emp.id}
                </a>
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
