import Image from "next/image";
import couchImg from "../../../public/images/couch.png";
import ProductSection from "@/components/home/ProductSection";
import WhyChooseSection from "@/components/common/WhyChooseUs";
import WeHelpSection from "@/components/home/WeHelpSection";
import PopularProduct from "@/components/home/PopularProduct";
import Testimonial from "@/components/home/Testimonial";
import RecentBlog from "@/components/home/RecentBlog";
import { getProducts } from "../api/models/product";
import { cache } from "react";
import { dbWrapper } from "../api/models/connection-handler";

/* const getData = cache(async () => {
	const db_wrapper = dbWrapper({ feature_products: 1 });
    const products = db_wrapper(getProducts);
    console.log("products wrapper prod");
}); */

const getData = cache(dbWrapper({ feature_products: 1 })(getProducts));

export const revalidate = 3600; // revalidate the data at most every hour

export default async function Home() {
  const data = await getData();

  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>
                  Modern Interior <span clsas="d-block">Design Studio</span>
                </h1>
                <p className="mb-4">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac
                  aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
                  tristique.
                </p>
                <p>
                  <a href="" className="btn btn-secondary me-2">
                    Shop Now
                  </a>
                  <a href="#" className="btn btn-white-outline">
                    Explore
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <Image src={couchImg} alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductSection products={data} />
      <WhyChooseSection />
      <WeHelpSection />
      <PopularProduct products={data} />
      <Testimonial />
      <RecentBlog />
    </>
  );
}
