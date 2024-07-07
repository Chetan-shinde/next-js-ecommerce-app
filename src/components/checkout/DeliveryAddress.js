export default function DeliveryAddress({ register, errors }) {
  return (
    <div className="collapse show" id="ship_different_address">
      <div className="py-2">
        <div className="form-group">
          <label htmlFor="c_diff_country" className="text-black">
            Country <span className="text-danger">*</span>
          </label>
          <select
            id="c_diff_country"
            className="form-control"
            {...register("delivery_country")}
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
          <p className="text-danger">{errors.delivery_country?.message}</p>
        </div>

        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="c_diff_fname" className="text-black">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_diff_fname"
              {...register("delivery_fname")}
            />
            <p className="text-danger">{errors.delivery_fname?.message}</p>
          </div>
          <div className="col-md-6">
            <label htmlFor="c_diff_lname" className="text-black">
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_diff_lname"
              {...register("delivery_lname")}
            />
            <p className="text-danger">{errors.delivery_lname?.message}</p>
          </div>
        </div>

        <div className="form-group row  mb-3">
          <div className="col-md-12">
            <label htmlFor="c_diff_address" className="text-black">
              Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_diff_address"
              name="c_diff_address"
              placeholder="Street address"
              {...register("delivery_address")}
            />
          </div>
          <p className="text-danger">{errors.delivery_address?.message}</p>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Apartment, suite, unit etc. (optional)"
            {...register("delivery_apt")}
          />
        </div>

        <div className="form-group row">
          <div className="col-md-6">
            <label htmlFor="c_diff_state_country" className="text-black">
              State / Country <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_diff_state_country"
              {...register("delivery_state")}
            />
            <p className="text-danger">{errors.delivery_state?.message}</p>
          </div>
          <div className="col-md-6">
            <label htmlFor="c_postal_zip" className="text-black">
              Posta / Zip <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_diff_postal_zip"
              name="c_diff_postal_zip"
              {...register("delivery_zip")}
            />
            <p className="text-danger">{errors.delivery_zip?.message}</p>
          </div>
        </div>

        <div className="form-group row mb-5">
          <div className="col-md-6">
            <label htmlFor="c_diff_email_address" className="text-black">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_diff_email_address"
              name="c_diff_email_address"
              {...register("delivery_email")}
            />
            <p className="text-danger">{errors.delivery_email?.message}</p>
          </div>
          <div className="col-md-6">
            <label htmlFor="c_diff_phone" className="text-black">
              Phone <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="c_diff_phone"
              name="c_diff_phone"
              placeholder="Phone Number"
              {...register("delivery_phone")}
            />
            <p className="text-danger">{errors.delivery_phone?.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
