import { createError, createResponse, createSuccess } from "@/util";
import { redirect } from "next/navigation";
import { removeToken, tokenInfo } from "../../models/common";
import { getCart, updateCart } from "../../models/cart";
import { saveAddress, validate } from "../../models/address";
import connectionHandler from "../../models/connection-handler";

const handler = async function POST(request, res, db, { custID, token }) {
  //check token
  //valiate token
  //token invalid then send invalid token response
  //save delivery address, billing address
  //send success reponse
  try {
    const cart_data = await getCart(token, custID, null, { db });

    if (!cart_data || cart_data.length == 0) {
      return createResponse(createError(200, "Invalid request"));
    }

    let body = await request.json();
    let shiptoDiffAddress = false;
    if (body.delivery_fname) {
      shiptoDiffAddress = true;
    }
    let validationResponse = await validate(body, shiptoDiffAddress);

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

    //return createResponse(createSuccess(200, "address saved", true));

    var trx = await db.transaction();

    let billing_address_data = {
      ca_fname: body.fname,
      ca_lname: body.lname,
      ca_add: body.add,
      ca_apt: body.apt,
      ca_state: body.state,
      ca_zip: body.zip,
      ca_email: body.email,
      ca_phone: body.phone,
      ca_type: "B",
    };

    let billing_address_id = await saveAddress(billing_address_data, trx);
    let delivery_address_id = billing_address_id;

    if (shiptoDiffAddress) {
      let delivery_address_data = {
        ca_fname: body.delivery_fname,
        ca_lname: body.delivery_lname,
        ca_add: body.delivery_add,
        ca_apt: body.delivery_apt,
        ca_state: body.delivery_state,
        ca_zip: body.delivery_zip,
        ca_email: body.delivery_email,
        ca_phone: body.delivery_phone,
        ca_type: "D",
      };
      delivery_address_id = await saveAddress(delivery_address_data, trx);
    }

    await updateCart(
      {
        cart_ca_billing_id: billing_address_id,
        cart_ca_delivery_id: delivery_address_id,
      },
      cart_data[0].cart_id,
      trx
    );

    trx.commit();

    return createResponse(createSuccess(200, "address saved", true));
  } catch (error) {
    trx.rollback();
    return createResponse(createSuccess(200, "Invalid request", true));
  }
};

export const POST = connectionHandler()(handler);
