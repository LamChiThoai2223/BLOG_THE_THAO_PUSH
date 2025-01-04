import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { apiUrl } from "../../../../config/Api";
import {
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
  fetchFollowersAll,
  fetchFollowingAll,
} from "../../../../services/follow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterAuthorModal } from '../../../Dialog';
import { confirmAuthor, sendEmailRegisterAuthor } from '../../../../services/Users';
import {
  getUserProfile,
  getUserGoogleProfile,
  logout,
  handleLogout,
} from "../../../../services/Auth";
import { useForm } from "react-hook-form";
import { Button, Nav, Tab } from "react-bootstrap";
import { fetchBlogUser, fetchAllBlogUser } from "../../../../services/Blog";
import Paginator from "../../../admin/Paginator";
import { Spinner } from "react-bootstrap";
import Cookies from "js-cookie";

const Activity = () => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [user, setUser] = useState({});
  const [cookies, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [blogAllData, setBlogAllData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [followersAllData, setFollowersAllData] = useState([]);
  const [followingAllData, setFollowingAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [followersCurrentPage, setFollowersCurrentPage] = useState(1);
  const [followersLastPage, setFollowersLastPage] = useState(1);
  const [followingCurrentPage, setFollowingCurrentPage] = useState(1);
  const [followingLastPage, setFollowingLastPage] = useState(1);
  const [isFollowingUpdated, setIsFollowingUpdated] = useState(false);
  const [isBlogUpdated, setIsBlogUpdated] = useState(false);
  const [isFollowingMap, setIsFollowingMap] = useState({});
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const currentUser = user;
  const location = useLocation();

  useEffect(() => {
    if (cookies.token) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [cookies.token, navigate]);

  const fetchUser = async () => {
    try {
      let data;
      try {
        data = await getUserProfile(cookies.token);
      } catch (e) {
        console.log(
          "Đăng nhập thường không thành công, thử đăng nhập Google..."
        );
        data = await getUserGoogleProfile(cookies.token);
      }

      if (data) {
        setUser(data);
        setValue("full_name", data.full_name);
        setValue("email", data.email);
        setEmail(data.email || "");
        setValue("phone", data.phone);
        setValue("address", data.address);
        setValue("bio", data.bio);
        setValue(data.image_user || "");

        await fetchAllBlogUser(data.user_id, setBlogAllData, setError);

        const fetchFollowersAllData = await fetchFollowersAll(
          apiUrl,
          data.user_id,
          setFollowersAllData,
          setError
        );
        setFollowersAllData(fetchFollowersAllData.data);

        const fetchFollowingAllData = await fetchFollowingAll(
          apiUrl,
          data.user_id,
          setFollowingAllData,
          setError
        );
        setFollowingAllData(fetchFollowingAllData.data);

        setLoading(false);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      setError("Lỗi khi lấy dữ liệu người dùng.");
      setLoading(false);
      navigate("/login");
    }
  };



  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await logout(token);
      }
      Cookies.remove("token", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("token", { path: "/admin" });
      Cookies.remove("role", { path: "/admin" });
      toast.success("Log Out successful!", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error during logout:", error);
      setError("Logout failed. Please try again.");
    }
  };

  const handleRegisterAuthor = async () => {
    console.log(user);
    console.log(user.user_id);


    if (user) {
      try {
        const result = await confirmAuthor(apiUrl, user.user_id, reason, setUser);
        if (result.success) {
          sendEmailRegisterAuthor(user.username, user.email, reason,
            () => {
              toast.success('Submitted author registration successfully!');
            },
            (error) => {
              toast.error(`Failed to send email: ${error}`);
            }
          );
          toast.success('Registered as author successfully!');
          setShowRegisterModal(false);
        }
      } catch (error) {
        toast.error(`Failed to register as author: ${error.message}`);
      }
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading...</p>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="col-md-4">
      <div
        className="profile-info-left profile-info-profile pt-4"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div className="profile-sidebar">
          <div className="profile">
            <img
              alt="Profile of user"
              className="profile-img"
              src={
                user.image_user ||
                "https://bootdey.com/img/Content/avatar/avatar1.png"
              }
              width="80"
              height="80"
            />
            <div className="profile-info">
              <h2 className="profile-name">{user.full_name}</h2>
              <p className="profile-points">
                <i className="fas fa-coins m-1"></i>{" "}
                {Array.isArray(blogAllData)
                  ? blogAllData.filter((blog) => blog.is_delete === 0).length
                  : 0}{" "}
                Posts
              </p>
            </div>
          </div>

          <div
            className={`profile-card ${(() => {
              const postCount = Array.isArray(blogAllData)
                ? blogAllData.filter((blog) => blog.is_delete === 0).length
                : 0;

              if (postCount >= 150) return "crystal";
              if (postCount >= 50) return "diamond";
              if (postCount >= 5) return "gold";
              return "silver";
            })()}`}
          >
            <h3 className="card-title">
              <i className="fas fa-star m-1"></i>
              {(() => {
                const postCount = Array.isArray(blogAllData)
                  ? blogAllData.filter((blog) => blog.is_delete === 0).length
                  : 0;

                if (postCount >= 150) return "CRYSTAL";
                if (postCount >= 50) return "DIAMOND";
                if (postCount >= 5) return "GOLD";
                return "SILVER";
              })()}
            </h3>
            <div className="progress-bar"></div>
            <p className="card-description">
              {(() => {
                const postCount = Array.isArray(blogAllData)
                  ? blogAllData.filter((blog) => blog.is_delete === 0).length
                  : 0;

                if (postCount < 20)
                  return `Need to contribute ${20 - postCount
                    } more articles to advance.`;
                if (postCount < 50)
                  return `Need to contribute ${50 - postCount
                    } more articles to advance.`;
                if (postCount < 150)
                  return `Need to contribute ${150 - postCount
                    } more articles to advance.`;
                return "You have reached the highest rank!";
              })()}
            </p>
            <div className="card-info text-dark mt-4">
              <div className="info-row">
                <span>Member no.</span>
                <span>Valid till</span>
              </div>
              <div className="info-row">
                <span>179-486-153</span>
                <span>
                  {new Date(
                    new Date(user.created_at).setDate(
                      new Date(user.created_at).getDate() + 365
                    )
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <ul className="profile-menu">
            <li className={location.pathname === "/profile" ? "active" : ""}>
              <Link to="/profile" className="menu-link">
                <i className="fas fa-chart-line m-2"></i> Activity Overview
              </Link>
            </li>

            <li
              className={
                location.pathname === "/profile/account" ? "active" : ""
              }
            >
              <Link to="/profile/account" className="menu-link">
                <i className="fas fa-user m-2"></i> Personal Information
              </Link>
            </li>

            {(user.role === "admin" || user.role === "author") ? (
              <li
                className={
                  location.pathname === "/profile/blog" ? "active" : ""
                }
              >
                <Link to="/profile/blog" className="menu-link">
                  <i className="fas fa-pen m-2"></i> Create New Post
                </Link>
              </li>
            ) :
              <li className="">
                <a className="menu-link" onClick={() => setShowRegisterModal(true)}>
                  <i className="fas fa-pen m-2"></i>Register as an author</a>
              </li>

            }

            <li
              className={
                location.pathname === "/profile/change-password" ? "active" : ""
              }
            >
              <Link to="/profile/change-password" className="menu-link">
                <i className="fas fa-lock m-2"></i> Change Password
              </Link>
            </li>

            <li
              className={
                location.pathname === "/profile/nofitications" ? "active" : ""
              }
            >
              <Link to="/profile/nofitications" className="menu-link">
                <i className="fas fa-bell m-2"></i> My Notifications
              </Link>
            </li>

            <li
              className={
                location.pathname === "/profile/message" ? "active" : ""
              }
            >
              <Link to="/profile/message" className="menu-link">
                <i className="fas fa-headset m-2"></i> Message
              </Link>
            </li>

            <li>
              <Link className="menu-link" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt m-2"></i> Logout
              </Link>
            </li>

            <li
              className={
                location.pathname === "/profile/settings" ? "active" : ""
              }
            >
              <Link to="/profile/settings" className="menu-link">
                <i className="fas fa-cog m-2"></i> Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <RegisterAuthorModal
        show={showRegisterModal}
        handleClose={() => setShowRegisterModal(false)}
        handleRegister={handleRegisterAuthor}
        reason={reason}
        setReason={setReason}
      />
    </div>
  );
};

export default Activity;
