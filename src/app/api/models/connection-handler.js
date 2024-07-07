//import { getDatabaseConnector } from "./db-injector";
import { createError, createResponse, createSuccess } from "@/util";
import { removeToken, tokenInfo } from "./common";
import { db } from "./db";

//const connector = getDatabaseConnector();

export default (...args) => {
  return (fn) => async (req, res) => {
    //req.db = connector();
    let custID = null;
    let access_token = null;
    try {
      const reqUrl = new URL(req.url);

      if (reqUrl.pathname !== "/api/init") {
        const token = req.cookies.get("access_token");
        const tokenResponse = tokenInfo(token);

        if (!tokenResponse.status) {
          const headers = removeToken();

          return createResponse(createError(200, "Invalid token"), headers);
        }

        custID = tokenResponse.cust_id || null;
        access_token = tokenResponse.token;
      }

      const response = await fn(req, res, db, {
        custID,
        token: access_token,
      });
      //await db.destroy();
      return response;
    } catch (error) {
      console.log(error);

      return createResponse(createError(200, "Invalid request", true));
    }
  };
};

export const dbWrapper = ({ ...args }) => {
  return (fn) => async () => {
    const response = await fn(args, { db });
    //await db.destroy();
    return response;
  };
};
