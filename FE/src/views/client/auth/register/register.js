import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { checkEmailExists, checkPhoneExists, checkUsernameExists, register as registerUser, sendVerificationEmail } from "../../../../services/Users";
import { GetUserByUsername } from "../../../../services/Users";
import { apiUrl } from "../../../../config/Api";
import { Helmet } from "react-helmet";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleLogin } from "@react-oauth/google";
import { clientLogin, googleLogin } from "../../../../services/Auth/index";
import { uniqueId } from 'lodash';
import Loading from "../../../../components/loading";
const RegisterForm = () => {
  const {
    register,
    getValues,
    formState,
    setError,
    clearErrors,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);
  const [loading, setLoading] = useState(false);
  const handleSuccess = async (response) => {
    const { credential } = response;
    googleLogin(credential, (error, result) => {
      if (error) {
        console.error("Register Error:", error);
        setError("Login failed!");
      } else {
        const { token, user } = result;
        console.log("User Info:", result);

        // Lưu token và role vào cookie
        setCookie("token", token, { path: "/" });
        setCookie("role", user.role, { path: "/" });

        toast.success("Register successfully.", {
          toastId: uniqueId("toast-sucess"),
          containerId: "GlobalApplicationToast",
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });
  };

const handleError = (error) => {
  console.error('Login Error:', error);
  setError('Login failed!');
};

const submit = async (data) => {
  setLoading(true);
  try {
    await registerUser(data);
    const accountRegister = await GetUserByUsername(data.username);
    const userId = accountRegister?.data[0]?.user_id;

    if (userId && data.email) {
      try {
        await sendVerificationEmail(data.email, userId, data.username);
        toast.success("Registration successful! Please check your email to verify.", {
          autoClose: 1000,
        });
        navigate("/login");
      } catch (error) {
        toast.error("Failed to send verification email. Please try again later.");
      }
    }
  } catch (err) {
    if (err === "Invalid email.") {
      toast.error("The email address provided is invalid.", { autoClose: 1000 });
    } else {
      toast.error(err, { autoClose: 1000 });
    }
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="content">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="fform-block p-4 rounded shadow mt-5">
                  <div className="mb-5">
                    <h2 className="text-center">Register</h2>
                  </div>
                  <form onSubmit={handleSubmit(submit)} disabled={loading}>
                  {loading && <Loading message="Please wait..." />}
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        {...register("username", {
                          required: {
                            value: true,
                            message: "Username cannot be blank",
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9_]+$/,
                            message:
                              "Username cannot contain special characters",
                          },
                          validate: async (username) => {
                            if (username) {
                              const usernameExists = await checkUsernameExists(
                                apiUrl,
                                username
                              );
                              return (
                                !usernameExists || "Username is already taken"
                              );
                            }
                            return true;
                          },
                        })}
                      />
                      {formState?.errors?.username && (
                        <small className="text-danger">
                          {formState?.errors?.username?.message}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="full_name"
                        {...register("full_name", {
                          required: {
                            value: true,
                            message: "Full name cannot be blank",
                          },
                        })}
                      />
                      {formState?.errors?.full_name && (
                        <small className="text-danger">
                          {formState?.errors?.full_name?.message}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email cannot be blank",
                          },
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@(?=[a-zA-Z-]*[a-zA-Z])[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
                            message: "Invalid email format",
                          },
                          validate: async (email) => {
                            if (email) {
                              const emailExists = await checkEmailExists(
                                apiUrl,
                                email
                              );
                              return !emailExists || "Email is already taken";
                            }
                            return true;
                          },
                        })}
                      />
                      {formState?.errors?.email && (
                        <small className="text-danger">
                          {formState?.errors?.email?.message}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="text">Phone</label>
                      <input
                        type="phone"
                        className="form-control"
                        id="phone"
                        {...register("phone", {
                          required: {
                            value: true,
                            message: "phone cannot be blank",
                          },
                          pattern: {
                            value: /^0[0-9]{9}$/,
                            message:
                              "The phone number must be a number, ivalid phone number, must start with 0 and have 10 digits",
                          },
                          validate: async (phone) => {
                            if (phone) {
                              const phoneExists = await checkPhoneExists(
                                apiUrl,
                                phone
                              );
                              return !phoneExists || "Phone is already taken";
                            }
                            return true;
                          },
                        })}
                      />
                      {formState?.errors?.phone && (
                        <small className="text-danger">
                          {formState?.errors?.phone?.message}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Password cannot be blank",
                          },
                          minLength: {
                            value: 6,
                            message: "Password must have at least 6 characters",
                          },
                          pattern: {
                            value:
                              /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/,
                            message:
                              "Password must contain at least one capital letter and one special character",
                          },
                        })}
                      />
                      {formState?.errors?.password && (
                        <small className="text-danger">
                          {formState?.errors?.password?.message}
                        </small>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        {...register("confirmpassword", {
                          required: {
                            value: true,
                            message: "confirm password cannot be blank",
                          },
                          validate: (confirmpassword) => {
                            const password = getValues()?.password;
                            if (confirmpassword === password) {
                              return true;
                            }

                            return "The confirmation password does not match the password";
                          },
                        })}
                      />
                      {formState?.errors?.confirmpassword && (
                        <small className="text-danger">
                          {formState?.errors?.confirmpassword?.message}
                        </small>
                      )}
                    </div>
                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="btn buttonColorGreenItem w-100"
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  <span className="d-block text-center my-4 text-muted">
                    Do you already have an account ?
                  </span>
                  <div className="d-flex  justify-content-center">
                    <div className="mb-4 me-3">
                      <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                      />
                    </div>
                    <div className="text-center">
                      <button
                        className="btn buttonColorGreenBgItem"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
