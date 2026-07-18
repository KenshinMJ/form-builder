"use client";

import { useCallback, useState } from "react";
import { Application } from "../types";
import { saveApplication } from "../api/applicationApi";

export function useApplication(initialApplication?: Application) {
  const [application, setApplication] = useState<Application | undefined>(
    initialApplication,
  );
  const [isSaving, setSaving] = useState(false);

  const submit = useCallback(async (data: Application) => {
    setSaving(true);
    try {
      const updated = await saveApplication(data);
      setApplication(updated);
      return updated;
    } finally {
      setSaving(false);
    }
  }, []);

  return { application, submit, isSaving };
}
