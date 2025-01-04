import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  console.log(userEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const { newPassword } = data;

    try {
      const response = await axios.post(
        "http://localhost:4200/api/forgot-password",
        {
          email: userEmail,
          newPassword,
        }
      );

      if (response.data.status === "success") {
        toast.success("Password changed successfully!", { autoClose: 1000 });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(response.data.message || "Error changing password", {
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.error("Server error:", err);
      toast.error("Internal server error", { autoClose: 1000 });
    }
  };

  const newPasswordValue = watch("newPassword");

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Hiển thị hộp thoại xác nhận khi rời trang
    };

    const handleBackButton = () => {
      if (
        !window.confirm(
          "Bạn có chắc chắn muốn hủy quá trình đặt lại mật khẩu không?"
        )
      ) {
        navigate(location.pathname); // Điều hướng về trang hiện tại nếu hủy
      }
    };

    // Lắng nghe sự kiện popstate và beforeunload
    window.addEventListener("popstate", handleBackButton);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate, location.pathname]);

  return (
    <div className="content">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 contents">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="form-block mt-5 p-4 shadow ">
                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                    <span className="profile-info-author-title">
                      Forgot Password
                    </span>

                    <p className="mb-4">
                      Remember or save the password after changing !!
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group mb-3">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        {...register("newPassword", {
                          required: "New password is required",
                          minLength: {
                            value: 6,
                            message:
                              "New password must be at least 6 characters",
                          },
                        })}
                      />
                      {errors.newPassword && (
                        <span className="text-danger">
                          {errors.newPassword.message}
                        </span>
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
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === newPasswordValue ||
                            "Confirm password does not match new password",
                        })}
                      />
                      {errors.confirmPassword && (
                        <span className="text-danger">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </div>

                    <div className="text-center mt-4">
                      <input
                        type="submit"
                        value="Confirm"
                        className="btn w-100 buttonColorGreenItem"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
