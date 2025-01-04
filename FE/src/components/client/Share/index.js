import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { apiUrl } from "../../../config/Api";
import Cookies from "js-cookie";
import { getUserGoogleProfile, getUserProfile } from "../../../services/Auth";
import { shareBlog } from "../../../services/Share";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ShareBlog = ({ blogUrl, blogTitle, blogContent, blogImg }) => {
  const { id } = useParams();
  const [user_id, setUserId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleShareBlog = () => {
    const token = Cookies.get("token");

    if (!token) {
      setError("You must be logged in to share the blog.");
      return navigate("/login");
    }
    Promise.allSettled([getUserProfile(token), getUserGoogleProfile(token)])
      .then((results) => {
        const userProfileResult = results.find(
          (result) => result.status === "fulfilled" && result.value.username
        );

        if (userProfileResult) {
          const user = userProfileResult.value;
          setUserId(user.user_id || "user_id");
          shareBlog(id, user.user_id).catch((err) => {
            console.error("Failed to record blog view:", err);
          });
        } else {
          throw new Error("Failed to fetch user info");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user info:", err);
        setError("Failed to fetch user info. Please log in again.");
        navigate("/login");
      });
  };
  const handleLoginRedirect = () => {
    toast.info("Please log in to your account!!", { autoClose: 1000 });
    navigate("/login");
  };
  const token = Cookies.get("token");
  return (
    <>
      <Helmet>
        <meta property="og:title" content={blogTitle} />
        <meta property="og:description" content={blogContent} />
        <meta property="og:image" content={blogImg} />
        <meta property="og:url" content={`${apiUrl}/${blogUrl}`} />
      </Helmet>

      {token ? (
        <FacebookShareButton
          url={`${apiUrl}/${blogUrl}`}
          quote={blogTitle}
          hashtag="#Sportblog"
          onClick={handleShareBlog}
        >
          <button
            type="button"
            className="btn   me-2 buttonSendChat d-flex align-items-center ms-sm-3"
            style={{
              fontSize: "1.2rem",
              padding: "5px 10px",
            }}
          >
            <FacebookIcon size={28} round={true} />
            <div className="ms-2 textSend">Share with facebook</div>
          </button>
        </FacebookShareButton>
      ) : (
        <button
          type="button"
          className="btn btn-outline-primary d-flex align-items-center ms-sm-3"
          style={{
            fontSize: "1.2rem",
            padding: "5px 10px",
          }}
          onClick={handleLoginRedirect}
        >
          <FacebookIcon size={28} round={true} />
          <span className="p-sm-1">Share</span>
        </button>
      )}
    </>
  );
};

export default ShareBlog;
