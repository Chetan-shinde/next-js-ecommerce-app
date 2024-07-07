import { number, object, string } from "yup";

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

export const saveAddress = async (data, db) => {
  const [billing_address_id] = await db("customer_address").insert(
    { ...data },
    ["ca_id"]
  );

  return billing_address_id.ca_id;
};

export const validate = async (body, shipToDiffAdd) => {
  let response = { status: false };
  let schema = billingAddressschema;
  if (shipToDiffAdd) {
    schema = { ...billingAddressschema, ...deliveryAddressSchema };
  }

  schema = object(schema);
  try {
    let validData = await schema.validate(body, { abortEarly: false });
    response.status = true;
    response.validData = validData;
    return response;
  } catch (error) {
    console.log();
    response.error = error;
  }

  return response;
};

export const getAddressByCondition = async (db, filter) => {
  const query = db("customer_address").select(
    "ca_id",
    "ca_fname",
    "ca_lname",
    "ca_add",
    "ca_apt",
    "ca_state",
    "ca_zip",
    "ca_email",
    "ca_phone",
    "ca_type"
  );

  if (filter.ID) {
    query.whereIn("ca_id", filter.ID);
  }

  const data = await query;
  return data;
};
