import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

// Storybook用にロジックを持たないPresentational版
function CounterCardView({
  count,
  loading,
  onIncrement,
}: {
  count: number | null;
  loading: boolean;
  onIncrement: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border p-6">
      <p className="text-2xl font-semibold">
        {count === null ? "読み込み中..." : `カウント: ${count}`}
      </p>
      <Button onClick={onIncrement} disabled={loading}>
        {loading ? "送信中..." : "カウントアップ"}
      </Button>
    </div>
  );
}

const meta: Meta<typeof CounterCardView> = {
  title: "features/counter/CounterCard",
  component: CounterCardView,
};
export default meta;

type Story = StoryObj<typeof CounterCardView>;

export const Default: Story = {
  args: { count: 3, loading: false, onIncrement: () => {} },
};

export const Loading: Story = {
  args: { count: 3, loading: true, onIncrement: () => {} },
};
