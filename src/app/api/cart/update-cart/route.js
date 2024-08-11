import { createError, createResponse, createSuccess } from "@/util";
import { getCart, updateCartItem } from "../../models/cart";
import { removeToken, tokenInfo } from "../../models/common";
import connectionHandler from "../../models/connection-handler";

const handler = async function (request, res, db, { custID, token }) {
  try {
    const body = await request.json();

    let item_id = body.item_ids;
    let qty = body.qty;

    console.log(item_id);
    console.log(typeof item_id);

    function whereconditions(query) {
      query.whereIn("ci.cart_item_id", item_id);
    }

    // let where = [{ "ci.cart_item_id": item_id }];

    //get cart using item ids
    const cart = await getCart(token, custID, null, {
      wherefn: whereconditions,
      db,
    });

    if (cart.length < 0) {
      return createResponse(createError(200, "Invalid request"));
    }
    //update one by one item
    if (cart.length > 0) {
      for (const citem of cart) {
        await updateCartItem(
          { cart_item_qty: qty[citem.cart_item_id] },
          citem.cart_item_id,
          db
        );
      }
    }

    return createResponse(
      createSuccess(200, "Cart successfully updated", true)
    );
  } catch (error) {
    console.log(error);
    return createResponse(createSuccess(200, "Invalid request", false, error));
  }

  //we will pass itemid in postdata

  //from token we will get cart

  //loop over it
  //call updatecartitem function

  //return response
};

export const POST = connectionHandler()(handler);
