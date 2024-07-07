"use client";
import "@/styles/shop.css";
import { AppState } from "@/context/Context";
import { makeRequest } from "@/util";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductList({ products }) {
  const { dispatch } = AppState();
  const router = useRouter();
  const [inCart, setInCart] = useState([]);

  async function handleAddToCart(e, prodID) {
    e.preventDefault();
    try {
      const response = await makeRequest(
        "api/cart/add-to-cart",
        "POST",
        {
          prod_id: prodID,
          qty: 1,
        },
        true
      );

      console.log(response);
      if (response.success) {
        //cart update
        setInCart([...inCart, prodID]);
        if (response.data) {
          dispatch({ type: "ADD_CART", payload: response.data });
        }
      } else {
        if (response.message === "Invalid token") {
          location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }

    //Add to cart
    //fetch request post
    //after adding into cart
    //set total no of items in cart
  }

  return (
    <div className="untree_co-section product-section before-footer-section">
      <div className="container">
        <div className="row">
          {products.map((product) => {
            return (
              <div
                className="col-12 col-md-4 col-lg-3 mb-5"
                key={product.prod_id}
              >
                <a className="product-item" href="#">
                  <Image
                    src={product.prod_media_path}
                    className="img-fluid product-thumbnail"
                    fill
                    alt=""
                  />
                  <h3 className="product-title">{product.prod_name}</h3>
                  <strong className="product-price">
                    Rs.{product.prod_price}
                  </strong>

                  <span
                    className="icon-cross"
                    onClick={(e) => handleAddToCart(e, product.prod_id)}
                  >
                    <Image
                      src="/images/cross.svg"
                      className="img-fluid"
                      fill
                      alt=""
                    />
                  </span>
                </a>
                {inCart.includes(product.prod_id) && (
                  <span className="view-cart">View cart</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
