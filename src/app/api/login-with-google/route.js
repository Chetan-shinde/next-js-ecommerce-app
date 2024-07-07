import { OAuth2Client } from "google-auth-library";

import { createResponse, createSuccess, createError } from "@/util";
import { processLoginWithGoogle } from "../models/register";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const csrf_token_cookie = request.cookies.get("g_csrf_token");
    const csrf_token_body = formData.get("g_csrf_token");
    const googleIDTOken = formData.get("credential");

    if (!csrf_token_body) {
      return createResponse(createError(200, "Invalid request"));
    }

    if (!csrf_token_cookie || !csrf_token_cookie.value) {
      return createResponse(createError(200, "Invalid request"));
    }

    if (csrf_token_cookie.value != csrf_token_body) {
      return createResponse(
        createError(200, "Failed to verify double submit cookie.")
      );
    }

    const client = new OAuth2Client();
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: googleIDTOken,
        audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();

      return payload;
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
    }

    try {
      const googleRes = await verify();

      //check email exist
      const res = await processLoginWithGoogle({ email: googleRes.email });
      if (res.success) {
        const payload = {
          cust_id: res.data.cust_id,
        };
        //cookie generate
        let accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });

        //we have use cookies here because it is server side post request
        cookies().set({
          name: "access_token",
          value: accessToken,
          httpOnly: true,
          path: "/",
          domain: "localhost",
        });
        return Response.redirect(process.env.SITE_URL + "dashboard");
        //redirect("/dashboard");
        //return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        return createResponse(createError(200, "Invalid request"));
      }
    } catch (error) {
      //console.log(error);
      return createResponse(createError(200, "Invalid Google ID token"));
    }
  } catch (error) {
    //console.log(error);
    return createResponse(createSuccess(200, "testrt", true));
  }
}
