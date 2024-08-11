//const { db } = require("./db");

const getProducts = async (filter, { db }) => {
  const products = db
    .select(
      "p.prod_id",
      "p.prod_name",
      "p.prod_price",
      "pm.prod_media_path",
      "p.prod_descr"
    )
    .table("products as p")
    .join("prod_media as pm", "p.prod_id", "=", "pm.prod_media_prod_id");

  if (filter && filter.feature_products) {
    products.where("p.prod_feature", "Y");
  }

  if (filter && filter.prod_ids) {
    products.whereIn("p.prod_id", filter.prod_ids);
  }

  //let s = await products.toString();

  const p = await products;

  return p;
};

const addProductInCart = async () => {
  //fetch exist cart by cookie
  //if cart not exist then add item in cart
  //if cart exist then check product exist
  //if product not exist then add in cart
  //return cart
};

export const getProductsFromCart = async (cart_data, { db }) => {
  const cart_item_products = {};
  let cart_sub_total = 0;

  let data = null;

  if (cart_data && cart_data.length > 0) {
    let cartItemByProdId = {};

    cart_data.forEach((item) => {
      cartItemByProdId[item.cart_item_prod_id] = item;
    });

    let cartItemProdId = Object.keys(cartItemByProdId);

    const productMedia = await getProducts(
      { prod_ids: cartItemProdId },
      { db }
    );

    if (productMedia && productMedia.length > 0) {
      for (const prdM of productMedia) {
        cart_item_products[prdM.prod_id] = prdM;
        cart_sub_total += parseFloat(
          prdM.prod_price * cartItemByProdId[prdM.prod_id].cart_item_qty
        );
      }
    }

    cart_sub_total = cart_sub_total.toFixed(2);
    let cart_total = cart_sub_total;

    data = { cart_item_products, cart_sub_total, cart_total };
  }

  return data;
};

export { getProducts };
