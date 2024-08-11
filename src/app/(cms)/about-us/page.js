import Team from "@/components/aboutUs/Team";
import WhyChooseSection from "@/components/common/WhyChooseUs";
import Image from "next/image";

export default function AboutUs() {
  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>About Us</h1>
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
                <Image
                  src="/images/couch.png"
                  className="img-fluid"
                  width={700}
                  height={500}
                  alt="Couch"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhyChooseSection />
      <Team />
    </>
  );
}
