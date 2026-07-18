"use client";

import { useCallback, useState } from "react";
import { saveApplicationType } from "../api/schemaApi";
import { ApplicationType } from "../types";

export function useApplicationType(initialApplicationType?: ApplicationType) {
  const [applicationType, setApplicationType] =
    useState<ApplicationType | null>(initialApplicationType ?? null);
  const [isSaving, setSaving] = useState(false);

  const submit = useCallback(async (data: ApplicationType) => {
    setSaving(true);
    try {
      // サーバーに送信 → 戻り値を最新の正として使う
      const updated = await saveApplicationType(data);
      setApplicationType(updated);
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    applicationType,
    submit,
    isSaving,
  };
}
