import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { uniqueId } from "lodash";
import { changePassword, logout } from "../../../../services/Auth";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import ProfileSidebar from "../../../../components/client/auth/profile/sidebar";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await changePassword(data.oldPassword, data.newPassword);
      handleLogout();
      setError("");
    } catch (err) {
      toast.error(`Fail: Changed Password Fail.`, {
        toastId: uniqueId("toast-erorr"),
        containerId: "GlobalApplicationToast",
      });
      setError(err.message || "An error occurred while changing the password!");
      setSuccess("");
    }
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await logout(token); // Gửi token khi logout
      }
      Cookies.remove("token", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("token", { path: "/admin" });
      Cookies.remove("role", { path: "/admin" });
      toast.success("Changed Password successful!", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error during logout:", error);
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <div className="author-client user-profile">
        <div className="row">
          <ProfileSidebar />
          <div className="col-md-8 backG-proflie">
            <span className="profile-info-author-title">Change Password</span>
            <div className="">
              <div className="content">
                <div className="">
                  <div className="row justify-content-center">
                    <div className="col-md-12 contents">
                      <div className="row justify-content-center">
                        <div className="col-md-12">
                          <div className="form-block p-4 rounded shadow mt-3">
                            {/* <div className="mb-4">
                              <h3>
                                Change Password <strong>Colorlib</strong>
                              </h3>
                              <p className="mb-4">
                                Make sure to enter the correct old password and
                                do not share the new password with strangers.
                              </p>
                            </div> */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="form-group first">
                                <label htmlFor="oldPassword">
                                  Old Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="oldPassword"
                                  {...register("oldPassword", {
                                    required: "Old Password is required",
                                  })}
                                />
                                {errors.oldPassword && (
                                  <p className="text-danger">
                                    {errors.oldPassword.message}
                                  </p>
                                )}
                              </div>
                              <div className="form-group">
                                <label htmlFor="newPassword">
                                  New Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="newPassword"
                                  {...register("newPassword", {
                                    required: "New Password is required",
                                  })}
                                />
                                {errors.newPassword && (
                                  <p className="text-danger">
                                    {errors.newPassword.message}
                                  </p>
                                )}
                              </div>
                              <div className="form-group last mb-4">
                                <label htmlFor="confirmPassword">
                                  Confirm New Password
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="confirmPassword"
                                  {...register("confirmPassword", {
                                    validate: (value) =>
                                      value === getValues("newPassword") ||
                                      "Passwords do not match",
                                  })}
                                />
                                {errors.confirmPassword && (
                                  <p className="text-danger">
                                    {errors.confirmPassword.message}
                                  </p>
                                )}
                              </div>
                              {error && <p className="text-danger">{error}</p>}
                              {success && (
                                <p className="text-success">{success}</p>
                              )}
                              <div
                                className="text-end mb-3 forgotPassText"
                                onClick={() => navigate("/email")}
                              >
                                Forgot password here.?
                              </div>

                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="btn buttonColorGayItem"
                                  onClick={() => navigate(-1)}
                                >
                                  Cancel
                                </button>
                                <input
                                  type="submit"
                                  value="Confirm"
                                  className="btn btn-pill buttonColorGreenItem"
                                />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
