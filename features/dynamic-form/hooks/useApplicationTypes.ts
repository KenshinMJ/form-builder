"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchApplicationType,
  fetchApplicationTypes,
  saveApplicationType,
} from "../api/schemaApi";
import type { ApplicationType } from "../types";

export function useApplicationTypes() {
  const [applicationTypes, setApplicationTypes] = useState<ApplicationType[]>(
    [],
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchApplicationTypes().then(setApplicationTypes).catch(setError);
  }, []);

  return { applicationTypes, error, loading: !applicationTypes && !error };
}

export function useApplicationType(id: string | null) {
  const [applicationType, setApplicationType] =
    useState<ApplicationType | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isSaving, setSaving] = useState(false);

  if (id) {
    useEffect(() => {
      fetchApplicationType(id).then(setApplicationType).catch(setError);
    }, [id]);
  }

  const submit = useCallback(async (data: ApplicationType) => {
    setSaving(true);
    try {
      // サーバーに送信 → 再取得（最新の正としてサーバー値を使う）
      await saveApplicationType(data);
      const latest = await fetchApplicationType(data.id);
      setApplicationType(latest);
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    applicationType,
    error,
    loading: !!id && !applicationType,
    submit,
    isSaving,
  };
}
