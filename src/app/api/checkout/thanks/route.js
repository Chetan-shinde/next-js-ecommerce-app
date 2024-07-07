import { redirect } from "next/navigation";
import { deleteCart, deleteCartItem, getCart } from "../../models/cart";
import { getProductsFromCart } from "../../models/product";
import {
  createOrderItems,
  createOrderMaster,
  getOrderDataByID,
} from "../../models/order";
import { createError, createResponse, createSuccess } from "@/util";
import connectionHandler from "../../models/connection-handler";
const stripe = require("stripe")(
  "sk_test_51O2YRsSCOcWDHrFkXXrkt0I7ly54RN74pXFCkUtCz5X8La6KrhbZGghTUH1IDgcB1gHLan8eAjPZZq7NSDEo6ucz00VijX8iVX"
);

const validate = async (request) => {
  const postData = await request.json();
  const { payment_intent, payment_intent_client_secret, redirect_status } =
    postData;

  if (!payment_intent || !payment_intent_client_secret || !redirect_status) {
    return false;
  }

  return postData;
};

const handler = async (request, res, db, { custID, token }) => {
  //get payment intent information
  //if it is success then insert new order , insert new item
  //if it is failed then also insert new order, insert new item
  //send email

  const validationResponse = await validate(request);

  if (!validationResponse) {
    return createResponse(
      createSuccess(200, "No cart found", false, {
        redirect: process.env.SITE_URL + "/?login=true",
      })
    );
  }

  const { payment_intent } = validationResponse;

  var trx = await db.transaction();

  try {
    const cart_data = await getCart(token, custID, null, { db: trx });

    if (!cart_data || cart_data.length == 0) {
      return createResponse(
        createSuccess(200, "No cart found", false, {
          redirect: process.env.SITE_URL + "/?login=true",
        })
      );
    }

    const cartProducts = await getProductsFromCart(cart_data, { db: trx });
    let { cart_item_products, cart_sub_total, cart_total } = cartProducts;

    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    let payment_intent_status = ["requires_capture", "succeeded"].includes(
      paymentIntent.status
    )
      ? "N"
      : "F";

    let order_master_insert_data = {
      om_cust_id: custID,
      om_order_total: cart_total,
      om_payment_status: payment_intent_status,
      om_payment_info: { stripe_payment_intent_id: payment_intent },
    };
    const om_id = await createOrderMaster(order_master_insert_data, trx);

    let item_id = [];
    for (const citem of cart_data) {
      let oi_total = parseFloat(
        cart_item_products[citem.cart_item_prod_id].prod_price *
          citem.cart_item_qty
      );
      let order_items_insert_data = {
        oi_om_id: om_id,
        oi_total,
        oi_prod_id: citem.cart_item_prod_id,
      };
      const ord_item_id = await createOrderItems(order_items_insert_data, trx);
      item_id = [...item_id, ord_item_id];
    }

    let orderData = await getOrderDataByID(item_id, om_id, trx);

    const cartID = cart_data[0].cart_id;
    await deleteCart(cartID, trx);
    trx.commit();
    /* for (const citem of cart_data) {
      await deleteCartItem(cart_data, citem.cart_item_id, db);
    }
    await deleteCart(cart_data[0].cart_id, db); */
    return createResponse(createSuccess(200, "Order placed", true, orderData));
  } catch (error) {
    trx.rollback();
    console.log(error);
    //redirect(process.env.SITE_URL + "/?login=true");
  }
};

export const POST = connectionHandler()(handler);
