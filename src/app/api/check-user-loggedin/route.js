import { createResponse, createSuccess } from "@/util";
import jwt from "jsonwebtoken";

export async function POST(request) {
  let token = await request.cookies.get("access_token");
  //console.log(token);
  let message = "";
  if (!token) {
    message = "User has not logged in token not found";
    return createResponse(createSuccess(200, message, false));
  }
  token = token.value;

  //check token
  let status = true;
  let headers = null;
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //console.log(decoded);
    message = "User has logged in";
  } catch (error) {
    //console.log(error);
    message = "invalid token";
    status = false;
    const d = new Date(0).toUTCString();
    headers = {
      //"Set-Cookie": `access_token=; Domain=localhost;  Path=/; Max-Age=-1; HttpOnly`,
      "Set-Cookie": `access_token=; Path=/; Max-Age=-1; HttpOnly`,
    };
  }

  return createResponse(createSuccess(200, message, status), headers);
}
