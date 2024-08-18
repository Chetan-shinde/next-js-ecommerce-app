import {
  createAccessToken,
  createError,
  createResponse,
  createSuccess,
} from "@/util";
import { processLogin } from "../models/login";
import jwt from "jsonwebtoken";
import { getCart, processLoginOnCart } from "../models/cart";
import { tokenInfo } from "../models/common";
import connectionHandler from "../models/connection-handler";

const handler = async function POST(request, res, db) {
  try {
    const body = await request.json();
    const res = await processLogin(body, { db });

    let message = "login failed";
    let headers = null;

    if (res.success) {
      message = "Login successfully";
      const payload = {
        cust_id: res.data.cust_id,
      };

      const token = request.cookies.get("access_token").value;

      //Fetch cart on token
      //loop on it
      //fetch cart by custid
      //check item by prod id exist in cust cart
      //if not then insert new cart item

      //after loop remove token cart

      let accessToken = createAccessToken(payload);
      //set cookie
      headers = {
        //"Set-Cookie": `access_token=${accessToken}; Domain=localhost;  Path=/; HttpOnly`,
        "Set-Cookie": `access_token=${accessToken}; Path=/; HttpOnly`,
      };

      processLoginOnCart(token, res.data.cust_id, accessToken, { db });
    }

    return createResponse(
      createSuccess(200, message, res.success, res.data),
      headers
    );
  } catch (error) {
    console.log(error);
    return createResponse(createSuccess(200, "Login failed", false, error));
  }
};

export const POST = connectionHandler()(handler);
