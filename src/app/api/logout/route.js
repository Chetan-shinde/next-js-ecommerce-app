import { createResponse, createSuccess } from "@/util";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  let headers = {
    "Set-Cookie": `access_token=hj; Domain=localhost;  Path=/; Max-Age=-1; HttpOnly`,
  };
  let response = NextResponse.next();
  // Set a cookie to hide the banner
  cookies().delete("access_token");

  // Response will have a `Set-Cookie:show-banner=false;path=/home` header
  return NextResponse.redirect(new URL("/", request.url));
}
