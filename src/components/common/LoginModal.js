"use client";
import { AppState } from "@/context/Context";
import { Suspense, lazy } from "react";
import { Modal } from "react-bootstrap";
import { useState } from "react";

const Login = lazy(() => import("./Login"));
const SignUp = lazy(() => import("./SignUp"));

export default function LoginModal() {
  const { state, dispatch } = AppState();
  const { loginModalShow } = state;
  const [showSignup, setShowSignup] = useState(false);

  const handleClose = () => dispatch({ type: "CLOSE_LOGIN_MODAL" });

  function handleSwitchingForm() {
    setShowSignup(!showSignup);
  }

  return (
    loginModalShow && (
      <Suspense>
        <Modal show={loginModalShow} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {showSignup ? (
              <SignUp onClickLogin={handleSwitchingForm} />
            ) : (
              <Login onClickSignup={handleSwitchingForm} />
            )}
          </Modal.Body>
        </Modal>
      </Suspense>
    )
  );
}
