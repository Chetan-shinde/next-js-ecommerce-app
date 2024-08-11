import Image from "next/image";

export default function PopularProduct({ products }) {
  return (
    <div className="popular-product">
      <div className="container">
        <div className="row">
          {products.map((product) => {
            return (
              <div
                key={product.prod_id}
                className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0"
              >
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <Image
                      src={product.prod_media_path}
                      alt="Image"
                      className="img-fluid"
                      fill
                    />
                  </div>
                  <div className="pt-3">
                    <h3>{product.prod_name}</h3>
                    <p>{product.prod_descr}</p>
                    <p>
                      <a href="#">Read More</a>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
