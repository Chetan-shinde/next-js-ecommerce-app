import jwt from "jsonwebtoken";

export const createResponse = (obj, headers) => {
  const message = obj.message || "Something went wrong";
  const statusCode = obj.statusCode || 500;

  const jsonBody = {
    success: obj.status || false,
    status: statusCode,
    message: message,
    data: obj.data,
  };

  let options = {
    status: statusCode,
    headers: { "Content-Type": "application/json", ...headers },
  };

  return new Response(JSON.stringify(jsonBody), options);
};

export const createSuccess = (statusCode, successMessage, status, data) => {
  const successObj = {
    statusCode: statusCode,
    message: successMessage,
    status: status,
    data: data || null,
  };
  return successObj;
};

export const createError = (statusCode, message) => {
  const err = new Error();
  err.statusCode = statusCode;
  err.message = message;

  return err;
};

export const makeRequest = async (
  url,
  method,
  postData,
  noCache,
  headers,
  fetchExtraOptions
) => {
  let fetchOptions = {
    method: method,
    headers: {
      "Content-type": "application/json",
    },
  };
  //console.log(url);

  if (headers) {
    fetchOptions.headers = { ...fetchOptions.headers, ...headers };
  }

  if (postData) {
    fetchOptions.body = JSON.stringify({ ...postData });
  }

  if (noCache) {
    fetchOptions.cache = "no-store";
  }

  if (fetchExtraOptions) {
    fetchOptions = { ...fetchOptions, ...fetchExtraOptions };
  }

  const res = await fetch(url, fetchOptions);

  const data = await res.json();
  return data;
};

export const randomString = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const createAccessToken = (payload) => {
  let accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return accessToken;
};

export const isEmpty = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
};
