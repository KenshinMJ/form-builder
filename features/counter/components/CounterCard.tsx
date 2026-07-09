"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCounter } from "../hooks/useCounter";

export function CounterCard() {
  const { count, loading, load, increment } = useCounter();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
      <p className="text-2xl font-semibold">
        {count === null ? "読み込み中..." : `カウント: ${count}`}
      </p>
      <Button onClick={increment} disabled={loading}>
        {loading ? "送信中..." : "カウントアップ"}
      </Button>
    </div>
  );
}
