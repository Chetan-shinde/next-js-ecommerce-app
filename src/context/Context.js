"use client";
import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";

const initialState = {
  loginModalShow: false,
};

const context = createContext();

export default function AppContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
  );
}

export const AppState = () => useContext(context);
