"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchProfile, saveProfile } from "../api/profileApi";
import type { Profile } from "../types";

export function useProfileForm() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile().then(setProfile);
  }, []);

  const submit = useCallback(async (data: Profile) => {
    setSaving(true);
    try {
      // サーバーに送信 → 再取得（最新の正としてサーバー値を使う）
      await saveProfile(data);
      const latest = await fetchProfile();
      setProfile(latest);
    } finally {
      setSaving(false);
    }
  }, []);

  return { profile, saving, submit };
}
