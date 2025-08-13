import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  // Clear cookies
  cookieStore.set("token", "", { maxAge: 0 });
  cookieStore.set("userId", "", { maxAge: 0 });

  return NextResponse.json({ message: "Logged out successfully" });
}
