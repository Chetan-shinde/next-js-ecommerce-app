import { useState } from "react";
import DeliveryAddress from "./DeliveryAddress";
import { useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";
import { makeRequest } from "@/util";
import { useRouter } from "next/navigation";

let billingAddressschema = {
  country: number().positive().integer().required(),
  fname: string().min(3).max(6).required().label("First name"),
  lname: string().min(3).max(6).required().label("Last name"),
  add: string().max(55).required().label("Address"),
  apt: string().optional(),
  state: string().required().label("State"),
  zip: string().required(),
  email: string().required().email(),
  phone: number().positive().integer().required(),
  coupon_code: string().optional().lowercase(),
};

const deliveryAddressSchema = {
  delivery_country: number()
    .positive()
    .integer()
    .required()
    .label("Delivery country"),
  delivery_fname: string().min(3).max(6).required().label("First name"),
  delivery_lname: string().min(3).max(6).required().label("Last name"),
  delivery_address: string().max(55).required().label("Last name"),
  delivery_apt: string().optional().label("Delivery apartment"),
  delivery_state: string().required().label("Delivery state"),
  delivery_zip: string().required().label("Delivery zip"),
  delivery_email: string().required().email().label("Delivery email"),
  delivery_phone: number().positive().integer().min(10).max(10).required(),
};

export default function BillingAddress({ formRef }) {
  const yupschema = useRef(billingAddressschema);
  const [shipToDiffAdd, setShipToDiffAdd] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(object(yupschema.current)) });
  const onSubmit = (formdata) => {
    makeRequest("api/checkout/place-order", "POST", formdata).then((res) => {
      if (!res.success) {
      } else {
        //redirect to
        router.push("/payment");
      }
    });
  };

  function shipTODifferentAddress() {
    if (!shipToDiffAdd) {
      yupschema.current = { ...billingAddressschema, ...deliveryAddressSchema };
    } else {
      yupschema.current = billingAddressschema;
    }
    setShipToDiffAdd((prev) => !prev);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <h2 className="h3 mb-3 text-black">Billing Details</h2>
      <div className="p-3 p-lg-5 border bg-white">
        <div className="form-group">
          <label htmlFor="c_country" className="text-black">
            Country <span className="text-danger">*</span>
          </label>
          <select
            id="c_country"
            className="form-control"
            {...register("country")}
          >
            <option value="1">Select a country</option>
            <option value="2">bangladesh</option>
            <option value="3">Algeria</option>
            <option value="4">Afghanistan</option>
            <option value="5">Ghana</option>
            <option value="6">Albania</option>
            <option value="7">Bahrain</option>
            <option value="8">Colombia</option>
            <option value="9">Dominican Republic</option>
          </select>
          <p className="text-danger">{errors.country?.message}</p>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="c_fname" className="text-black">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_fname"
              {...register("fname")}
            />
            <p className="text-danger">{errors.fname?.message}</p>
          </div>
          <div className="col-md-6">
            <label htmlFor="c_lname" className="text-black">
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_lname"
              name="c_lname"
              {...register("lname")}
            />
            <p className="text-danger">{errors.lname?.message}</p>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-md-12">
            <label htmlFor="c_address" className="text-black">
              Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_address"
              name="c_address"
              placeholder="Street address"
              {...register("add")}
            />
            <p className="text-danger">{errors.add?.message}</p>
          </div>
        </div>
        <div className="form-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Apartment, suite, unit etc. (optional)"
            {...register("apt")}
          />
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="c_state_country" className="text-black">
              State / Country <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_state_country"
              name="c_state_country"
              {...register("state")}
            />
            <p className="text-danger">{errors.state?.message}</p>
          </div>
          <div className="col-md-6">
            <label htmlFor="c_postal_zip" className="text-black">
              Posta / Zip <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_postal_zip"
              name="c_postal_zip"
              {...register("zip")}
            />
          </div>
        </div>

        <div className="form-group row mb-5">
          <div className="col-md-6">
            <label htmlFor="c_email_address" className="text-black">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_email_address"
              name="c_email_address"
              {...register("email")}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="c_phone" className="text-black">
              Phone <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_phone"
              name="c_phone"
              placeholder="Phone Number"
              {...register("phone")}
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="c_ship_different_address"
            className="text-black"
            data-bs-toggle="collapse"
            href="#ship_different_address"
            role="button"
            aria-expanded="true"
            aria-controls="ship_different_address"
          >
            <input
              type="checkbox"
              value="1"
              id="c_ship_different_address"
              onChange={shipTODifferentAddress}
            />{" "}
            Ship To A Different Address?
          </label>
          {shipToDiffAdd && (
            <DeliveryAddress register={register} errors={errors} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="c_order_notes" className="text-black">
            Order Notes
          </label>
          <textarea
            name="c_order_notes"
            id="c_order_notes"
            cols="30"
            rows="5"
            className="form-control"
            placeholder="Write your notes here..."
          ></textarea>
        </div>
      </div>
    </form>
  );
}
