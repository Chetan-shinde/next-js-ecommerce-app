import { object, string } from "yup";
import { getCustomerByEmail, insertCustomer } from "./customers";

const schema = object({
  email: string().required("email is required").email("email should be valid"),
  password: string().required("password is required"),
});

const processSignup = async (data) => {
  let response = { success: false };
  try {
    const user = await schema.validate(data, { abortEarly: false });

    const customerByEmail = await getCustomerByEmail(user.email);

    if (customerByEmail) {
      response.success = false;
      response.data = ["Email already exists"];
    } else {
      const insertedData = await insertCustomer({
        email: user.email,
        password: user.password,
      });

      response.success = true;
      response.data = { ...insertedData[0] };
    }
  } catch (error) {
    response.success = false;
    response.data = [...error.errors];
  }

  return response;
};

const processLoginWithGoogle = async ({ email }) => {
  let response = { success: false };
  const customerByEmail = await getCustomerByEmail(email);

  if (!customerByEmail) {
    let insertedData = await insertCustomer({ email: email });
    response.data = { ...insertedData[0] };
  } else {
    response.data = { ...customerByEmail };
  }
  response.success = true;

  return response;
};

export { processSignup, processLoginWithGoogle };
