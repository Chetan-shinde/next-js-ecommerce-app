import { db } from "./db";

const getCustomerByEmail = async (email) => {
  const customerByEmail = await db
    .select("cust_id", "cust_email")
    .table("customers")
    .where("cust_email", email)
    .first();
  //.toString()
  //.toNative();

  return customerByEmail;
};

const insertCustomer = async ({ email, password }) => {
  const insertedData = await db
    .insert(
      {
        cust_email: email,
        cust_password: password
          ? db.raw(`crypt('${password}', gen_salt('bf'))`)
          : null,
      },
      ["cust_id"]
    )
    .into("customers");
  return insertedData;
};

export const getCustomerByID = async (ID, db) => {
  const customer = await db
    .select("*")
    .table("customers")
    .where("cust_id", ID)
    .first();

  return customer;
};

export const updateCustomer = async (ID, db, updateData) => {
  await db("customers").where({ cust_id: ID }).update(updateData);
  return true;
};

export { getCustomerByEmail, insertCustomer };
