import connectionHandler from "../models/connection-handler";
import { createResponse, createSuccess, randomString } from "@/util";
import jwt from "jsonwebtoken";
import { getCart } from "../models/cart";

/* export async function POST(request) {
  let token = request.cookies.get("access_token");
  let headers = null;

  if (!token) {
    //create token
    const payload = {
      device_id: randomString(),
    };
    //console.log("random string");
    //console.log(randomString());
    let accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return createResponse(
      createSuccess(200, "App initialized successfully", true, {
        user_logged_in: false,
        cart_items: 0,
      }),
      {
        "Set-Cookie": `access_token=${accessToken}; Domain=localhost;  Path=/; HttpOnly`,
      }
    );
  } else {
    //check user logged in
    let cartItems = 0;
    let userLoggedIn = false;
    let headers = null;
    try {
      token = token.value;
      var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //console.log(decoded);
      if (decoded.device_id) {
        //means user not logged in
        //get cart items
        let cartItemCount = await getCart(token, null, true);
        let { no_of_cart_items } = cartItemCount[0];
        cartItems = no_of_cart_items;
      } else if (decoded.cust_id) {
        let cartItemCount = await getCart(token, decoded.cust_id, true);
        let { no_of_cart_items } = cartItemCount[0];
        userLoggedIn = true;
        cartItems = no_of_cart_items;
      }
    } catch (error) {
      console.log(error);
      headers = {
        "Set-Cookie": `access_token=; Domain=localhost;  Path=/; Max-Age=-1; HttpOnly`,
      };
    }

    return createResponse(
      createSuccess(200, "App initialized successfully", true, {
        user_logged_in: userLoggedIn,
        cart_items: cartItems,
      }),
      headers
    );
  }
  //check cookie in request
  //if no cookie then create
  //if cookie exist
  //check user logged in
  //get cart from token
} */

const handler = async (request, res, db) => {
  if (request.method !== "POST") {
    return;
  }

  let token = request.cookies.get("access_token");
  let headers = null;

  if (!token) {
    //create token
    const payload = {
      device_id: randomString(),
    };
    //console.log("random string");
    //console.log(randomString());
    let accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return createResponse(
      createSuccess(200, "App initialized successfully", true, {
        user_logged_in: false,
        cart_items: 0,
      }),
      {
        "Set-Cookie": `access_token=${accessToken}; Domain=localhost;  Path=/; HttpOnly`,
      }
    );
  } else {
    //check user logged in
    let cartItems = 0;
    let userLoggedIn = false;
    let headers = null;
    try {
      token = token.value;
      var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //console.log(decoded);
      if (decoded.device_id) {
        //means user not logged in
        //get cart items
        //console.log(await db("cart"));
        let cartItemCount = await getCart(token, null, true, {
          db: db,
        });
        let { no_of_cart_items } = cartItemCount[0];
        cartItems = no_of_cart_items;
      } else if (decoded.cust_id) {
        let cartItemCount = await getCart(token, decoded.cust_id, true, {
          db: db,
        });
        let { no_of_cart_items } = cartItemCount[0];
        userLoggedIn = true;
        cartItems = no_of_cart_items;
      }
    } catch (error) {
      console.log(error);
      headers = {
        "Set-Cookie": `access_token=; Domain=localhost;  Path=/; Max-Age=-1; HttpOnly`,
      };
    }

    return createResponse(
      createSuccess(200, "App initialized successfully", true, {
        user_logged_in: userLoggedIn,
        cart_items: cartItems,
      }),
      headers
    );
  }
};

export const POST = connectionHandler()(handler);
