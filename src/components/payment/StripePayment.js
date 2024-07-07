"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51O2YRsSCOcWDHrFkAFlMYv4lHt7PLylv6WCjPHCQxBGHs5gLyEXi49sZxYPwuTRGCBu875qAWlSBNHYAN4fEGcLS00oK6Oa1I7"
);

export default function StripePayment({ billingDetails, clientSecret }) {
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <CheckoutForm billingDetails={billingDetails} />
        </Elements>
      )}
    </>
  );
}
