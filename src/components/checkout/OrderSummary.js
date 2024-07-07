import { useCheckoutSwr } from "@/hooks";
import { makeRequest } from "@/util";
import Shimmer from "../common/Shimmer";

const fetcher = async (...args) => {
  const data = await makeRequest(args[0], "POST", null, true);
  return data;
};

export default function OrderSummary({ formRef }) {
  return (
    <div className="col-md-6">
      <div className="row mb-5">
        <div className="col-md-12">
          <h2 className="h3 mb-3 text-black">Coupon Code</h2>
          <div className="p-3 p-lg-5 border bg-white">
            <label htmlFor="c_code" className="text-black mb-3">
              Enter your coupon code if you have one
            </label>
            <div className="input-group w-75 couponcode-wrap">
              <input
                type="text"
                className="form-control me-2"
                id="c_code"
                placeholder="Coupon Code"
                aria-label="Coupon Code"
                aria-describedby="button-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-black btn-sm"
                  type="button"
                  id="button-addon2"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrderTable formRef={formRef} />
    </div>
  );
}

function OrderTable({ formRef }) {
  const { data, isLoading, mutate } = useCheckoutSwr(
    "/api/cart/get-cart",
    fetcher
  );

  if (isLoading) {
    return <Shimmer />;
  }

  const {
    cart_data: cart_items,
    cart_item_products,
    cart_sub_total,
    cart_total,
  } = data.data;

  function placeOrder(e) {
    e.preventDefault();
    console.log("label");
    formRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
    //formRef.current.submit();
  }

  return (
    <div className="row mb-5">
      <div className="col-md-12">
        <h2 className="h3 mb-3 text-black">Your Order</h2>
        <div className="p-3 p-lg-5 border bg-white">
          <table className="table site-block-order-table mb-5">
            <thead>
              <tr>
                <th>Product</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart_items &&
                cart_items.map((item) => {
                  return (
                    <tr key={item.cart_item_id}>
                      <td>
                        {cart_item_products[item.cart_item_prod_id].prod_name}
                        <strong className="mx-2">x</strong> {item.cart_item_qty}
                      </td>
                      <td>
                        {cart_item_products[item.cart_item_prod_id].prod_price}
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td className="text-black font-weight-bold">
                  <strong>Cart Subtotal</strong>
                </td>
                <td className="text-black">{cart_sub_total}</td>
              </tr>
              <tr>
                <td className="text-black font-weight-bold">
                  <strong>Order Total</strong>
                </td>
                <td className="text-black font-weight-bold">
                  <strong>{cart_total}</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="border p-3 mb-3">
            <h3 className="h6 mb-0">
              <a
                className="d-block"
                data-bs-toggle="collapse"
                href="#collapsebank"
                role="button"
                aria-expanded="false"
                aria-controls="collapsebank"
              >
                Direct Bank Transfer
              </a>
            </h3>

            <div className="collapse" id="collapsebank">
              <div className="py-2">
                <p className="mb-0">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order won’t be
                  shipped until the funds have cleared in our account.
                </p>
              </div>
            </div>
          </div>

          <div className="border p-3 mb-3">
            <h3 className="h6 mb-0">
              <a
                className="d-block"
                data-bs-toggle="collapse"
                href="#collapsecheque"
                role="button"
                aria-expanded="false"
                aria-controls="collapsecheque"
              >
                Cheque Payment
              </a>
            </h3>

            <div className="collapse" id="collapsecheque">
              <div className="py-2">
                <p className="mb-0">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order won’t be
                  shipped until the funds have cleared in our account.
                </p>
              </div>
            </div>
          </div>

          <div className="border p-3 mb-5">
            <h3 className="h6 mb-0">
              <a
                className="d-block"
                data-bs-toggle="collapse"
                href="#collapsepaypal"
                role="button"
                aria-expanded="false"
                aria-controls="collapsepaypal"
              >
                Paypal
              </a>
            </h3>

            <div className="collapse" id="collapsepaypal">
              <div className="py-2">
                <p className="mb-0">
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order won’t be
                  shipped until the funds have cleared in our account.
                </p>
              </div>
            </div>
          </div>

          <div className="form-group">
            <button
              className="btn btn-black btn-lg py-3 btn-block"
              type="button"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
