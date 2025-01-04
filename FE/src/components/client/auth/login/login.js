import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { clientLogin, googleLogin } from "../../../../services/Auth/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { uniqueId } from "lodash";
import axios from "axios";
import { getUserProfile } from "../../../../services/Auth";
import { Helmet } from "react-helmet";

const ClientLogin = () => {
  const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {}, [removeCookie, navigate]);

  const onSubmit = async (data) => {
    const { username, password } = data;
    console.log("Attempting to log in with:", { username, password });

    clientLogin(username, password, async (error, response) => {
      if (error) {
        setError(error);
        toast.error("Login failed!");
      } else {
        const { token, user } = response;
        setCookie("token", token, { path: "/" });
        setCookie("role", user.role, { path: "/" });
        console.log(user);
        toast.success("Login successful!", { autoClose: 1000 });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });
  };

  const handleSuccess = async (response) => {
    const { credential } = response;
    googleLogin(credential, (error, result) => {
      if (error) {
        console.error("Login Error:", error);
        setError("Login failed!");
      } else {
        const { token, user } = result;
        console.log("User Info:", result);

        // Lưu token và role vào cookie
        setCookie("token", token, { path: "/" });
        setCookie("role", user.role, { path: "/" });

        // Thông báo đăng nhập thành công
        toast.success("Login successfully.", {
          toastId: uniqueId("toast-sucess"),
          containerId: "GlobalApplicationToast",
        });

        // Chuyển hướng tới trang chính sau khi đăng nhập thành công
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });
  };

  const handleError = (error) => {
    console.error("Login Error:", error);
    setError("Login failed!");
  };

  return (
    <div className="content">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="form-block p-4 rounded shadow mt-5">
                  <h2 className="text-center mb-4">Login</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-3">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.username ? "is-invalid" : ""
                        }`}
                        id="username"
                        {...register("username", {
                          required: "Username is required",
                          validate: (value) =>
                            /^[a-zA-Z0-9]+$/.test(value) ||
                            "Username must be alphanumeric and contain no spaces",
                        })}
                      />
                      {errors.username && (
                        <div className="invalid-feedback">
                          {errors.username.message}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        id="password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="text-end mb-3 forgotPassText" onClick={() => navigate("/email")}>
                        Forgot password?
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn buttonColorGreenItem w-100"
                      >
                        Login
                      </button>
                    </div>
                    <span className="d-block text-center my-3 text-muted">
                      Or login with
                    </span>
                    <div className="d-flex  justify-content-center">
                      <div className="mb-4 me-3">
                        <GoogleLogin
                          onSuccess={handleSuccess}
                          onError={handleError}
                        />
                      </div>
                        <div className="text-center">
                          <button className="btn buttonColorGreenBgItem" onClick={() => navigate("/register")}>
                            Register now
                          </button>
                        </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        autoClose={1000}
        closeOnClick
        pauseOnHover
        containerId="GlobalApplicationToast"
      />
    </div>
  );
};

export default ClientLogin;
