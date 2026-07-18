import Link from "next/link";
import { Button } from "react-bootstrap";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Link href="/management/applicationTypes">
            <Button variant="primary">申請種別管理へ</Button>
          </Link>
          <Link href="/application-types/">
            <Button variant="primary">申請へ</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
