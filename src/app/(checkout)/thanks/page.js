//token check
//take cart
//get payment intent

import Init from "@/components/common/Init";
import Navbar from "@/components/common/Navbar";
import { makeRequest } from "@/util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getData = async ({ searchParams }) => {
  const response = await makeRequest(
    process.env.SITE_URL + "api/checkout/thanks",
    "POST",
    { ...searchParams },
    true,
    {
      Cookie: cookies().toString(),
    }
  );

  if (!response.success && response.data?.redirect) {
    redirect(response.data.redirect);
  }

  return response;
};

export default async function Thanks({ searchParams }) {
  const thanksResponse = await getData({ searchParams });

  return (
    <>
      <Init />
      <Navbar isCMS={true} />
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Thanks</h1>
              </div>
            </div>
            <div className="col-lg-7"></div>
          </div>
        </div>
      </div>
      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center pt-5">
              {thanksResponse.data && thanksResponse.data.length > 0 && (
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th>Item ID</th>
                      <th>Order ID</th>
                      <th>Product</th>
                      <th>Total</th>
                      <th>Order Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thanksResponse.data.map((oitem) => {
                      return (
                        <tr key={oitem.oi_id}>
                          <td>{oitem.oi_id}</td>
                          <td>{oitem.om_id}</td>
                          <td>{oitem.prod_name}</td>
                          <td>{oitem.oi_total}</td>
                          <td>{oitem.om_order_total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              <p className="lead mb-5">You order was successfuly completed.</p>
              <p>
                <a href="shop.html" className="btn btn-sm btn-outline-black">
                  Back to shop
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
