import { createError, createResponse, createSuccess } from "@/util";
import { getAddressByCondition } from "../../models/address";
import connectionHandler from "../../models/connection-handler";
import { getCart } from "../../models/cart";
import { getProducts } from "../../models/product";

const handler = async function POST(request, res, db, { custID, token }) {
  try {
    const cart_data = await getCart(token, custID, null, { db });
    const cart_item_products = {};
    let cart_sub_total = 0;
    let data = null;

    if (cart_data && cart_data.length > 0) {
      let cartItemProdId = [];
      let [cart] = cart_data;
      let { cart_ca_billing_id, cart_ca_delivery_id } = cart;
      let cartAddressID = [cart_ca_billing_id, cart_ca_delivery_id];

      for (const citem of cart_data) {
        cartItemProdId = [...cartItemProdId, citem.cart_item_prod_id];
      }

      const productMedia = await getProducts(
        { prod_ids: cartItemProdId },
        { db }
      );

      if (productMedia && productMedia.length > 0) {
        for (const prdM of productMedia) {
          cart_item_products[prdM.prod_id] = prdM;
          cart_sub_total += parseFloat(prdM.prod_price);
        }
      }

      cart_sub_total = cart_sub_total.toFixed(2);
      let cart_total = cart_sub_total;

      let billing_address = null;
      let delivery_address = null;

      //address
      const addresses = await getAddressByCondition(db, { ID: cartAddressID });
      if (addresses && addresses.length > 0) {
        for (const address of addresses) {
          if (address.ca_id == cart_ca_billing_id) {
            billing_address = address;
          } else if (address.ca_id == cart_ca_delivery_id) {
            delivery_address = address;
            billing_address = address;
          }
        }
      }

      data = {
        cart_data,
        cart_item_products,
        cart_sub_total,
        cart_total,
        delivery_address,
        billing_address,
      };
    }

    return createResponse(createSuccess(200, "Order data", true, data));
  } catch (error) {
    return createResponse(createError(200, "Invalid request"));
  }
};

export const POST = connectionHandler()(handler);
