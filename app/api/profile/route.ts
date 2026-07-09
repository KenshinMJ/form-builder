import { NextResponse } from "next/server";
import type { Profile } from "@/features/user-profile/types";

let profile: Profile = { name: "山田太郎", age: 30, newsletter: false };

export async function GET() {
  return NextResponse.json(profile);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Profile;
  profile = body;
  return NextResponse.json(profile);
}
