import { NextResponse } from "next/server";

// 本来はDB。ここではデモ用にメモリ保持
let count = 0;

export async function GET() {
  return NextResponse.json({ count });
}

export async function POST() {
  count += 1;
  return NextResponse.json({ count });
}
