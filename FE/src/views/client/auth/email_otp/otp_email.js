import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";
import { useRecovery } from "../send_email/RecoveryContext";
import { Helmet } from "react-helmet";

const OtpEmail = ({ email: initialEmail, otp, setPage }) => {
  const [timerCount, setTimer] = useState(120);
  const [OTPinput, setOTPinput] = useState(["", "", "", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.enteredEmail || initialEmail || "";
  console.log(userEmail);

  useEffect(() => {
    if (!userEmail) {
      toast.error("Please enter your email address", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/email");
      }, 1000);
    }
    const savedTimer = localStorage.getItem("otpTimer");

    if (savedTimer) {
      const timeLeft = parseInt(savedTimer, 10) - Math.floor(Date.now() / 1000);
      if (timeLeft > 0) {
        setTimer(timeLeft);
      } else {
        setDisable(false);
      }
    }

    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        const newTime = lastTimerCount - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          setDisable(false);
          localStorage.removeItem("otpTimer");
          return 0;
        }
        localStorage.setItem(
          "otpTimer",
          Math.floor(Date.now() / 1000) + newTime
        );
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [disable]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value) || value.length > 1) return;

    const newOTPinput = [...OTPinput];
    newOTPinput[index] = value;

    setOTPinput(newOTPinput);
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOTPinput = [...OTPinput];
    pasteData.forEach((char, index) => {
      newOTPinput[index] = char;
    });
    setOTPinput(newOTPinput);
  };

  const verifyOTP = () => {
    setIsLoading(true);
    const otpCode = OTPinput.join("");
    console.log("OTP code:", otpCode);

    axios
      .post(
        "http://103.72.96.123/api/optEmail",
        { otp: otpCode, email: userEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          toast.success("OTP verified successfully!", { autoClose: 1000 });
          setTimeout(() => {
            navigate("/forgot-pass", { state: { userEmail } });
            localStorage.removeItem("otpTimer");
          }, 1000);
        } else {
          toast.error(
            "The code you have entered is not correct, try again or re-send the link",
            { autoClose: 1000 }
          );
        }
      })
      .catch((error) => {
        console.error("There was an error verifying the OTP:", error);
        toast.error(
          "An error occurred while verifying the OTP. Please try again later.",
          { autoClose: 1000 }
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resendOTP = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://103.72.96.123/api/sendEmail",
        { email: userEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.info("OTP Resent!", { autoClose: 1000 });
        setDisable(true);
        setTimer(120);
      } else {
        toast.error("Failed to resend OTP", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("An error occurred while resending OTP", { autoClose: 1000 });
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <Helmet>
        <title>OTP Email</title>
      </Helmet>
      <div className="otp-form" style={{ marginTop: "-100px" }}>
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <span className="profile-info-author-title">
            Email Verification
          </span>

          <p>We have sent a code to your email {userEmail}</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            verifyOTP();
          }}
        >
          <div className="otp-inputs mb-5">
            {OTPinput.map((data, index) => (
              <input
                id={`otp-${index}`}
                key={index}
                maxLength="1"
                className="otp-input"
                type="text"
                value={data}
                onChange={(e) => handleChange(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={isLoading}
              />
            ))}
          </div>
          <div className="items-center flex flex-row  justify-center text-center">
              <button
                type="submit"
                className="buttonColorGreenItem me-3"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Account"}
              </button>
              <button
                type="button"
                className="btn buttonColorGayItem"
                disabled={disable || isLoading}
                onClick={resendOTP}
              >
                {disable ? `Wait for ${timerCount}s` : "Resend"}
              </button>
          </div>

          <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 mt-4">
            <p>Didn't receive the code?</p>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default OtpEmail;
