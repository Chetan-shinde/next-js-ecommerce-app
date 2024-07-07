import jwt from "jsonwebtoken";

const tokenInfo = (token) => {
  let response = { status: false };
  if (!token) {
    return response;
  }
  try {
    token = token.value;

    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    response.token = token;
    console.log(decoded);
    if (decoded.device_id) {
      response.status = true;
      response.logged_in = false;
      response.device_id = decoded.device_id;
      return response;
    } else if (decoded.cust_id) {
      response.status = true;
      response.logged_in = true;
      response.cust_id = decoded.cust_id;
      return response;
    }
  } catch (error) {
    console.log("error");
    console.log(error);
    return response;
  }
};

const removeToken = () => {
  const headers = {
    "Set-Cookie": `access_token=; Domain=localhost;  Path=/; Max-Age=-1; HttpOnly`,
  };
  return headers;
};

export { tokenInfo, removeToken };
