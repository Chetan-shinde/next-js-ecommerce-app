import StripePayment from "@/components/payment/StripePayment";
import { makeRequest } from "@/util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getData() {
  //fetch cart data
  const response = await makeRequest(
    process.env.SITE_URL + "api/checkout/order-summary",
    "POST",
    null,
    true,
    {
      Cookie: cookies().toString(),
    }
  );

  if (!response.success) {
    redirect("/?login=true");
  }

  let { billing_address, cart_total } = response.data;

  const paymentIntent = await makeRequest(
    process.env.SITE_URL + "/api/create-payment-intent",
    "POST",
    { amount: cart_total },
    true,
    {
      Cookie: cookies().toString(),
    }
  );

  if (!paymentIntent.success) {
    redirect("/?login=true");
  }

  let { clientSecret } = paymentIntent.data;

  const billingDetails = {
    name: `${billing_address.ca_fname} ${billing_address.ca_lname}`,
    email: `${billing_address.ca_email}`,
    phone: `${billing_address.ca_phone}`,
    address: {
      line1: `${billing_address.ca_add}`,
      line2: `${billing_address.ca_apt}`,
      city: `${billing_address.ca_city}`,
      state: "Gujarat",
      country: "IN",
      postal_code: `${billing_address.ca_zip}`,
    },
  };

  return {
    billingDetails,
    clientSecret,
  };
}

export default async function Payment() {
  const pageData = await getData();
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 paymentBox">
          <StripePayment
            billingDetails={pageData.billingDetails}
            clientSecret={pageData.clientSecret}
          />
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
}
