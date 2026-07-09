"use client";

import { useEffect, useState } from "react";
import { fetchFormDefinition } from "../api/schemaApi";
import type { FormDefinition } from "../types";

export function useFormSchema(formId: string) {
  const [definition, setDefinition] = useState<FormDefinition | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchFormDefinition(formId).then(setDefinition).catch(setError);
  }, [formId]);

  return { definition, error, loading: !definition && !error };
}
