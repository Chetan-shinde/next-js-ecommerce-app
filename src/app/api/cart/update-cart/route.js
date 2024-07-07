import { createError, createResponse, createSuccess } from "@/util";
import { getCart, updateCartItem } from "../../models/cart";
import { removeToken, tokenInfo } from "../../models/common";

export async function POST(request) {
  try {
    //token check
    const token = request.cookies.get("access_token");
    const tokenResponse = tokenInfo(token);

    if (!tokenResponse.status) {
      const headers = removeToken();
      return createResponse(createError(200, "Invalid token"), headers);
    }

    let custID = tokenResponse.cust_id || null;

    const body = await request.json();

    let item_id = body.item_ids;
    let qty = body.qty;

    let where = [{ "ci.cart_item_id": item_id }];
    //get cart using item ids
    const cart = await getCart(tokenResponse.token, custID, null, where);

    if (cart.length < 0) {
      return createResponse(createError(200, "Invalid request"));
    }
    //update one by one item
    if (cart.length > 0) {
      for (const citem of cart) {
        await updateCartItem(
          { cart_item_qty: qty[citem.cart_item_id] },
          citem.cart_item_id
        );
      }
    }

    return createResponse(
      createSuccess(200, "Cart successfully updated", true)
    );
  } catch (error) {
    return createResponse(createSuccess(200, "Invalid request", false, error));
  }

  //we will pass itemid in postdata

  //from token we will get cart

  //loop over it
  //call updatecartitem function

  //return response
}
