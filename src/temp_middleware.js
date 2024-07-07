import { removeToken, tokenInfo } from "./app/api/models/common";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("access_token");
  const tokenResponse = tokenInfo(token);
  console.log(token);
  console.log(tokenResponse);
  if (!tokenResponse.status) {
    // const response = NextResponse.next();
    /* response.headers.set(
      "Set-Cookie",
      "access_token=; Domain=localhost;  Path=/; Max-Age=-1; HttpOnly"
    ); */
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/(.*)",
};
