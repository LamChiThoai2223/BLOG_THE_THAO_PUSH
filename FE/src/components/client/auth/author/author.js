import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
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
import {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
  hideNotification,
  turnOffAllNotifications,
  turnOnAllNotifications,
} from "../../../../services/Notification";
import {
  fetchAllBlockedUsers,
  fetchBlockedUsers,
  blockUser,
  unblockUser,
  isUserBlocked,
} from "../../../../services/BlockUser/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import IMAGES_User from "../../../../assets/images/users/nenTang.jpg";

import {
  getUserProfile,
  getUserGoogleProfile,
} from "../../../../services/Auth";
import { fetchUserDetails } from "../../../../services/Users/index";
import { useForm } from "react-hook-form";
import { Button, Nav, Tab } from "react-bootstrap";
import { fetchAllBlogUser, fetchBlogUser } from "../../../../services/Blog";
import { Spinner } from "react-bootstrap";
import Paginator from "../../../admin/Paginator";
import "./style.css";
import { Helmet } from "react-helmet";

const Author = () => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [userDataDetails, setUserDataDetails] = useState({});
  const [cookies, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [userFollowingData, setUserFollowingData] = useState([]);
  const [userFollowerData, setUserFollowerData] = useState([]);
  const [isFollowingMap, setIsFollowingMap] = useState({});
  const [blogAllData, setBlogAllData] = useState([]);
  const [followersAllData, setFollowersAllData] = useState([]);
  const [followingAllData, setFollowingAllData] = useState([]);
  const [isCheckBlocked, setIsCheckBlocked] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isBlocked, setIsBlocked] = useState(null);

  const [followersCurrentPage, setFollowersCurrentPage] = useState(1);
  const [followersLastPage, setFollowersLastPage] = useState(1);
  const [followingCurrentPage, setFollowingCurrentPage] = useState(1);
  const [followingLastPage, setFollowingLastPage] = useState(1);
  const [isFollowingUpdated, setIsFollowingUpdated] = useState(false);
  const currentUser = user;
  const isLoggedIn = userData.user_id;
  const { id } = useParams();
  console.log(isCheckBlocked);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchBlogUserData(currentPage);
  }, [navigate, currentPage]);

  useEffect(() => {
    if (isFollowingUpdated) {
      fetchFollowersData(followersCurrentPage);
      fetchFollowingData(followingCurrentPage);
      setIsFollowingUpdated(false);
    }
  }, [isFollowingUpdated, followersCurrentPage, followingCurrentPage]);

  useEffect(() => {
    const followingMap = userFollowingData.reduce((acc, following) => {
      acc[following.user_id] = true;
      return acc;
    }, {});
    setIsFollowingMap(followingMap);
  }, [userFollowingData]);

  useEffect(() => {
    fetchBlogUserData();
  }, [isCheckBlocked]);

  const fetchUser = async () => {
    try {
      let data;
      let userData = null;

      try {
        data = await fetchUserDetails(id);

        if (cookies.token) {
          userData = await getUserProfile(cookies.token);
          setUserData(userData);
        }
        setUserDataDetails(data.data);
        console.log("Fetched user details:", data.data);
        console.log("Current user data:", userData);
      } catch (e) {
        console.log("Regular login failed, trying Google login...");
        data = await getUserGoogleProfile(cookies.token);
      }

      if (data) {
        setUser(data.data);
        setValue("full_name", data.data.full_name);
        setValue("email", data.data.email);
        setEmail(data.data.email || "");
        setValue("phone", data.data.phone);
        setValue("address", data.data.address);
        setValue("bio", data.data.bio);
        setValue(data.data.image_user || "");

        await fetchAllBlogUser(data.data.user_id, setBlogAllData, setError);

        const fetchFollowersData = await fetchFollowersAll(
          apiUrl,
          data.data.user_id,
          setFollowersAllData,
          setError
        );
        setFollowersAllData(fetchFollowersData.data);

        const fetchFollowingData = await fetchFollowingAll(
          apiUrl,
          data.data.user_id,
          setFollowingAllData,
          setError
        );
        setFollowingAllData(fetchFollowingData.data);

        if (userData && userData.user_id) {
          const userFollowingData = await fetchFollowingAll(
            apiUrl,
            userData.user_id,
            setUserFollowingData,
            setError
          );
          setUserFollowingData(userFollowingData.data);

          const userFollowerData = await fetchFollowersAll(
            apiUrl,
            userData.user_id,
            setUserFollowerData,
            setError
          );
          setUserFollowerData(userFollowerData.data);
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data.");
      setLoading(false);
    }
  };

  const UserButton = ({ userId, following, followers }) => {
    const isFollowing = following.includes(userId);

    const isFollower = followers.includes(userId);

    const isFriend = isFollowing && isFollower;

    const renderButton = () => {
      if (error) {
        return <div className="error-message">Lỗi: {error}</div>;
      }

      if (isCheckBlocked == null) {
        return <div>Loading...</div>;
      }

      if (isCheckBlocked && userData.user_id) {
        return (
          <button className="unblock" onClick={() => unBlockAuthor(id)}>
            Unblock
          </button>
        );
      }

      if (isFriend) {
        return (
          <Button
            variant="secondary"
            size="sm"
            className="author-client__follow-button pull-right UserButtonPull-right"
            onClick={() => unfollow(userId)}
          >
            Friend
          </Button>
        );
      } else if (isFollowing) {
        return (
          <Button
            variant="danger"
            size="sm"
            className="author-client__follow-button pull-right UserButtonPull-right"
            onClick={() => unfollow(userId)}
          >
            Following
          </Button>
        );
      } else {
        return (
          <Button
            variant="success"
            size="sm"
            className="author-client__follow-button pull-right UserButtonPull-right"
            onClick={() => follow(userId)}
          >
            Follow
          </Button>
        );
      }
    };

    return (
      <div>
        {renderButton()} {/* Hiển thị nút tương ứng */}
      </div>
    );
  };

  const fetchBlogUserData = async (page = 1) => {
    if (!isLoggedIn) {
      await fetchBlogUser(apiUrl, id, page, setBlogData, setError)
        .then((response) => {
          if (response && response.meta) {
            setLastPage(response.meta.last_page);
          } else {
            console.error("API response thiếu 'meta' hoặc 'last_page'");
            setLastPage(1);
          }
        })
        .catch((err) => {
          console.error("Lỗi khi lấy dữ liệu blog:", err);
          setError("Lỗi khi lấy dữ liệu blog");
        });
      return;
    }

    if (!isCheckBlocked) {
      await fetchBlogUser(apiUrl, id, page, setBlogData, setError)
        .then((response) => {
          if (response && response.meta) {
            setLastPage(response.meta.last_page);
          } else {
            console.error("API response thiếu 'meta' hoặc 'last_page'");
            setLastPage(1);
          }
        })
        .catch((err) => {
          console.error("Lỗi khi lấy dữ liệu blog:", err);
          setError("Lỗi khi lấy dữ liệu blog");
        });
      return;
    }
    setBlogData([]);
  };

  const fetchFollowersData = (page) => {
    if (!isLoggedIn) {
      fetchFollowers(apiUrl, id, page, setFollowersData)
        .then((response) => {
          if (response && response.meta) {
            setFollowersLastPage(response.meta.last_page);
          } else {
            console.error("API response thiếu 'meta' hoặc 'last_page'");
          }
        })
        .catch((err) => {
          console.error("Lỗi khi lấy dữ liệu follower:", err);
        });
      return;
    }
    if (!isCheckBlocked) {
      fetchFollowers(apiUrl, id, page, setFollowersData)
        .then((response) => {
          if (response && response.meta) {
            setFollowersLastPage(response.meta.last_page);
          } else {
            console.error("API response thiếu 'meta' hoặc 'last_page'");
          }
        })
        .catch((err) => {
          console.error("Lỗi khi lấy dữ liệu follower:", err);
        });
    } else {
      setFollowersData([]);
    }
  };

  const fetchFollowingData = (page) => {
    if (!isLoggedIn) {
      fetchFollowing(apiUrl, id, page, setFollowingData)
        .then((response) => {
          if (response && response.meta) {
            setFollowingLastPage(response.meta.last_page);
          } else {
            console.error("API response thiếu 'meta' hoặc 'last_page'");
          }
        })
        .catch((err) => {
          console.error("Lỗi khi lấy dữ liệu following:", err);
        });
      return;
    }
    if (!isCheckBlocked) {
      fetchFollowing(apiUrl, id, page, setFollowingData)
        .then((response) => {
          if (response && response.meta) {
            setFollowingLastPage(response.meta.last_page);
          } else {
            console.error("API response thiếu 'meta' hoặc 'last_page'");
          }
        })
        .catch((err) => {
          console.error("Lỗi khi lấy dữ liệu following:", err);
        });
    } else {
      setFollowingData([]);
    }
  };

  const follow = async (followed_id) => {
    if (cookies.token) {
      try {
        await followUser(apiUrl, userData.user_id, followed_id);
        await fetchUser();
        setIsFollowingMap((prev) => ({ ...prev, [followed_id]: true }));
        toast.success("Followed successfully!", { autoClose: 1000 });
      } catch (error) {
        console.error("Error following user:", error);
        toast.error("An error occurred while following!", { autoClose: 1000 });
      }
    } else {
      navigate("/login");
      return;
    }
  };

  const unfollow = async (followed_id) => {
    if (!isFollowingMap[followed_id]) {
      toast.error("You are not following this user!", { autoClose: 1000 });
      return;
    }

    try {
      await unfollowUser(apiUrl, userData.user_id, followed_id);
      await fetchUser();
      setIsFollowingMap((prev) => ({ ...prev, [followed_id]: false }));
      toast.success("Unfollowed successfully!", { autoClose: 1000 });
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast.error("An error occurred while unfollowing!", { autoClose: 1000 });
    }
  };
  const isUserFollowing = userFollowingData.map(
    (following) => following.user_id
  );
  const isUserFollower = userFollowerData.map((follower) => follower.user_id);

  const userFollowingItem = (userId) => {
    return userFollowingData.some((following) => following.user_id === userId);
  };

  const turnOffAllNotifi = async (userId, authorId) => {
    try {
      const response = await turnOffAllNotifications(apiUrl, userId, authorId);
      toast.success("Turn off all notifications successfully!", {
        autoClose: 1000,
      });
      console.log(response);
    } catch (error) {
      console.error("Turn off all failure notifications:", error);
      toast.error("Turn off all failure notifications!", { autoClose: 1000 });
    }
  };
  const turnOnAllNotifi = async (userId, authorId) => {
    try {
      const response = await turnOnAllNotifications(apiUrl, userId, authorId);
      toast.success("Turn on all notifications successfully!", {
        autoClose: 1000,
      });
      console.log(response);
    } catch (error) {
      console.error("Turn on all failure notifications:", error);
      toast.error("Turn on all failure notifications!", { autoClose: 1000 });
    }
  };

  // block user
  const blockAuthor = async (blockedId) => {
    if (userData.user_id) {
      try {
        await blockUser(apiUrl, userData.user_id, blockedId, setError);
        await unfollowUser(apiUrl, userData.user_id, id);
        await fetchUser();
        setIsCheckBlocked(true);
        setBlogData(null);
        toast.success("User blocked successfully!", { autoClose: 1000 });
      } catch (error) {
        console.error("Error blocking user:", error);
        toast.error("An error occurred while blocking!", { autoClose: 1000 });
      }
    } else {
      navigate("/login");
      return;
    }
  };
  const unBlockAuthor = async (blockedId) => {
    if (userData.user_id) {
      try {
        await unblockUser(apiUrl, userData.user_id, blockedId, setError);
        setIsCheckBlocked(false);
        toast.success("Unblock user successfully!", { autoClose: 1000 });
      } catch (error) {
        console.error("Error Unblock user:", error);
        toast.error("An error occurred while Unblock!", { autoClose: 1000 });
      }
    } else {
      navigate("/login");
      return;
    }
  };

  const CheckBlockUserButton = ({ blockedId }) => {
    if (userData.user_id) {
      const fetchIsBlocked = async () => {
        try {
          const response = await isUserBlocked(
            apiUrl,
            userData.user_id,
            blockedId
          );
          console.log("API Response:", response);
          setIsCheckBlocked(response.isBlocked);
        } catch (err) {
          setError(err.message || "Error checking block status");
          console.error("Error checking block status:", err);
        }
      };

      fetchIsBlocked();
    } else {
      navigate("/login");
      return;
    }

    const renderButton = () => {
      if (error) {
        return <div className="error-message">Lỗi: {error}</div>;
      }

      if (isCheckBlocked === null) {
        return <div>Loading...</div>;
      }

      if (isCheckBlocked) {
        return (
          <div
            className="notification-item pt-3"
            onClick={() => unBlockAuthor(blockedId)}
          >
            <i className="bi bi-ban me-2 fs-5"></i>
            <span className="notification-span">Unblock</span>
          </div>
        );
      } else {
        return (
          <div
            className="notification-item pt-3"
            onClick={() => blockAuthor(blockedId)}
          >
            <i className="bi bi-ban me-2 fs-5"></i>
            <span className="notification-span">Block this person</span>
          </div>
        );
      }
    };

    return <div>{renderButton()}</div>;
  };

  const onclickAuthor = async (authorId) => {
    setLoading(true);
    try {
      await Promise.all([
        fetchFollowersData(followersCurrentPage),
        fetchFollowingData(followingCurrentPage),
      ]);
      navigate(`/author/${authorId}`);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setLoading(false);
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
    <div className="container mt-5">
      <Helmet>
        <title>Author</title>
      </Helmet>
      <div className="author-client user-profile">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-info-left profile-info-author pt-4">
              <div className="text-center">
                <img
                  src={user.image_user || IMAGES_User}
                  className="avatar img-circle mb-3"
                  style={{
                    borderRadius: "50%",
                    width: "150px",
                    height: "150px",
                  }}
                />
                <h2 className="mb-1">{user.full_name}</h2>
                <p className="text-muted">@{user.username}</p>
              </div>

              <div className="action-buttons my-3">
                {id !== currentUser.user_id && (
                  <div className="d-flex justify-content-center">
                    <UserButton
                      userId={currentUser.user_id}
                      following={isUserFollowing}
                      followers={isUserFollower}
                    />
                    <Button
                      variant="success"
                      size="sm"
                      className="author-client__message-button UserButtonPull-right"
                    >
                      Message
                    </Button>
                  </div>
                )}
              </div>

              <div className="profile-info-author-section section mt-4">
                <h3>About Me</h3>
                <p>{user.bio}</p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <span className="profile-info-author-title">
              Author Information
            </span>
            <div className="profile-info-right profile-info-author">
              <Tab.Container defaultActiveKey="activities">
                <Nav variant="pills" className="nav-pills-custom-minimal pb-2">
                  <Nav.Item>
                    <Nav.Link
                      eventKey="activities"
                      className="button-author-follow"
                      onClick={() => fetchBlogUserData(currentPage)}
                    >
                      {Array.isArray(blogAllData)
                        ? blogAllData.filter((blog) => blog.is_delete === 0)
                            .length
                        : 0}{" "}
                      Blogs
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="followers"
                      onClick={() => fetchFollowersData(followersCurrentPage)}
                    >
                      {followersAllData.length} Followers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="following"
                      onClick={() => fetchFollowingData(followingCurrentPage)}
                    >
                      {followingAllData.length} Following
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item className="ms-auto me-3">
                    <div className="menu-container dropdown">
                      <i
                        className="bi bi-three-dots-vertical fs-5 menu-icon"
                        data-bs-toggle="dropdown"
                      ></i>

                      {userData.user_id ? (
                        <div
                          className="dropdown-menu dropdown-menu-end notification-menu"
                          id="notificationMenu"
                        >
                          {userFollowingItem(user.user_id) ? (
                            <>
                              <div
                                className="notification-item pt-3"
                                onClick={() =>
                                  turnOnAllNotifi(userData.user_id, id)
                                }
                              >
                                <i class="bi bi-bell me-2"></i>
                                <span className="notification-span">
                                  Get all notifications
                                </span>
                              </div>
                              <div
                                className="notification-item pt-3"
                                onClick={() =>
                                  turnOffAllNotifi(userData.user_id, id)
                                }
                              >
                                <i class="bi bi-bell-slash me-2"></i>
                                <span className="notification-span">
                                  Do not receive notifications from this account
                                </span>
                              </div>
                              <label
                                class="notification-item pt-3"
                                for="toggleReport"
                              >
                                <i class="bi bi-flag me-2 fs-5"></i>
                                <span class="notification-span">Report</span>
                              </label>
                              <CheckBlockUserButton blockedId={id} />

                              <input type="checkbox" id="toggleReport" />

                              <div
                                class="overlay"
                                onclick="document.getElementById('toggleReport').checked = false;"
                              >
                                <div
                                  class="report-container"
                                  onclick="event.stopPropagation();"
                                >
                                  <div class="report-header">
                                    <h1>
                                      <i class="fas fa-chevron-left"></i>Báo cáo
                                    </h1>
                                    <label
                                      class="report-close"
                                      for="toggleReport"
                                    >
                                      &times;
                                    </label>
                                  </div>
                                  <div class="report-content">
                                    <p>Vui lòng chọn tình huống</p>
                                    <ul class="report-list">
                                      <li
                                        class="report-list-item"
                                        onclick="document.getElementById('toggleReport').checked = false;"
                                      >
                                        Đăng nội dung không phù hợp
                                        <span>
                                          <i class="fas fa-chevron-right"></i>
                                        </span>
                                      </li>
                                      <li
                                        class="report-list-item"
                                        onclick="document.getElementById('toggleReport').checked = false;"
                                      >
                                        Giả làm người khác
                                        <span>
                                          <i class="fas fa-chevron-right"></i>
                                        </span>
                                      </li>
                                      <li
                                        class="report-list-item"
                                        onclick="document.getElementById('toggleReport').checked = false;"
                                      >
                                        Thông tin hồ sơ không phù hợp
                                        <span>
                                          <i class="fas fa-chevron-right"></i>
                                        </span>
                                      </li>
                                      <li
                                        class="report-list-item"
                                        onclick="document.getElementById('toggleReport').checked = false;"
                                      >
                                        Người dùng có thể dưới 13 tuổi
                                        <span>
                                          <i class="fas fa-chevron-right"></i>
                                        </span>
                                      </li>
                                      <li
                                        class="report-list-item"
                                        onclick="document.getElementById('toggleReport').checked = false;"
                                      >
                                        Gian lận và lừa đảo
                                        <span>
                                          <i class="fas fa-chevron-right"></i>
                                        </span>
                                      </li>
                                      <li
                                        class="report-list-item"
                                        onclick="document.getElementById('toggleReport').checked = false;"
                                      >
                                        Sản phẩm nhái và quyền sở hữu trí tuệ
                                        <span>
                                          <i class="fas fa-chevron-right"></i>
                                        </span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="notification-item pt-3">
                                <i class="bi bi-flag me-2 fs-5"></i>
                                <span className="notification-span">
                                  Report
                                </span>
                              </div>
                              <CheckBlockUserButton blockedId={id} />
                            </>
                          )}
                        </div>
                      ) : (
                        <div
                          className="dropdown-menu dropdown-menu-end notification-menu"
                          id="notificationMenu"
                        >
                          <div className="notification-item">
                            <i class="bi bi-ban me-2 fs-5"></i>
                            <span className="notification-span">
                              Block this person
                            </span>
                          </div>
                          <div className="notification-item">
                            <i className="fa-regular fa-paper-plane me-2"></i>
                            <span>Report</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="activities">
                    {Array.isArray(blogData) && blogData.length > 0 ? (
                      <>
                        {blogData.map((blog) => (
                          <div
                            className="media activity-item d-flex"
                            key={blog.blog_id}
                          >
                            <Link
                              to={`http://localhost:3000/blog/detail/${blog.blog_id}`}
                              className="pull-left me-3"
                            >
                              <img
                                src={
                                  blog.image ||
                                  "https://bootdey.com/img/Content/avatar/avatar1.png"
                                }
                                alt="Post"
                                className="media-object avatar"
                              />
                            </Link>
                            <div className="media-body">
                              <Link
                                to={`http://localhost:3000/blog/detail/${blog.blog_id}`}
                              >
                                <p className="activity-title">
                                  <a href="#" className="text-dark">
                                    {blog.title}
                                  </a>{" "}
                                  <small className="text-muted">
                                    -{" "}
                                    {formatDistanceToNow(
                                      new Date(blog.created_at),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </small>
                                </p>
                              </Link>
                              <small className="text-muted">
                                {new Date(blog.created_at).toLocaleString()}{" "}
                              </small>
                            </div>
                          </div>
                        ))}
                        <Paginator
                          currentPage={currentPage}
                          lastPage={lastPage}
                          setCurrentPage={setCurrentPage}
                          fetchData={fetchBlogUserData}
                        />
                      </>
                    ) : isCheckBlocked ? (
                      <div className="isCheckBlockedContent">
                        <div className="icon">
                          <i className="fas fa-user-circle"></i>
                        </div>
                        <div className="title">No content</div>
                        <div className="message">
                          You've blocked this user and can't see any of their
                          content or posts.
                        </div>
                      </div>
                    ) : (
                      <p>No blog posts found.</p>
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="followers">
                    {followersData.length > 0 ? (
                      <>
                        {followersData.map((follower) => {
                          const isUserFollowing = userFollowingData.map(
                            (following) => following.user_id
                          );
                          const isUserFollower = userFollowerData.map(
                            (follower) => follower.user_id
                          );

                          return (
                            <div
                              className="media user-following author-client__user-follower "
                              key={follower.user_id}
                            >
                              {follower.user_id === userData.user_id ? (
                                <Link to={`/profile`}>
                                  <img
                                    src={
                                      follower.image_user ||
                                      "https://bootdey.com/img/Content/avatar/avatar1.png"
                                    }
                                    alt="User Avatar"
                                    className="author-client__user-follower-avatar media-object"
                                  />
                                </Link>
                              ) : (
                                <span
                                  onClick={() => {
                                    onclickAuthor(follower.user_id);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    src={
                                      follower.image_user ||
                                      "https://bootdey.com/img/Content/avatar/avatar1.png"
                                    }
                                    alt="User Avatar"
                                    className="author-client__user-follower-avatar media-object"
                                  />
                                </span>
                              )}

                              <div className="user-following-body">
                                {follower.user_id === userData.user_id ? (
                                  <Link to={`/profile/`}>
                                    {follower.full_name}
                                    <br />
                                    <span className="author-client__user-follower-username text-muted">
                                      @{follower.username}
                                    </span>
                                  </Link>
                                ) : (
                                  <span
                                    onClick={() => {
                                      onclickAuthor(follower.user_id);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {follower.full_name}
                                    <br />
                                    <span className="author-client__user-follower-username text-muted">
                                      @{follower.username}
                                    </span>
                                  </span>
                                )}

                                {follower.user_id !== userData.user_id && (
                                  <UserButton
                                    userId={follower.user_id}
                                    following={isUserFollowing}
                                    followers={isUserFollower}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                        <Paginator
                          currentPage={followersCurrentPage}
                          lastPage={followersLastPage}
                          setCurrentPage={setFollowersCurrentPage}
                          fetchData={fetchFollowersData}
                        />
                      </>
                    ) : isCheckBlocked ? (
                      <div class="isCheckBlockedContent">
                        <div class="icon">
                          <i class="fas fa-user-circle"></i>
                        </div>
                        <div class="title">No content</div>
                        <div class="message">
                          You've blocked this user and can't see any of their
                          content or posts.
                        </div>
                      </div>
                    ) : (
                      <p>No followers found.</p>
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="following">
                    {followingData.length > 0 ? (
                      <>
                        {followingData.map((following) => {
                          const isUserFollowing = userFollowingData.map(
                            (following) => following.user_id
                          );
                          const isUserFollower = userFollowerData.map(
                            (follower) => follower.user_id
                          );

                          return (
                            <div
                              className="media user-following author-client__user-follower "
                              key={following.user_id}
                            >
                              {following.user_id === userData.user_id ? (
                                <Link to={`/profile/`}>
                                  <img
                                    src={
                                      following.image_user ||
                                      "https://bootdey.com/img/Content/avatar/avatar1.png"
                                    }
                                    alt="User Avatar"
                                    className="author-client__user-follower-avatar media-object"
                                  />
                                </Link>
                              ) : (
                                <span
                                  onClick={() => {
                                    onclickAuthor(following.user_id);
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    src={
                                      following.image_user ||
                                      "https://bootdey.com/img/Content/avatar/avatar1.png"
                                    }
                                    alt="User Avatar"
                                    className="author-client__user-follower-avatar media-object"
                                  />
                                </span>
                              )}
                              <div className="user-following-body">
                                {following.user_id === userData.user_id ? (
                                  <Link to={`/profile/`}>
                                    {following.full_name}
                                    <br />
                                    <span className="author-client__user-follower-username text-muted">
                                      @{following.username}
                                    </span>
                                  </Link>
                                ) : (
                                  <span
                                    onClick={() => {
                                      onclickAuthor(following.user_id);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {following.full_name}
                                    <br />
                                    <span className="author-client__user-follower-username text-muted fs-6">
                                      @{following.username}
                                    </span>
                                  </span>
                                )}

                                {following.user_id !== userData.user_id && (
                                  <UserButton
                                    userId={following.user_id}
                                    following={isUserFollowing}
                                    followers={isUserFollower}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                        <Paginator
                          currentPage={followingCurrentPage}
                          lastPage={followingLastPage}
                          setCurrentPage={setFollowingCurrentPage}
                          fetchData={fetchFollowingData}
                        />
                      </>
                    ) : isCheckBlocked ? (
                      <div class="isCheckBlockedContent">
                        <div class="icon">
                          <i class="fas fa-user-circle"></i>
                        </div>
                        <div class="title">No content</div>
                        <div class="message">
                          You've blocked this user and can't see any of their
                          content or posts.
                        </div>
                      </div>
                    ) : (
                      <p>No following found.</p>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
