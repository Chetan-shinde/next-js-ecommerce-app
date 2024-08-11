import "@/styles/login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppState } from "@/context/Context";
import { makeRequest } from "@/util";
import LoginWithGoogle from "./LoginWithGoogle";

const schema = object({
  email: string().required("Email is required").email(),
  password: string().required("Password is required"),
});

export default function Login({ onClickSignup }) {
  const [serverError, setServerError] = useState([]);
  const router = useRouter();
  const { dispatch } = AppState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (formdata) => {
    makeRequest("api/login", "POST", formdata).then((res) => {
      if (!res.success) {
        setServerError(res.data);
      } else {
        dispatch({ type: "CLOSE_LOGIN_MODAL" });
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-12 col-lg-12 col-xl-12">
          <div className="card py-3 px-2">
            <p className="text-center mb-3 mt-2">Login with</p>
            <div className="row mx-auto ">
              <div className="col-4">
                <LoginWithGoogle />
              </div>
            </div>
            <div className="division">
              <div className="row">
                <div className="col-3">
                  <div className="line l"></div>
                </div>
                <div className="col-6">
                  <span>Login With Email</span>
                </div>
                <div className="col-3">
                  <div className="line r"></div>
                </div>
              </div>
            </div>
            <form className="myform" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-20">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  {...register("email")}
                />
                <p className="text-danger">{errors.email?.message}</p>
              </div>
              <div className="form-group mb-20">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password")}
                />
                <p className="text-danger">{errors.password?.message}</p>
              </div>
              {serverError?.length > 0 &&
                serverError.map((item, index) => (
                  <p key={index} className="text-danger">
                    {item}
                  </p>
                ))}
              <div className="row">
                <div className="col-md-6 col-12">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      {...register("remember_me")}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="col-md-6 col-12 bn">Forgot password</div>
              </div>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="btn btn-block btn-primary btn-lg"
                >
                  <small>
                    <i className="far fa-user pr-2"></i>Sign In
                  </small>
                </button>
                <span onClick={onClickSignup}>
                  (Don&apos;t have an account?)
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
