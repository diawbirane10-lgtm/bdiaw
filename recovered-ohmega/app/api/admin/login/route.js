import { NextResponse } from "next/server";
import { checkLogin } from "../../../../lib/login-limit.mjs";
import { sameOrigin } from "../../../../lib/privacy.mjs";
import { ADMIN_COOKIE, ADMIN_MAX_AGE, createSessionValue, passwordMatches } from "../../../../lib/admin-auth";

export async function POST(request) {
  const headers={"Cache-Control":"private, no-store","X-Robots-Tag":"noindex, nofollow"};
  if(!sameOrigin(request))return NextResponse.json({ok:false},{status:403,headers});
  if(!request.headers.get("content-type")?.startsWith("application/json")||Number(request.headers.get("content-length")||0)>1024)return NextResponse.json({ok:false},{status:400,headers});
  const raw=await request.text();if(raw.length>1024)return NextResponse.json({ok:false},{status:413,headers});
  let body;try{body=JSON.parse(raw);}catch{return NextResponse.json({ok:false},{status:400,headers});}
  if(typeof body?.password!=="string"||body.password.length>256)return NextResponse.json({ok:false},{status:400,headers});
  const limit=checkLogin(request.headers);
  if(!limit.allowed)return NextResponse.json({ok:false,error:"Too many attempts."},{status:429,headers:{...headers,"Retry-After":String(limit.retryAfter)}});
  if (!passwordMatches(body?.password)) {
    await new Promise((resolve) => setTimeout(resolve, 450));
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401, headers });
  }

  const response = NextResponse.json({ ok: true },{headers});
  response.cookies.set(ADMIN_COOKIE, createSessionValue(), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_MAX_AGE,
  });
  return response;
}
