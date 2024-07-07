import knex from "knex";
import { object, string } from "yup";
//import { db } from "./db";

const schema = object({
  email: string().required("email is required").email("email should be valid"),
  password: string().required("password is required"),
});

const processLogin = async (data, { db }) => {
  //validation
  // parse and assert validity
  let response = { success: false };
  try {
    const user = await schema.validate(data, { abortEarly: false });
    const customers = await db("customers")
      .select("cust_id", "cust_email", "cust_phone")
      .where("cust_email", user.email)
      .andWhere(
        "cust_password",
        db.raw(`crypt('${user.password}', "cust_password")`)
      )
      .first();
    //.toString();
    //.toNative();
    console.log();
    if (customers) {
      response.success = true;
      response.data = { ...customers };
    } else {
      response.success = false;
      response.data = ["Email and password is wrong"];
    }
  } catch (err) {
    console.log(err);
    response.success = false;
    response.data = [...err.errors];
  }

  return response;
  //check email and password
};

export { processLogin };
