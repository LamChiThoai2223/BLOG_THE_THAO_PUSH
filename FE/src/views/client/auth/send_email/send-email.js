import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Helmet } from "react-helmet";

const SendEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [userEmails, setUserEmails] = useState([]);

  useEffect(() => {
    const getEmail = async () => {
      try {
        const response = await axios.get("http://103.72.96.123/api/email");
        setUserEmails(response.data.data); // Lưu danh sách email vào state
        console.log("Email của người dùng:", response.data.data);
      } catch (err) {
        console.error("Error fetching email data:", err);
      }
    };
    getEmail();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Email nhập vào:", enteredEmail);

    const emailExists = userEmails.some((user) => user.email === enteredEmail);

    if (emailExists) {
      try {
        const response = await fetch("http://103.72.96.123/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: enteredEmail }),
        });

        const responseData = await response.json();
        if (response.ok) {
          toast.clearWaitingQueue();
          toast.success("Email sent successfully!", { autoClose: 1000 });
          setTimeout(() => {
            navigate("/email-otp", { state: { enteredEmail } });
          }, 1500);
        } else {
          toast.error("Failed to send email", { autoClose: 1000 });
        }
      } catch (error) {
        toast.error("An error occurred while sending email", {
          autoClose: 1000,
        });
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Email does not exist in the system", { autoClose: 1000 });
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container vh-100 d-flex justify-content-center align-items-center"
      style={{ marginTop: "-65px" }}
    >
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <ToastContainer />
      <div className="row w-100 shadow-lg p-4 bg-white rounded">
        <div className="col-md-6 d-none d-md-flex align-items-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Forgot Password"
          />
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center mb-4">Reset Your Password</h3>

            <div className="form-group mb-3">
              <label htmlFor="email">Email Address</label> <span className="text-danger fs-5">*</span>
              <input
                type="email"
                className={`form-control mt-3 mb-4 ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="Enter your email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div
              className="text-end mb-3 forgotPassText"
              onClick={() => navigate("/email")}
            >
              You don't remember emails?
            </div>

            <button
              type="submit"
              className="btn buttonColorGreenItem w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {" Sending..."}
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
