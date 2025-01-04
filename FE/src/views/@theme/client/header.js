import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import IMAGES_CLEINT from "../../../assets/styles/client/images";
import IMAGES_User from "../../../assets/images/users/nenTang.jpg";
import { fetchCategories } from "../../../services/Category";
import { formatDistanceToNow } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../../../config/Api";
import Cookies from "js-cookie";
import { Accordion, Button, Card } from "react-bootstrap";
import Nofiti from "../../../assets/images/background/emptyNotification.svg";
import LogoAdmin from "../../../assets/images/logo.jpg";

import {
  getUserGoogleProfile,
  getUserProfile,
  logout,
} from "../../../services/Auth";
import { searchBlogs, searchBlogsWithTitle } from "../../../services/Blog";
import {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
  hideNotification,
  turnOffAllNotifications,
  fetchAllNotifications,
} from "../../../services/Notification";
import { fetchUserDetails } from "../../../services/Users/index";
import { fetchBlogDetails } from "../../../services/Blog";
import { Url } from "../../../config/Api";
import Loading from "../../../components/loading";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const hideSearchPaths = [
    "/change-password",
    "/forgot-pass",
    "/register",
    "/login",
    "/profile",
    "/blog/detail",
    "/blog/create",
    "/author",
  ];
  const shouldHideSearch = hideSearchPaths.includes(location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [error, setError] = useState("");
  const [searchKeywords, setSearchKeywords] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [BlogNotification, setBlogNotification] = useState([]);
  const [NotificationData, setNotificationData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [userProfile, setUserProfile] = useState("");
  const [notifiAllData, setNotifiAllData] = useState("");
  const [filteredNotifi, setfilteredNotifi] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const pageSize = 10;
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  useEffect(() => {
    setSuggestions([]);
    setSearchKeywords("");
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (token) {
      setIsLoggedIn(true);

      // Đặt hẹn giờ 30 phút để tự động xóa token và chuyển hướng về trang đăng nhập
      const logoutTimer = setTimeout(() => {
        Cookies.remove("token", { path: "/" });
        Cookies.remove("role", { path: "/" });
        navigate("/login");
      }, 1800000); // 30 phút = 1800000 milliseconds

      // Lấy thông tin người dùng từ API
      Promise.allSettled([getUserProfile(token), getUserGoogleProfile(token)])
        .then((results) => {
          const userProfileResult = results.find(
            (result) => result.status === "fulfilled" && result.value.username
          );
          if (userProfileResult) {
            const user = userProfileResult.value;
            setUserProfile(user);
            setUsername(user.username || "Người dùng");
            setUserAvatar(user.image_user || "");
            localStorage.setItem("userProfile", JSON.stringify(user));
          } else {
            throw new Error("Failed to fetch user info");
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err);
          setError("Failed to fetch user info. Please log in again.");
          navigate("/login");
        });

      // Dọn dẹp timeout khi component unmount hoặc khi token thay đổi
      return () => clearTimeout(logoutTimer);
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setUserAvatar("");
    }
  }, [navigate]);

  useEffect(() => {
    fetchCategories(apiUrl, 1, setCategories, setError);
  }, [apiUrl]);

  useEffect(() => {
    if (userProfile && userProfile.user_id) {
      fetchNotification(page);
    }
  }, [userProfile, page]);

  const fetchNotification = async (page) => {
    try {
      // Tải thông báo của trang hiện tại
      const notifications = await fetchNotifications(
        apiUrl,
        userProfile.user_id,
        page,
        setBlogNotification,
        setError
      );

      const dataNotification = notifications.data;

      // Tải tất cả thông báo để lọc thông báo chưa đọc và chưa ẩn
      const notifiAllData = await fetchAllNotifications(
        apiUrl,
        userProfile.user_id,
        setNotifiAllData,
        setError
      );

      const dataAllNotification = notifiAllData.data;
      const filteredNotifications = dataAllNotification.filter(
        (notifiData) => notifiData.is_read === 0 && notifiData.is_hidden === 0
      );

      setfilteredNotifi(filteredNotifications.length);

      // Kiểm tra nếu không còn dữ liệu để tải thêm
      if (!dataNotification || dataNotification.length < pageSize) {
        setHasMore(false);
        console.log("Không còn dữ liệu để tải thêm.");
      }

      // Lấy danh sách blog_id và author_id từ thông báo
      const blogIds = [];
      const authorIds = [];

      dataNotification.forEach((notification) => {
        if (notification.blog_id) blogIds.push(notification.blog_id);
        if (notification.author_id) authorIds.push(notification.author_id);
      });

      // Lấy chi tiết blog và tác giả
      const blogDetails = await Promise.all(
        blogIds.map((id) => fetchBlogDetails(id))
      );

      const authorDetails = await Promise.all(
        authorIds.map((id) => fetchUserDetails(id))
      );

      // Tạo mảng hợp nhất của dữ liệu thông báo với chi tiết blog và tác giả
      const mergedNotifications = dataNotification.map((notifi, index) => ({
        ...notifi,
        blogDetails: blogDetails[index] || {},
        authorDetails: authorDetails[index] ? authorDetails[index].data : {},
      }));

      // Cập nhật cả NotificationData và BlogNotification
      setNotificationData((prevData) => {
        const allData = [...prevData, ...mergedNotifications];
        return allData.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i // Loại bỏ bản ghi trùng lặp
        );
      });

      setBlogNotification((prevBlogData) => [...prevBlogData, ...blogDetails]);

      // Cập nhật thông tin tác giả
      const authorInfo = authorDetails.map((author) => author.data);
      setAuthorData((prevAuthorData) => [...prevAuthorData, ...authorInfo]);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setError("Có lỗi xảy ra khi tải thông báo. Vui lòng thử lại sau.");
    }
  };
  const loadMoreNotifications = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleMarkAsRead = async (notificationId, blogId) => {
    try {
      const response = await markNotificationAsRead(apiUrl, notificationId);
      setNotificationData((prevData) => {
        const updatedData = prevData.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: 1 }
            : notification
        );

        return updatedData;
      });
      navigate(`/blog/detail/${blogId}`);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const turnOffAllNotifi = async (userId, authorId) => {
    try {
      const response = await turnOffAllNotifications(apiUrl, userId, authorId);
      await fetchNotification(1);
      toast.success("Turn off all notifications successfully!", {
        autoClose: 1000,
      });
      console.log(response);
    } catch (error) {
      console.error("Turn off all failure notifications:", error);
      toast.error("Turn off all failure notifications!", { autoClose: 1000 });
    }
  };

  const handleHideNotification = async (notificationId) => {
    try {
      const response = await hideNotification(apiUrl, notificationId);

      toast.success("Hide this message successfully!", { autoClose: 1000 });
      setNotificationData((prevData) => {
        const updatedData = prevData.filter(
          (notification) => notification.id !== notificationId
        );
        return updatedData;
      });
    } catch (error) {
      console.error("Failed to hide notification:", error);
      toast.error("Hide this message failed!", { autoClose: 1000 });
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
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      setError("Logout failed. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeywords.trim()) {
      searchBlogs(apiUrl, searchKeywords, setSearchResults, setError);
      navigate(`/blog/search?keywords=${encodeURIComponent(searchKeywords)}`);
    }
  };

  useEffect(() => {
    if (searchKeywords.trim()) {
      searchBlogsWithTitle(apiUrl, searchKeywords, setSuggestions, setError);
    }
  }, [searchKeywords]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchKeywords(query);

    if (query.trim()) {
      searchBlogsWithTitle(apiUrl, query, setSuggestions, setError);
    } else {
      setSuggestions([]);
    }
  };

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <header className="navigation">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light px-0">
          <Link className="navbar-brand order-1" to="/">
            <img
              loading="preload"
              decoding="async"
              className="logo-icon"
              src={LogoAdmin}
              alt="Reporter Hugo"
              width="80px"
              height="40px"
            />
            <span className="logo-text h3">POSTNEST</span>
          </Link>
          <div className="navbar-actions order-3 ml-0 ml-md-4">
            <button
              aria-label="navbar toggler"
              className="navbar-toggler border-0"
              type="button"
              data-toggle="collapse"
              data-target="#navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end text-center order-lg-2 order-4"
            id="navigation"
          >
            {!shouldHideSearch && (
              <div className="search-wrapper d-flex justify-content-center align-items-center w-100">
                <form
                  onSubmit={handleSearch}
                  className="search order-lg-3 order-md-2 order-3 w-100"
                  style={{ maxWidth: "700px" }}
                >
                  <div style={{ position: "relative", width: "100%" }}>
                    <button
                      type="submit"
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        border: "none",
                        background: "none",
                        padding: 0,
                        cursor: "pointer",
                        color: "#888",
                      }}
                    >
                      <i
                        className="bi bi-search"
                        style={{
                          fontSize: "18px",
                        }}
                      ></i>
                    </button>
                    <input
                      id="search-query"
                      name="s"
                      type="search"
                      placeholder="Sports news, football information, latest articles...."
                      autoComplete="off"
                      className="form-control"
                      style={{
                        height: "45px",
                        borderRadius: "8px",
                        paddingRight: "45px",
                        paddingLeft: "15px",
                        width: "100%",
                        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
                      }}
                      value={searchKeywords}
                      onChange={handleInputChange}
                    />
                    {suggestions.length > 0 && (
                      <ul
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          width: "100%",
                          background: "white",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          borderRadius: "8px",
                          zIndex: 10,
                          padding: 0,
                          margin: 0,
                          listStyle: "none",
                          maxHeight: "400px",
                          overflowY: "auto",
                          scrollbarWidth: "thin",
                          scrollbarColor: "#888 #f1f1f1",
                        }}
                      >
                        {suggestions.map((suggestion) => (
                          <li
                            class="suggestion-search"
                            key={suggestion.id}
                            style={{
                              padding: "10px 15px",
                              borderBottom: "1px solid #eee",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              navigate(`/blog/detail/${suggestion.blog_id}`);
                              setSuggestions([]);
                              setSearchKeywords("");
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                              }}
                            >
                              <img
                                alt="find"
                                src={suggestion.image}
                                style={{
                                  width: "60px",
                                  height: "50px",
                                  borderRadius: "4px",
                                  objectFit: "cover",
                                }}
                              />
                              <div
                                style={{
                                  flex: 1,
                                  textAlign: "left",
                                }}
                              >
                                {suggestion.title}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    {suggestions.length == 0 && searchKeywords != "" && (
                      <ul
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          width: "100%",
                          background: "white",
                          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          borderRadius: "8px",
                          zIndex: 10,
                          padding: 0,
                          margin: 0,
                          listStyle: "none",
                          maxHeight: "400px",
                          overflowY: "auto",
                          scrollbarWidth: "thin",
                          scrollbarColor: "#888 #f1f1f1",
                        }}
                      >
                        <li
                          class="suggestion-search"
                          style={{
                            padding: "10px 15px",
                            borderBottom: "1px solid #eee",
                            cursor: "pointer",
                          }}
                        >
                          <h4 className="text-center">
                            No related blogs found
                          </h4>
                        </li>
                      </ul>
                    )}
                  </div>
                </form>
              </div>
            )}
            <div className="d-flex align-items-center">
              {isLoggedIn ? (
                <>
                  <div className="me-3">
                    <div
                      className="dropdown"
                      onMouseEnter={() => setMenuVisible(true)}
                      onMouseLeave={() => setMenuVisible(false)}
                    >
                      <div
                        className="notifier new"
                        onClick={() => {
                          window.location.href = `${Url}/profile/nofitications`;
                        }}
                      >
                        <span className="bell fa-regular fa-bell"></span>
                        {filteredNotifi > 0 && (
                          <div className="badge">
                            {filteredNotifi > 9 ? "9+" : filteredNotifi}
                          </div>
                        )}
                      </div>

                      {isMenuVisible && (
                        <div className="notification-card">
                          <div className="container">
                            <div className="header">
                              <h2>Notifications</h2>
                            </div>
                            <div
                              className="row"
                              style={{ maxHeight: "530px", overflowY: "auto" }}
                            >
                              {Array.isArray(NotificationData) &&
                              NotificationData.length > 0 ? (
                                NotificationData.map((notifiData) => {
                                  if (
                                    notifiData &&
                                    notifiData.is_hidden === 0
                                  ) {
                                    const blogDetails =
                                      notifiData.blogDetails || {};
                                    const blogNotifi = blogDetails.data || [];

                                    let blogNotifiTitle = "";
                                    let blogNotifiImage = "";
                                    let blogNotifiId = "";

                                    blogNotifi.forEach((notifiData) => {
                                      blogNotifiTitle = notifiData.title;
                                      blogNotifiImage = notifiData.image;
                                      blogNotifiId = notifiData.blog_id;
                                    });

                                    const authorDetails =
                                      notifiData.authorDetails || {};

                                      const authorUsername = capitalizeFirstLetter(authorDetails.username);

                                      if (notifiData.notification_type === "comment") {
                                        blogNotifiTitle = `${authorUsername} commented on your post`;
                                      }
                                
                                      if (notifiData.notification_type === "message") {
                                        blogNotifiTitle = `${authorUsername} has sent you a message`;
                                        blogNotifiTitle += `: ${notifiData.content}`;
                                      }

                                    return (
                                      <div
                                        className="notification"
                                        key={notifiData.id}
                                      >
                                        {notifiData.is_read === 0 ? (
                                          <span className="isRead"></span>
                                        ) : (
                                          <span className="read"></span>
                                        )}
                                        <Link
                                          to={`${Url}/author/${authorDetails.user_id}`}
                                          className="authorImgae"
                                        >
                                          <img
                                            alt="User Avatar"
                                            src={
                                              authorDetails.image_user ||
                                              IMAGES_User
                                            }
                                            width="40"
                                            height="40"
                                          />
                                        </Link>
                                        <div
                                          className="content"
                                          onClick={() =>
                                            handleMarkAsRead(
                                              notifiData.id,
                                              blogNotifiId
                                            )
                                          }
                                        >
                                          <p>
                                            {blogNotifiTitle ||
                                              "No title available"}
                                          </p>
                                          <div className="time">
                                            <span>
                                              {notifiData.created_at ? (
                                                formatDistanceToNow(
                                                  new Date(
                                                    notifiData.created_at
                                                  ),
                                                  {
                                                    addSuffix: true,
                                                  }
                                                )
                                              ) : (
                                                <span>Invalid time</span>
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                        <Link
                                          to={`${Url}/blog/detail/${blogNotifiId}`}
                                        >
                                          <div className="thumbnail">
                                            <img
                                              alt="Thumbnail"
                                              className="me-1"
                                              src={
                                                blogNotifiImage ||
                                                "https://placehold.co/50x50"
                                              }
                                            />
                                          </div>
                                        </Link>

                                        <div className="menu-container">
                                          <i className="fas fa-ellipsis-v menu-icon"></i>
                                          <div
                                            className="notification-menu"
                                            id="notificationMenu"
                                          >
                                            <div
                                              className="notification-item"
                                              onClick={() =>
                                                handleHideNotification(
                                                  notifiData.id
                                                )
                                              }
                                            >
                                              <i className="fa-regular fa-eye-slash me-2"></i>
                                              <span>
                                                Hide this notification
                                              </span>
                                            </div>
                                            <div
                                              className="notification-item"
                                              onClick={() =>
                                                turnOffAllNotifi(
                                                  userProfile.user_id,
                                                  authorDetails.user_id
                                                )
                                              }
                                            >
                                              <i className="fa-regular fa-bell-slash me-2"></i>
                                              <span>
                                                Mute all notifications from{" "}
                                                {authorDetails.full_name}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  } else {
                                    return null;
                                  }
                                })
                              ) : (
                                <>
                                  <div className="row justify-content-center mt-4">
                                    <div className="col-2">
                                      <div className="">
                                        <img src={Nofiti}></img>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row justify-content-center mb-4">
                                    <div className="col-6">
                                      <div className="notificationTextProfile">
                                        There are no notifications
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                              {hasMore && (
                                <div className="row justify-content-center mb-3 mt-3">
                                  <div className="text-center">
                                    <button
                                      type="submit"
                                      className="btn buttonColorGreenItem"
                                      onClick={loadMoreNotifications}
                                    >
                                      <i className="fa fa-refresh"></i> Load
                                      more
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : null}
              {isLoggedIn ? (
                <>
                  {userAvatar && (
                    <img
                      src={
                        userAvatar ||
                        "https://bootdey.com/img/Content/avatar/avatar1.png"
                      }
                      alt="User Avatar"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                  )}
                  <span style={{ marginRight: "10px" }}>{username}</span>
                </>
              ) : null}
              <div className="dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  id="userMenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa-regular fa-user fs-4"></i>
                </a>
                <div
                  className="custom-dropdown-menu dropdown-menu mt-2"
                  aria-labelledby="userMenu"
                >
                  {isLoggedIn ? (
                    <>
                      <Link
                        className="custom-dropdown-item dropdown-item"
                        to="/profile"
                      >
                        <i className="fas fa-user-circle me-2"></i> Profile
                      </Link>
                      {Cookies.get("role") === "admin" && (
                        <Link
                          className="custom-dropdown-item dropdown-item"
                          to="/admin"
                        >
                          <i className="fas fa-tools me-2"></i> Admin
                        </Link>
                      )}
                      <div className="dropdown-divider"></div>
                      <button
                        className="custom-dropdown-item dropdown-item"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i> Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        className="custom-dropdown-item dropdown-item"
                        to="/login"
                      >
                        <i className="fas fa-sign-in-alt me-2"></i> Login
                      </Link>
                      <Link
                        className="custom-dropdown-item dropdown-item"
                        to="/register"
                      >
                        <i className="fas fa-user-plus me-2"></i> Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
