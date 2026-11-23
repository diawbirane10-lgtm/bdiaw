import { NextResponse } from "next/server";
import { sameOrigin } from "../../../../lib/privacy.mjs";
import { ADMIN_COOKIE } from "../../../../lib/admin-auth";

export async function POST(request) {
  if(!sameOrigin(request))return NextResponse.json({ok:false},{status:403});
  const response = NextResponse.json({ ok: true },{headers:{"Cache-Control":"private, no-store"}});
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
