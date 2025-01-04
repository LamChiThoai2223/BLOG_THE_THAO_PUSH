import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IMAGES_CLEINT from "../../../assets/styles/client/images";
import { Helmet } from "react-helmet";
import { verifiedEmail, checkToken } from "../../../services/Users";

const VerifiedEmail = () => {
  const [status, setStatus] = useState("loading");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const token = params.get("token");
  const userId = params.get("userId");

  useEffect(() => {
    const verify = async () => {
      if (token && userId) {
        try {
          const isValidToken = await checkToken(token);
          if (isValidToken) {
            const response = await verifiedEmail(token, userId);
            console.log("Response:", response);
            setStatus("success");
          } else {
            setStatus("error");
          }
        } catch (error) {
          console.error("Verification error:", error);
          if (error.message === "Invalid token") {
            setStatus("error");
          } else {
            setStatus("error");
          }
        }
      } else {
        setStatus("error");
      }
    };

    verify();
  }, [token, userId, navigate]);

  return (
    <main>
      {status == "success" ? (
        <>
          <Helmet>
            <title>Email verified successfully</title>
          </Helmet>
          <section className="py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 mx-auto text-center">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={IMAGES_CLEINT.verified}
                    alt="Verified"
                    className="img-fluid"
                    width="350"
                    height="350"
                  />
                  <h1 className="mb-4 text-success">
                    Email verified successfully
                  </h1>
                  <Link to="/login" className="btn btn-outline-primary">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-5">
          <Helmet>
            <title>Email verification failed</title>
          </Helmet>
          <div className="container">
            <div className="row">
              <div className="col-lg-10 mx-auto text-center">
                <img
                  loading="lazy"
                  decoding="async"
                  src={IMAGES_CLEINT.failed}
                  alt="Verified"
                  className="img-fluid"
                  width="350"
                  height="350"
                />
                <h1 className="mb-4 text-danger">Email verification failed</h1>
                <Link to="/" className="btn btn-outline-primary">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default VerifiedEmail;
