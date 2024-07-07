import StripePayment from "@/components/payment/StripePayment";

function getData() {
  const billingDetails = {
    name: "chetan",
    email: "chetan.shinde+25@hexpress.net",
    phone: "8568784525",
    address: {
      line1: "Gunjan tower",
      line2: "Shubhanpura",
      city: "Vadodara",
      state: "Gujarat",
      country: "IN",
      postal_code: "390003",
    },
  };

  return { billingDetails };
}

export default function StripePayment() {
  const pageData = getData();
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 paymentBox">
          <StripePayment billingDetails={pageData.billingDetails} />
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
}
