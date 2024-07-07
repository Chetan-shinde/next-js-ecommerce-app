import { createError, createResponse, createSuccess } from "@/util";
import { getCart } from "../../models/cart";
import { removeToken, tokenInfo } from "../../models/common";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { getProducts, getProductsFromCart } from "../../models/product";
import connectionHandler from "../../models/connection-handler";

const handler = async function (request, res, db) {
  try {
    const token = request.cookies.get("access_token");
    const tokenResponse = tokenInfo(token);

    if (!tokenResponse.status) {
      const headers = removeToken();
      return createResponse(createError(200, "Invalid token"), headers);
    }

    let custID = tokenResponse.cust_id || null;
    const cart_data = await getCart(tokenResponse.token, custID, null, { db });
    const cart_item_products = {};
    let cart_sub_total = 0;

    let data = null;

    if (cart_data && cart_data.length > 0) {
      const cartProducts = await getProductsFromCart(cart_data, { db });
      let { cart_item_products, cart_sub_total, cart_total } = cartProducts;

      data = { cart_data, cart_item_products, cart_sub_total, cart_total };
    }

    return createResponse(createSuccess(200, "Cart data", true, data));
  } catch (error) {
    //console.log(error);
    return createResponse(createError(200, "Invalid request"));
  }
};

export const POST = connectionHandler()(handler);
