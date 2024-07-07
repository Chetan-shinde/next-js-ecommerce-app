"use client";

import BillingAddress from "./BillingAddress";
import OrderSummary from "./OrderSummary";

import { useRef } from "react";
/* const schema = object({
  country: number().positive().integer().required(),
  fname: string().required().label("First name"),
  lname: string().required().label("Last name"),
  add: string().required().label("Address"),
  apt: string().optional(),
  state: string().required().label("State"),
  zip: string().required(),
  email: string().required().email(),
  phone: number().positive().integer().required(),
  coupon_code: string().optional().lowercase(),
  delivery_country: number()
    .positive()
    .integer()
    .optional()
    .label("Delivery country"),
  delivery_fname: string().required().label("First name"),
  delivery_lname: string().optional().label("Last name"),
  delivery_address: string().optional().label("Last name"),
  delivery_apt: string().optional().label("Delivery apartment"),
  delivery_state: string().optional().label("Delivery state"),
  delivery_zip: string().optional().label("Delivery zip"),
  delivery_email: string().optional().email().label("Delivery email"),
  delivery_phone: number().positive().integer().optional(),
}); */

export default function Checkout() {
  const formRef = useRef(null);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mb-5 mb-md-0">
          <BillingAddress formRef={formRef} />
        </div>
        <OrderSummary formRef={formRef} />
      </div>
    </div>
  );
}
