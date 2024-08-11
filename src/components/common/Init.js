"use client";

import { AppState } from "@/context/Context";
import { makeRequest } from "@/util";
import { useEffect } from "react";

export default function Init() {
  const { dispatch } = AppState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function init() {
      try {
        const initApiResponse = await makeRequest(
          "/api/init",
          "POST",
          null,
          true,
          null,
          { signal }
        );
        if (initApiResponse.success) {
          if (initApiResponse.data) {
            dispatch({ type: "SET_INIT_DATA", payload: initApiResponse.data });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    init();
    return () => {
      //controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
