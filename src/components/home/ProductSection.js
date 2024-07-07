import Image from "next/image";

const products = [
  {
    prod_id: 1,
    prod_media_path: "/images/product-1.png",
    prod_name: "Nordic Chair",
    prod_price: 50.0,
  },
  {
    prod_id: 2,
    prod_media_path: "/images/product-2.png",
    prod_name: "Kruzo Aero Chair",
    prod_price: 78.0,
  },
  {
    prod_id: 3,
    prod_media_path: "/images/product-3.png",
    prod_name: "Ergonomic Chair",
    prod_price: 43.0,
  },
];

export default function ProductSection({ products }) {
  return (
    <div className="product-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
            <h2 className="mb-4 section-title">
              Crafted with excellent material.
            </h2>
            <p className="mb-4">
              Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
              velit. Aliquam vulputate velit imperdiet dolor tempor tristique.{" "}
            </p>
            <p>
              <a href="shop.html" className="btn">
                Explore
              </a>
            </p>
          </div>
          {products.map((product, index) => {
            return (
              <div
                className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0"
                key={product.prod_id}
              >
                <a className="product-item" href="cart.html">
                  <Image
                    src={product.prod_media_path}
                    alt=""
                    fill
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">{product.prod_name}</h3>
                  <strong className="product-price">
                    ${product.prod_price}
                  </strong>

                  <span className="icon-cross">
                    <Image
                      src="/images/cross.svg"
                      alt=""
                      fill
                      className="img-fluid"
                    />
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
