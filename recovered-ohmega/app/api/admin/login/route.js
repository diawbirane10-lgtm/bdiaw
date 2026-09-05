import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_MAX_AGE, createSessionValue, passwordMatches } from "../../../../lib/admin-auth";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  if (!passwordMatches(body?.password)) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSessionValue(), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_MAX_AGE,
  });
  return response;
}
