"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { register } from "swiper/element/bundle";
// register Swiper custom elements

export default function Testimonial() {
  const [state, setState] = useState(null);
  const swiperElRef = useRef(null);

  useEffect(() => {
    register();
  }, []);

  useEffect(() => {
    setState(1);
    if (swiperElRef.current) {
      // swiper parameters
      const swiperParams = {
        slidesPerView: 1,
        cssMode: true,
        navigation: true,
        pagination: true,
        autoplay: {
          delay: 2500,
        },
        injectStyles: [
          `
			.swiper-horizontal > .swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction {
			  bottom: 0px;
			}
			`,
        ],
      };
      // now we need to assign all parameters to Swiper element
      Object.assign(swiperElRef.current, swiperParams);
      swiperElRef.current.initialize();
    }
  }, [state]);
  if (!state) {
    return false;
  }

  return (
    <>
      <div className="testimonial-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto text-center">
              <h2 className="section-title">Testimonials</h2>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="testimonial-slider-wrap text-center">
                <div className="tns-outer">
                  <div className="tns-ovh">
                    <div className="tns-inner" id="tns1-iw">
                      <div
                        className="testimonial-slider  tns-slider tns-carousel tns-subpixel tns-calc tns-horizontal"
                        id="tns1"
                      >
                        <swiper-container
                          className=""
                          init="false"
                          ref={swiperElRef}
                        >
                          <swiper-slide>
                            <div
                              className="item tns-item"
                              aria-hidden="true"
                              tabIndex="-1"
                            >
                              <div className="row justify-content-center">
                                <div className="col-lg-8 mx-auto">
                                  <div className="testimonial-block text-center">
                                    <blockquote className="mb-5">
                                      <p>
                                        “Donec facilisis quam ut purus rutrum
                                        lobortis. Donec vitae odio quis nisl
                                        dapibus malesuada. Nullam ac aliquet
                                        velit. Aliquam vulputate velit imperdiet
                                        dolor tempor tristique. Pellentesque
                                        habitant morbi tristique senectus et
                                        netus et malesuada fames ac turpis
                                        egestas. Integer convallis volutpat dui
                                        quis scelerisque.”
                                      </p>
                                    </blockquote>

                                    <div className="author-info">
                                      <div className="author-pic">
                                        <Image
                                          src="/images/person-1.png"
                                          alt="Maria Jones"
                                          className="img-fluid"
                                          width={80}
                                          height={80}
                                        />
                                      </div>
                                      <h3 className="font-weight-bold">
                                        Maria Jones
                                      </h3>
                                      <span className="position d-block mb-3">
                                        CEO, Co-Founder, XYZ Inc.
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </swiper-slide>
                          <swiper-slide>
                            <div
                              className="item tns-item tns-slide-active"
                              id="tns1-item0"
                            >
                              <div className="row justify-content-center">
                                <div className="col-lg-8 mx-auto">
                                  <div className="testimonial-block text-center">
                                    <blockquote className="mb-5">
                                      <p>
                                        “Donec facilisis quam ut purus rutrum
                                        lobortis. Donec vitae odio quis nisl
                                        dapibus malesuada. Nullam ac aliquet
                                        velit. Aliquam vulputate velit imperdiet
                                        dolor tempor tristique. Pellentesque
                                        habitant morbi tristique senectus et
                                        netus et malesuada fames ac turpis
                                        egestas. Integer convallis volutpat dui
                                        quis scelerisque.”
                                      </p>
                                    </blockquote>

                                    <div className="author-info">
                                      <div className="author-pic">
                                        <Image
                                          src="/images/person-1.png"
                                          alt="Maria Jones"
                                          className="img-fluid"
                                          width={80}
                                          height={80}
                                        />
                                      </div>
                                      <h3 className="font-weight-bold">
                                        Maria Jones
                                      </h3>
                                      <span className="position d-block mb-3">
                                        CEO, Co-Founder, XYZ Inc.
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </swiper-slide>
                          <swiper-slide>
                            <div
                              className="item tns-item tns-slide-active"
                              id="tns1-item0"
                            >
                              <div className="row justify-content-center">
                                <div className="col-lg-8 mx-auto">
                                  <div className="testimonial-block text-center">
                                    <blockquote className="mb-5">
                                      <p>
                                        “Donec facilisis quam ut purus rutrum
                                        lobortis. Donec vitae odio quis nisl
                                        dapibus malesuada. Nullam ac aliquet
                                        velit. Aliquam vulputate velit imperdiet
                                        dolor tempor tristique. Pellentesque
                                        habitant morbi tristique senectus et
                                        netus et malesuada fames ac turpis
                                        egestas. Integer convallis volutpat dui
                                        quis scelerisque.”
                                      </p>
                                    </blockquote>

                                    <div className="author-info">
                                      <div className="author-pic">
                                        <Image
                                          src="/images/person-1.png"
                                          alt="Maria Jones"
                                          className="img-fluid"
                                          width={80}
                                          height={80}
                                        />
                                      </div>
                                      <h3 className="font-weight-bold">
                                        Maria Jones
                                      </h3>
                                      <span className="position d-block mb-3">
                                        CEO, Co-Founder, XYZ Inc.
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </swiper-slide>
                        </swiper-container>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
