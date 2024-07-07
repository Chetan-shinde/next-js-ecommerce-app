"use client";
import Image from "next/image";
import "../../styles/cart.css";
import useSWR from "swr";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { makeRequest } from "@/util";
import Shimmer from "../common/Shimmer";
import { useRouter } from "next/navigation";
import { useCustomSwr } from "@/hooks";
import { AppState } from "@/context/Context";

const cart_items = [
  {
    item_id: 1,
    image_path: "/images/product-1.png",
    item_name: "Product 1",
    item_price: 25.25,
    item_qty: 1,
    item_total: 25.25,
  },
  {
    item_id: 2,
    image_path: "/images/product-2.png",
    item_name: "Product 2",
    item_price: 35.25,
    item_qty: 2,
    item_total: 70.5,
  },
];

const delay = () => new Promise((res) => setTimeout(() => res(), 3000));

const fetcher = async (...args) => {
  const data = await makeRequest(args[0], "POST", null, true);
  return data;
  console.log(data);
  await delay();
  return cart_items;
};

export default function CartTable() {
  const { data, isLoading, mutate } = useCustomSwr(
    "/api/cart/get-cart",
    fetcher
  );
  const qtyState = useRef({});
  const itemids = useRef([]);
  const [cartUpdateMsg, setcartUpdateMsg] = useState("");

  const { dispatch } = AppState();

  if (isLoading) {
    return <Shimmer />;
  }

  if (!data.data) {
    return <h2>No items found</h2>;
  }

  const { cart_data: cart_items, cart_item_products } = data.data;

  if (!cart_items || cart_items.length == 0) {
    return <h2>No items found</h2>;
  }

  if (cart_items) {
    cart_items.map(
      (item) => (qtyState.current[item.cart_item_id] = item.cart_item_qty)
    );
    itemids.current = cart_items.map((item) => item.cart_item_id);
  }

  function updateQty(item_id, qty) {
    qtyState.current[item_id] = qty;
  }

  async function updateCart() {
    const update_cart_response = await makeRequest(
      process.env.NEXT_PUBLIC_SITE_URL + "/api/cart/update-cart",
      "POST",
      {
        item_ids: itemids.current,
        qty: qtyState.current,
      }
    );

    if (update_cart_response.success) {
      setcartUpdateMsg(update_cart_response.message);
    }
  }

  async function removeCartItem(e, itemID) {
    e.preventDefault();
    const update_cart_response = await makeRequest(
      process.env.NEXT_PUBLIC_SITE_URL + "/api/cart/remove-cart-item",
      "POST",
      {
        item_id: itemID,
      }
    );
    dispatch({
      type: "ADD_CART",
      payload: { no_of_cart_items: cart_items.length - 1 },
    });
    mutate();
  }

  return (
    <div className="untree_co-section before-footer-section">
      <div className="container">
        <div className="row mb-5">
          <form className="col-md-12" method="post">
            <div className="site-blocks-table">
              <table className="table">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Image</th>
                    <th className="product-name">Product</th>
                    <th className="product-price">Price</th>
                    <th className="product-quantity">Quantity</th>
                    <th className="product-total">Total</th>
                    <th className="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart_items &&
                    cart_items.map((item) => (
                      <CartItem
                        item={item}
                        key={item.cart_item_id}
                        updateQty={updateQty}
                        product={cart_item_products[item.cart_item_prod_id]}
                        removeCartItem={removeCartItem}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="row mb-5">
              <div className="col-md-6 mb-3 mb-md-0">
                <button
                  className="btn btn-black btn-sm btn-block"
                  onClick={updateCart}
                >
                  Update Cart
                </button>
                {cartUpdateMsg && <p>{cartUpdateMsg}</p>}
              </div>
              <div className="col-md-6">
                <button className="btn btn-outline-black btn-sm btn-block">
                  Continue Shopping
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <label className="text-black h4" htmlFor="coupon">
                  Coupon
                </label>
                <p>Enter your coupon code if you have one.</p>
              </div>
              <div className="col-md-8 mb-3 mb-md-0">
                <input
                  type="text"
                  className="form-control py-3"
                  id="coupon"
                  placeholder="Coupon Code"
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-black">Apply Coupon</button>
              </div>
            </div>
          </div>
          <div className="col-md-6 pl-5">
            <div className="row justify-content-end">
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12 text-right border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">
                      Cart Totals
                    </h3>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <span className="text-black">Subtotal</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">$230.00</strong>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <span className="text-black">Total</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">$230.00</strong>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <button className="btn btn-black btn-lg py-3 btn-block">
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem({ item, updateQty, product, removeCartItem }) {
  const [qty, setQty] = useState(item.cart_item_qty);

  function updateitemQty(action) {
    if (action == "subtract") {
      setQty(qty - 1);
    }
    if (action == "add") {
      setQty(qty + 1);
    }
  }

  useEffect(() => {
    updateQty(item.cart_item_id, qty);
  }, [qty]);

  return (
    <tr>
      <td className="product-thumbnail">
        <Image
          src={product.prod_media_path}
          fill
          alt={product.prod_name}
          className="img-fluid"
        />
      </td>
      <td className="product-name">
        <h2 className="h5 text-black">{product.prod_name}</h2>
      </td>
      <td>{product.prod_price}</td>
      <td>
        <div
          className="input-group mb-3 d-flex align-items-center quantity-container"
          style={{ maxWidth: "120px" }}
        >
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-black decrease"
              type="button"
              onClick={() => updateitemQty("subtract")}
            >
              −
            </button>
          </div>
          <input
            type="text"
            className="form-control text-center quantity-amount"
            value={qty}
            readOnly
            placeholder=""
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-black increase"
              type="button"
              onClick={() => updateitemQty("add")}
            >
              +
            </button>
          </div>
        </div>
      </td>
      <td></td>
      <td>
        <a
          href="#"
          className="btn btn-black btn-sm"
          onClick={(e) => removeCartItem(e, item.cart_item_id)}
        >
          X
        </a>
      </td>
    </tr>
  );
}
