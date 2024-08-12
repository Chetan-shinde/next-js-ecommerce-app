import { createResponse, createSuccess } from "@/util";
import { processSignup } from "../models/register";
import jwt from "jsonwebtoken";

export async function POST(request) {
  //validation
  //check exist
  //insert into db
  //cookie generate
  //response
  try {
    const body = await request.json();
    const res = await processSignup(body);

    let message = "";
    let headers = null;

    if (res.success) {
      message = "Signup successfully";
      const payload = {
        cust_id: res.data.cust_id,
      };
      //cookie generate
      let accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      //set cookie
      headers = {
        //"Set-Cookie": `access_token=${accessToken}; Domain=localhost;  Path=/; HttpOnly`,
        "Set-Cookie": `access_token=${accessToken}; Path=/; HttpOnly`,
      };
    } else {
      message = "Signup failed";
    }

    return createResponse(
      createSuccess(200, message, res.success, res.data),
      headers
    );
  } catch (error) {
    return createResponse(createSuccess(200, "Signup failed", false, error));
  }
}
