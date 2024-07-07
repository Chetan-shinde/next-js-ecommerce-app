import { createError, createResponse, createSuccess } from "@/util";
import { removeToken, tokenInfo } from "../../models/common";
import { deleteCartItem, getCart } from "../../models/cart";
import connectionHandler from "../../models/connection-handler";

const handler = async (request, res, db, { custID, token }) => {
  try {
    const body = await request.json();

    let item_id = body.item_id;

    let where = [{ "ci.cart_item_id": item_id }];

    //get cart using item ids
    const cart = await getCart(token, custID, null, { where, db });

    if (cart.length < 0) {
      return createResponse(createError(200, "Invalid request"));
    }

    await deleteCartItem(cart, item_id, db);
    return createResponse(createSuccess(200, "Cart item deleted", true));
  } catch (error) {
    return createResponse(createSuccess(200, "Invalid request", false, error));
  }
};

export const POST = connectionHandler()(handler);
