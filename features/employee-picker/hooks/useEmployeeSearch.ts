"use client";

import { useEffect, useState } from "react";
import { searchEmployees } from "../api/employeeApi";
import type { Employee } from "../types";

export function useEmployeeSearch(query: string) {
  const [results, setResults] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(() => {
      searchEmployees(query)
        .then(setResults)
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}
