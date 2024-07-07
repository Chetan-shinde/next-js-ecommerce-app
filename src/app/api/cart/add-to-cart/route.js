import { createError, createResponse, createSuccess } from "@/util";
import { removeToken, tokenInfo } from "../../models/common";
import {
  addCart,
  addCartItem,
  getCart,
  getCartItem,
  validate,
} from "../../models/cart";
import { redirect } from "next/navigation";
import connectionHandler from "../../models/connection-handler";

const handler = async (request, res, db, { custID, token }) => {
  try {
    const body = await request.json();
    const validationResponse = await validate(body);

    if (!validationResponse.status) {
      return createResponse(
        createSuccess(
          200,
          "Invalid request validation error",
          false,
          validationResponse.error.errors
        )
      );
    }

    const cart = await getCart(token, custID, null, { db });

    let no_of_cart_items = cart.length || 0;

    const cartItem = getCartItem(cart, {
      prodId: validationResponse.validData.prod_id,
    });

    if (cartItem) {
      return createResponse(
        createSuccess(200, "Item added in cart exist", true, {
          ...{
            status: true,
            cart: { cart_id: cartItem.cart_id },
            cartItem: [{ cart_item_id: cartItem.cart_item_id }],
            no_of_cart_items,
          },
        })
      );
    }

    const addCartResponse = await addCart(
      token,
      custID,
      validationResponse.validData,
      { existCart: cart, db }
    );

    let message = addCartResponse.status
      ? "Item added in cart"
      : "Add to cart failed";
    return createResponse(
      createSuccess(200, message, addCartResponse.status, {
        ...addCartResponse,
        no_of_cart_items: no_of_cart_items + 1,
      })
    );
  } catch (error) {
    console.log(error);
    return createResponse(
      createSuccess(200, "Invalid request catch", false, error)
    );
  }
};

export const POST = connectionHandler()(handler);
