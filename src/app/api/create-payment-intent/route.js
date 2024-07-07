import { NextResponse } from "next/server";
import connectionHandler from "../models/connection-handler";
import { getCustomerByID, updateCustomer } from "../models/customers";
import { createError, createResponse, createSuccess } from "@/util";
const stripe = require("stripe")(
  "sk_test_51O2YRsSCOcWDHrFkXXrkt0I7ly54RN74pXFCkUtCz5X8La6KrhbZGghTUH1IDgcB1gHLan8eAjPZZq7NSDEo6ucz00VijX8iVX"
);

const handler = async (request, res, db, { custID }) => {
  try {
    const body = await request.json();

    let { amount } = body;

    if (!amount) {
      return createResponse(createError(200, "Invalid request"));
    }

    //check cust_stripe_id exist
    const customer = await getCustomerByID(custID, db);

    let { cust_additional_info } = customer;

    let cust_stripe_cust_id = cust_additional_info?.cust_stripe_cust_id || null;

    if (!cust_stripe_cust_id) {
      const stripe_customer = await stripe.customers.create({
        email: `${customer.cust_email}`,
      });

      cust_stripe_cust_id = stripe_customer.id;

      //update in our system
      updateCustomer(custID, db, {
        cust_additional_info: db.raw(
          `COALESCE(cust_additional_info::jsonb, '{}') || '{"cust_stripe_cust_id":"${cust_stripe_cust_id}"}'`
        ),
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount) * 100,
      currency: "inr",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      capture_method: "manual", //only authorize don't capture
      customer: cust_stripe_cust_id,
    });

    return createResponse(
      createSuccess(200, "payment intent data", true, {
        clientSecret: paymentIntent.client_secret,
      })
    );
  } catch (error) {
    console.log(error);
    return createResponse(createError(200, "Invalid payment intent"));
  }
};

export const POST = connectionHandler()(handler);
