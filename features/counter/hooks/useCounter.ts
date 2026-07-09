"use client";

import { useCallback, useState } from "react";
import { fetchCounter, incrementCounter } from "../api/counterApi";

export function useCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCounter();
      setCount(data.count);
    } finally {
      setLoading(false);
    }
  }, []);

  const increment = useCallback(async () => {
    setLoading(true);
    try {
      // サーバーに送信 → 再取得（サーバー側の最新値を信頼する設計）
      await incrementCounter();
      const data = await fetchCounter();
      setCount(data.count);
    } finally {
      setLoading(false);
    }
  }, []);

  return { count, loading, load, increment };
}
