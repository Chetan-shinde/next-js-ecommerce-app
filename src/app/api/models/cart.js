import { number, object, string } from "yup";

const schema = object({
  cust_id: number().nullable(),
  prod_id: number().required(),
  qty: number().required().positive().integer(),
});

export const addCart = async (token, cust_id, itemData, { existCart, db }) => {
  const response = { status: false, cart: null, cartItem: null, error: null };
  let cart_cust_id = cust_id || null;

  try {
    await db.transaction(async function (trx) {
      let cartID;
      if (Object.keys(existCart).length == 0) {
        const [cart] = await db("cart").insert(
          { cart_token: token, cart_cust_id },
          ["cart_id"]
        );

        cartID = cart.cart_id;
      } else {
        cartID = existCart[0].cart_id;
      }

      const cartItem = await addCartItem(cartID, itemData, db);

      response.status = true;
      response.cart = { cart_id: cartID };
      response.cartItem = cartItem;
    });

    return response;
  } catch (error) {
    console.log(error);
    response.error = error;
    return response;
  }
};

export const getCart = async (cart_token, cust_id, count, params) => {
  const { db } = params;
  //console.log(await db("cart as c").select("c.*"));

  const query = db("cart as c")
    .table("cart as c")
    .join("cart_items as ci", "ci.cart_item_cart_id", "=", "c.cart_id");

  if (cust_id) {
    query.where({ "c.cart_cust_id": cust_id });
  } else if (cart_token) {
    query.where({ "c.cart_token": cart_token });
    query.andWhere({ "c.cart_cust_id": null });
  }

  if (params) {
    const { where } = params;

    if (where) {
      for (const wh of where) {
        query.andWhere(wh);
      }
    }
  }

  if (count) {
    query.count({ no_of_cart_items: "ci.cart_item_id" });
  } else {
    query.select(
      "c.cart_id",
      "ci.cart_item_prod_id",
      "ci.cart_item_qty",
      "ci.cart_item_id",
      "c.cart_ca_billing_id",
      "c.cart_ca_delivery_id"
    );
  }

  //let s = await query.toString();

  const cart = await query;

  return cart;
};

export const addCartItem = async (cart_id, itemData, db) => {
  try {
    let cartItem = await db("cart_items").insert(
      {
        cart_item_cart_id: cart_id,
        cart_item_prod_id: itemData.prod_id,
        cart_item_qty: itemData.qty,
      },
      ["cart_item_id"]
    );

    return cartItem;
  } catch (error) {
    throw error;
  }
};

export const validate = async (body) => {
  let response = { status: false };
  try {
    let validData = await schema.validate(body, { abortEarly: false });
    response.status = true;
    response.validData = validData;
    return response;
  } catch (error) {
    response.error = error;
  }
  return response;
};

export const getCartItem = (cart, { prodId }) => {
  if (cart) {
    for (const item of cart) {
      if (item.cart_item_prod_id == prodId) {
        return item;
      }
    }
  }

  return null;
};

export const deleteCart = async (cartID, db) => {
  try {
    /* let q = await db("cart")
      .where("cart_id", cartID)
      .del(["cart_id"], { includeTriggerModifications: true });
	  console.log(q); */

    await db.raw("delete from cart where cart_id = ?", [cartID]);

    return true;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartItem = async (cart, cartItemID, db) => {
  await db("cart_items").where("cart_item_id", cartItemID).del();
  if (cart.length == 1) {
    await deleteCart(cart[0].cart_id);
  }
  return true;
};

export const processLoginOnCart = async (token, custID, newToken) => {
  const trx = await db.transaction();
  try {
    const tokenCart = await getCart(token, null);
    let cart = null;
    let tokenCartID = null;

    let success = true;

    if (tokenCart.length > 0) {
      const custCart = await getCart(token, custID);

      if (custCart.length > 0) {
        for (const tcitem of tokenCart) {
          tokenCartID = tcitem.cart_id;
          let cartItemFromCustCart = getCartItem(custCart, {
            prodId: tcitem.cart_item_prod_id,
          });
          if (!cartItemFromCustCart) {
            const addCartItemRes = await addCartItem(custCart[0].cart_id, {
              prod_id: tcitem.cart_item_prod_id,
              qty: tcitem.cart_item_qty,
            });
          }
        }
      } else {
        for (const tcitem of tokenCart) {
          tokenCartID = tcitem.cart_id;
          if (!cart) {
            cart = await addCart(
              newToken,
              custID,
              { prod_id: tcitem.cart_item_prod_id, qty: tcitem.cart_item_qty },
              { existCart: {} }
            );
            if (!cart.status) {
              success = false;
              break;
            }
          } else {
            const addCartItemRes = await addCartItem(cart.cart.cart_id, {
              prod_id: tcitem.cart_item_prod_id,
              qty: tcitem.cart_item_qty,
            });
          }
        }
      }

      if (!success) {
        trx.rollback();
      } else {
        //Delete old token cart
        await deleteCart(tokenCartID);
        console.log(`${tokenCartID} deleted`);
        trx.commit();
      }
    }
  } catch (error) {
    trx.rollback();
  }
};

export const updateCartItem = async (updateData, cart_item_id, db) => {
  //get cart
  //item id
  //where condition create
  await db("cart_items").update(updateData).where("cart_item_id", cart_item_id);
};

export const updateCart = async (data, cart_id, db) => {
  await db("cart").update(data).where("cart_id", cart_id);
};
