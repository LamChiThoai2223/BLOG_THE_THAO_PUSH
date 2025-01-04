import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getUserProfile } from "../../../services/Auth";
import Cookies from "js-cookie";
import { logout } from "../../../services/Auth";
import { toast } from "react-toastify";
import LogoAdmin from "../../../../src/assets/images/logo.jpg";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(
    localStorage.getItem("activeMenu") || "home"
  );
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };
    const savedMenu = localStorage.getItem("activeMenu");
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
    fetchUser();
  }, []);
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    localStorage.setItem("activeMenu", menu);
  };

  useEffect(() => {
    // Cập nhật activeMenu dựa trên đường dẫn hiện tại
    const path = location.pathname;
    let newActiveMenu;

    switch (path) {
      case "/admin":
        newActiveMenu = "home";
        break;
      case "/admin/users/list":
        newActiveMenu = "user-list";
        break;
      case "/admin/users/add":
        newActiveMenu = "user-add";
        break;
      case "/admin/blogs/list":
        newActiveMenu = "blogs-list";
        break;
      case "/admin/blogs/add":
        newActiveMenu = "blogs-add";
        break;
      case "/admin/sports/list":
        newActiveMenu = "sports-list";
        break;
      case "/admin/sports/add":
        newActiveMenu = "sports-add";
        break;
      case "/admin/category/list":
        newActiveMenu = "category-list";
        break;
      case "/admin/category/add":
        newActiveMenu = "category-add";
        break;
      case "/admin/tags":
        newActiveMenu = "tags-list";
        break;
      case "/admin/tags/add":
        newActiveMenu = "tags-add";
        break;
      case "/admin/blogs-list-comment":
        newActiveMenu = "comments-list";
        break;
      case "/admin/comments-list":
        newActiveMenu = "comments-add";
        break;
      case "/admin/chart-blog":
        newActiveMenu = "chart-blog";
        break;
      case "/admin/chart-user":
        newActiveMenu = "chart-user";
        break;
      case "/admin/share":
        newActiveMenu = "chart-share";
        break;
      case "/admin/chart-post":
        newActiveMenu = "chart-post";
        break;
      case "/admin/chart-comment":
        newActiveMenu = "chart-comment";
        break;
      case "/admin/confirmAuthor":
        newActiveMenu = "confirmAuthor";
        break;
      case "/admin/reports":
        newActiveMenu = "reports";
        break;
      default:
        newActiveMenu = "home";
    }

    setActiveMenu(newActiveMenu);
    localStorage.setItem("activeMenu", newActiveMenu);
  }, [location.pathname]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await logout(token); // Gửi token khi logout
      }
      Cookies.remove("token", { path: "/" });
      Cookies.remove("role", { path: "/" });
      Cookies.remove("tokenExpiry", { path: "/" });
      Cookies.remove("token", { path: "/admin" });
      Cookies.remove("role", { path: "/admin" });
      Cookies.remove("tokenExpiry", { path: "/admin" });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="app-header fixed-top">
      <div className="app-header-inner">
        <div className="container-fluid py-2">
          <div className="app-header-content">
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                <a
                  id="sidepanel-toggler"
                  className="sidepanel-toggler d-inline-block d-xl-none"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    role="img"
                  >
                    <title>Menu</title>
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="2"
                      d="M4 7h22M4 15h22M4 23h22"
                    ></path>
                  </svg>
                </a>
              </div>
              <div className="search-mobile-trigger d-sm-none col">
                <i className="search-mobile-trigger-icon fa-solid fa-magnifying-glass"></i>
              </div>

              <div className="app-utilities col-auto">
                <div className="app-utility-item app-user-dropdown dropdown">
                  <div
                    className="user-avatar dropdown-toggle"
                    id="user-dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span className="user-name" style={{ marginLeft: "10px" }}>
                      Hello! {user.username || "Người dùng"}
                    </span>
                    <img
                      src={user.image_user}
                      alt="User Avatar"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="user-dropdown-toggle"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/admin/account"
                        onClick={() => handleMenuClick("")}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" onClick={handleLogout}>
                        Log Out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="app-sidepanel" className="app-sidepanel">
        <div id="sidepanel-drop" className="sidepanel-drop"></div>
        <div className="sidepanel-inner d-flex flex-column">
          <a
            href="#"
            id="sidepanel-close"
            className="sidepanel-close d-xl-none"
          >
            &times;
          </a>
          <div className="app-branding">
            <Link
              className="app-logo"
              to="/admin"
              onClick={() => handleMenuClick("home")}
            >
              <img className="logo-icon" src={LogoAdmin} alt="logo" />
              <span className="logo-text">POSTNEST</span>
            </Link>
          </div>

          <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
            <ul
              className="app-menu list-unstyled accordion"
              id="menu-accordion"
            >
              <li className="nav-item">
                <Link
                  className={
                    activeMenu === "home" ? "nav-link active" : "nav-link"
                  }
                  to="/admin"
                  onClick={() => handleMenuClick("home")}
                >
                  <span className="nav-icon">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-house-door"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                      />
                    </svg>
                  </span>
                  <span className="nav-link-text">Home</span>
                </Link>
              </li>
              <li className="nav-item has-submenu">
                <a
                  className="nav-link submenu-toggle"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#submenu-users"
                  aria-expanded="false"
                  aria-controls="submenu-users"
                >
                  <span className="nav-icon">
                    <i className="bi bi-person me-2"></i>
                  </span>
                  <span className="nav-link-text">User Management</span>
                  <span className="submenu-arrow">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-chevron-down"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </a>
                <div
                  id="submenu-users"
                  className={
                    activeMenu === "user-list" || activeMenu === "user-add"
                      ? "collapse submenu submenu-2 show"
                      : "collapse submenu submenu-2"
                  }
                  data-bs-parent="#menu-accordion"
                >
                  <ul className="submenu-list list-unstyled">
                    <li className="submenu-item">
                      <Link
                        to="/admin/users/list"
                        className={
                          activeMenu === "user-list"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("user-list")}
                      >
                        User List
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/admin/users/add"
                        className={
                          activeMenu === "user-add"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("user-add")}
                      >
                        Add User
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item has-submenu">
                <a
                  className="nav-link submenu-toggle"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#submenu-posts"
                  aria-expanded="false"
                  aria-controls="submenu-posts"
                >
                  <span className="nav-icon">
                    <i class="bi bi-pencil-square"></i>
                  </span>
                  <span className="nav-link-text">Post Management</span>
                  <span className="submenu-arrow">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-chevron-down"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </a>
                <div
                  id="submenu-posts"
                  className={
                    activeMenu === "blogs-list" || activeMenu === "blogs-add"
                      ? "collapse submenu submenu-2 show"
                      : "collapse submenu submenu-2"
                  }
                  data-bs-parent="#menu-accordion"
                >
                  <ul className="submenu-list list-unstyled">
                    <li className="submenu-item">
                      <Link
                        to="/admin/blogs/list"
                        className={
                          activeMenu === "blogs-list"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("blogs-list")}
                      >
                        Post List
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/admin/blogs/add"
                        className={
                          activeMenu === "blogs-add"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("blogs-add")}
                      >
                        Add Post
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item has-submenu">
                <a
                  className="nav-link submenu-toggle"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#submenu-sports"
                  aria-expanded="false"
                  aria-controls="submenu-sports"
                >
                  <span className="nav-icon">
                    <i className="bi bi-trophy"></i>
                  </span>
                  <span className="nav-link-text">Sports</span>
                  <span className="submenu-arrow">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-chevron-down"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </a>
                <div
                  id="submenu-sports"
                  className={
                    activeMenu === "sports-list" || activeMenu === "sports-add"
                      ? "collapse submenu submenu-1 show"
                      : "collapse submenu submenu-1"
                  }
                  data-bs-parent="#menu-accordion"
                >
                  <ul className="submenu-list list-unstyled">
                    <li className="submenu-item">
                      <Link
                        to="/admin/sports/list"
                        className={
                          activeMenu === "sports-list"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("sports-list")}
                      >
                        Sports List
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/admin/sports/add"
                        className={
                          activeMenu === "sports-add"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("sports-add")}
                      >
                        Add Sport
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item has-submenu">
                <a
                  className="nav-link submenu-toggle"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#submenu-category"
                  aria-expanded="false"
                  aria-controls="submenu-category"
                >
                  <span className="nav-icon">
                    <i class="bi bi-bookmark"></i>
                  </span>
                  <span className="nav-link-text">Category Management</span>
                  <span className="submenu-arrow">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-chevron-down"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </a>
                <div
                  id="submenu-category"
                  className={
                    activeMenu === "category-list" ||
                    activeMenu === "category-add"
                      ? "collapse submenu submenu-1 show"
                      : "collapse submenu submenu-1"
                  }
                  data-bs-parent="#menu-accordion"
                >
                  <ul className="submenu-list list-unstyled">
                    <li className="submenu-item">
                      <Link
                        to="/admin/category/list"
                        className={
                          activeMenu === "category-list"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("category-list")}
                      >
                        Category List
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/admin/category/add"
                        className={
                          activeMenu === "category-add"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("category-add")}
                      >
                        Add Category
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item has-submenu">
                <a
                  className="nav-link submenu-toggle"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#submenu-tag"
                  aria-expanded="false"
                  aria-controls="submenu-tag"
                >
                  <span className="nav-icon">
                    <i class="bi bi-tag"></i>
                  </span>
                  <span className="nav-link-text">Tag Management</span>

                  <span className="submenu-arrow">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-chevron-down"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </a>
                <div
                  id="submenu-tag"
                  className={
                    activeMenu === "tags-list" || activeMenu === "tags-add"
                      ? "collapse submenu submenu-1 show"
                      : "collapse submenu submenu-1"
                  }
                  data-bs-parent="#menu-accordion"
                >
                  <ul className="submenu-list list-unstyled">
                    <li className="submenu-item">
                      <Link
                        to="/admin/tags"
                        className={
                          activeMenu === "tags-list"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("tags-list")}
                      >
                        Tag List
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/admin/tags/add"
                        className={
                          activeMenu === "tags-add"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("tags-add")}
                      >
                        Add Tag
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item has-submenu">
                <a
                  className="nav-link submenu-toggle"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#submenu-comment"
                  aria-expanded="false"
                  aria-controls="submenu-comment"
                >
                  <span className="nav-icon">
                    <i class="bi bi-chat"></i>
                  </span>
                  <span className="nav-link-text">Comment Management</span>
                  <span className="submenu-arrow">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-chevron-down"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </a>
                <div
                  id="submenu-comment"
                  className={
                    activeMenu === "comments-list" ||
                    activeMenu === "comments-add"
                      ? "collapse submenu submenu-1 show"
                      : "collapse submenu submenu-1"
                  }
                  data-bs-parent="#menu-accordion"
                >
                  <ul className="submenu-list list-unstyled">
                    <li className="submenu-item">
                      <Link
                        to="/admin/blogs-list-comment"
                        className={
                          activeMenu === "comments-list"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("comments-list")}
                      >
                        List Blog
                      </Link>
                    </li>
                  </ul>
                  <ul className="submenu-list list-unstyled">
                    <li className="submenu-item">
                      <Link
                        to="/admin/comments-list"
                        className={
                          activeMenu === "comments-add"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("comments-add")}
                      >
                        List comment
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item has-submenu">
                <a
                  className="nav-link submenu-toggle"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#submenu-follow"
                  aria-expanded="false"
                  aria-controls="submenu-follow"
                >
                  <span className="nav-icon">
                    <i class="bi bi-bar-chart-line"></i>
                  </span>
                  <span className="nav-link-text">Statistics</span>
                  <span className="submenu-arrow">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-chevron-down"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </a>
                <div
                  id="submenu-follow"
                  className={
                    activeMenu === "chart-blog" ||
                    activeMenu === "chart-user" ||
                    activeMenu === "chart-share" ||
                    activeMenu === "chart-post" ||
                    activeMenu === "chart-comment" ||
                    activeMenu === "chart-rating"
                      ? "collapse submenu submenu-1 show"
                      : "collapse submenu submenu-1"
                  }
                  data-bs-parent="#menu-accordion"
                >
                  <ul className="submenu-list list-unstyled">
                    <li className="submenu-item">
                      <Link
                        to="/admin/chart-blog"
                        className={
                          activeMenu === "chart-blog"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("chart-blog")}
                      >
                        Blog
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/admin/chart-user"
                        className={
                          activeMenu === "chart-user"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("chart-user")}
                      >
                        User
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/admin/share"
                        className={
                          activeMenu === "chart-share"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("chart-share")}
                      >
                        Share
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/admin/chart-post"
                        className={
                          activeMenu === "chart-post"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("chart-post")}
                      >
                        View
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <Link
                        to="/admin/chart-comment"
                        className={
                          activeMenu === "chart-comment"
                            ? "submenu-link active"
                            : "submenu-link"
                        }
                        onClick={() => handleMenuClick("chart-comment")}
                      >
                        Comment
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <Link
                  className={`nav-link ${
                    activeMenu === "confirmAuthor" ? "active" : ""
                  }`}
                  to="/admin/confirmAuthor"
                  onClick={() => handleMenuClick("confirmAuthor")}
                >
                  <span class="nav-icon">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-folder"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
                      <path
                        fill-rule="evenodd"
                        d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z"
                      />
                    </svg>
                  </span>
                  <span class="nav-link-text">Author registration</span>
                </Link>
              </li>

              <li class="nav-item">
                <Link
                  className={`nav-link ${
                    activeMenu === "reports" ? "active" : ""
                  }`}
                  to="/admin/reports"
                  onClick={() => handleMenuClick("reports")}
                >
                  <span class="nav-icon">
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-folder"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
                      <path
                        fill-rule="evenodd"
                        d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z"
                      />
                    </svg>
                  </span>
                  <span class="nav-link-text">Reports</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
