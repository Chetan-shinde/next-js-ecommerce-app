import { dbWrapper } from "@/app/api/models/connection-handler";
import { getProducts } from "@/app/api/models/product";
import ProductList from "@/components/shop/ProductsList";
import { cache } from "react";

const getData = cache(dbWrapper({})(getProducts));

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Shop() {
  const products = await getData();
  /* const productsx = dbWrapper({ feature_products: 1 });
  const products = await productsx(getProducts); */

  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Shop</h1>
              </div>
            </div>
            <div className="col-lg-7"></div>
          </div>
        </div>
      </div>
      <ProductList products={products} />
    </>
  );
}
