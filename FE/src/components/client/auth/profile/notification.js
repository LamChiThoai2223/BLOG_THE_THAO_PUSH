import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiUrl } from "../../../../config/Api";
import { ToastContainer, toast } from "react-toastify";
import { Button, Nav, Tab } from "react-bootstrap";
import ProfileSidebar from "../../../../components/client/auth/profile/sidebar";
import Nofiti from "../../../../assets/images/background/emptyNotification.svg";
import IMAGES_CLEINT from "../../../../assets/styles/client/images";
import IMAGES_User from "../../../../assets/images/users/nenTang.jpg";
import IMAGES_HeThong from "../../../../assets/images/users/heThong.jpg";
import { Url } from "../../../../config/Api";
import { formatDistanceToNow } from "date-fns";
import {
  fetchNotifications,
  markNotificationAsRead,
  deleteNotification,
  hideNotification,
  turnOffAllNotifications,
  fetchAllNotifications,
} from "../../../../services/Notification";

import {
  fetchNotificationsBlogs,
  deleteNotificationBlog,
  fetchAllNotificationsBlogs,
  markNotificationBlogAsRead,
} from "../../../../services/Notification_Blogs";

import {
  getUserProfile,
  getUserGoogleProfile,
} from "../../../../services/Auth";
import { fetchUserDetails } from "../../../../services/Users/index";
import {
  fetchBlogDetails,
  fetchBlogUser,
  fetchAllBlogUser,
  fetchBlogUserDelete,
} from "../../../../services/Blog";
import { Helmet } from "react-helmet";
import Paginator from "../../../admin/Paginator";
import { useCookies } from "react-cookie";

const NofitiProfile = () => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState("");
  const [BlogNotification, setBlogNotification] = useState([]);
  const [BlogDeleteNotification, setBlogDeleteNotification] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [blogAllData, setBlogAllData] = useState([]);
  const [NotificationData, setNotificationData] = useState([]);
  const [notifiAllData, setNotifiAllData] = useState("");
  const [filteredNotifi, setfilteredNotifi] = useState("");
  const [filteredNotifiBlog, setfilteredNotifiBlog] = useState("");
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [authorData, setAuthorData] = useState([]);
  const [nofitiCurrentPage, setNofitiCurrentPage] = useState(1);
  const [nofitiLastPage, setNofitiLastPage] = useState(1);
  const [blogCurrentPage, setBlogCurrentPage] = useState(1);
  const [blogLastPage, setBlogLastPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      fetchUser();
      // fetchNotificationBlog();
    } else {
      navigate("/login");
    }
  }, [cookies.token, navigate]);
  useEffect(() => {
    if (userProfile && userProfile.user_id) {
      fetchNotification(nofitiCurrentPage);
      fetchNotificationBlog();
    }
  }, [apiUrl, userProfile, nofitiCurrentPage]);

  const fetchUser = async () => {
    try {
      let data;
      try {
        data = await getUserProfile(cookies.token);
        setUserProfile(data);
      } catch (e) {
        console.log(
          "Đăng nhập thường không thành công, thử đăng nhập Google..."
        );
        data = await getUserGoogleProfile(cookies.token);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      setError("Lỗi khi lấy dữ liệu người dùng.");
      setLoading(false);
      navigate("/login");
    }
  };
  const fetchBlogUserData = async (page = 1) => {
    fetchBlogUserDelete(
      apiUrl,
      userProfile.user_id,
      page,
      setBlogData,
      setError
    )
      .then((response) => {
        if (response && response.meta) {
          setBlogLastPage(response.meta.last_page);
        } else {
          console.error("API response thiếu 'meta' hoặc 'last_page'");
          setBlogLastPage(1);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu blog:", err);
        setError("Lỗi khi lấy dữ liệu blog");
      });
  };

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
      await fetchAllBlogUser(userProfile.user_id, setBlogAllData, setError);
      if (notifications && notifications.meta) {
        setNofitiLastPage(notifications.meta.last_page);
      } else {
        console.error("API notifications thiếu 'meta' hoặc 'last_page'");
        setNofitiLastPage(1);
      }

      const dataNotification = notifications.data;
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

      setNotificationData((prevData) => {
        const updatedData = [...prevData, ...dataNotification];
        return updatedData;
      });

      if (!dataNotification || dataNotification.length < pageSize) {
        setHasMore(false);
      }

      const blogIds = [];
      const authorIds = [];

      dataNotification.forEach((notification) => {
        if (notification.blog_id) blogIds.push(notification.blog_id);
        if (notification.author_id) authorIds.push(notification.author_id);
      });

      const blogDetails = await Promise.all(
        blogIds.map((id) => fetchBlogDetails(id))
      );

      const authorDetails = await Promise.all(
        authorIds.map((id) => fetchUserDetails(id))
      );

      setBlogNotification(blogDetails);
      const authorInfo = authorDetails.map((author) => author.data);
      setAuthorData((prevAuthorData) => [...prevAuthorData, ...authorInfo]);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setError("Có lỗi xảy ra khi tải thông báo. Vui lòng thử lại sau.");
    }
  };

  const handleMarkAsRead = async (notificationId, blogId) => {
    try {
      const response = await markNotificationAsRead(apiUrl, notificationId);
      console.log(response);

      navigate(`/blog/detail/${blogId}`);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
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
  const handleHideNotification = async (notificationId) => {
    try {
      const response = await hideNotification(apiUrl, notificationId);
      await fetchNotification();
      toast.success("Hide this message successfully!", { autoClose: 1000 });
      console.log(response);
    } catch (error) {
      console.error("Failed to hide notification:", error);
      toast.error("Hide this message failed!", { autoClose: 1000 });
    }
  };

  const fetchNotificationBlog = async () => {
    try {
      // Gọi hàm fetchAllNotificationsBlogs để lấy thông báo
      const notificationsBlog = await fetchAllNotificationsBlogs(
        apiUrl,
        userProfile.user_id,
        setBlogDeleteNotification,
        setError
      );
      await fetchBlogUserData();
      const dataNotificationBlog = notificationsBlog.data;
      const filteredNotificationsBlogs = dataNotificationBlog.filter(
        (notifiData) => notifiData.is_read === 0
      );

      setfilteredNotifiBlog(filteredNotificationsBlogs.length);
      setBlogDeleteNotification(dataNotificationBlog);
      console.log(notificationsBlog.data);

      // Sau khi lấy thông báo, gọi tiếp fetchAllBlogUser
      await fetchAllBlogUser(userProfile.user_id, setBlogAllData, setError);
    } catch (error) {
      // Nếu có lỗi xảy ra, in ra lỗi và thông báo cho người dùng
      console.error("Failed to fetch notifications:", error);
      setError("Có lỗi xảy ra khi tải thông báo. Vui lòng thử lại sau.");
    }
  };
  const handleMarkAsReadBlog = async (notificationId, blogId) => {
    try {
      const response = await markNotificationBlogAsRead(apiUrl, notificationId);
      console.log(response);

      navigate(`/blog/detail/${blogId}`);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const deleteNotifiBlog = async (notification_id) => {
    try {
      const response = await deleteNotificationBlog(apiUrl, notification_id);
      toast.success("Successfully deleted notification!", {
        autoClose: 1000,
      });
      console.log(response);
    } catch (error) {
      console.error("Clear error message:", error);
      toast.error("Clear error message!", { autoClose: 1000 });
    }
  };

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Nofitication</title>
      </Helmet>
      <div className="author-client user-profile">
        <div className="row">
          <ProfileSidebar />
          <div className="col-md-8 backG-proflie">
            <span className="profile-info-author-title">Nofitication</span>
            <div className="profile-info-right mt-3">
              <Tab.Container defaultActiveKey="activities">
                <Nav variant="pills" className="nav-pills-custom-minimal pb-2">
                  <Nav.Item className="me-2">
                    <Nav.Link
                      eventKey="activities"
                      onClick={() => fetchNotification(nofitiCurrentPage)}
                    >
                      {" "}
                      {filteredNotifi > 0 && (
                        <span>
                          ({filteredNotifi > 9 ? "9+" : filteredNotifi})
                        </span>
                      )}{" "}
                      Notifications
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="me-2">
                    <Nav.Link eventKey="following">
                      {filteredNotifiBlog > 0 && (
                        <span className="text-danger">
                          ({filteredNotifiBlog > 9 ? "9+" : filteredNotifiBlog})
                        </span>
                      )}{" "}
                      System Notifications
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="activities">
                    <div className="container">
                      <div className="row">
                        {Array.isArray(BlogNotification) &&
                        BlogNotification.length > 0 ? (
                          BlogNotification.map((Notification, index) => {
                            const notificationData =
                              Array.isArray(Notification.data) &&
                              Notification.data.length > 0
                                ? Notification.data[0]
                                : {};
                            const notifiData = NotificationData[index];

                            if (notifiData && notifiData.is_hidden === 0) {
                              const authorImage = authorData[index] || {
                                IMAGES_CLEINT,
                              };
                              // if (notifiData.notification_type === "comment") {
                              //   blogNotifiTitle = `${authorImage.username} commented on your post`;
                              // }

                              return (
                                <div
                                  className="notification"
                                  key={Notification.id}
                                >
                                  {notifiData.is_read === 0 ? (
                                    <span className="isRead"></span>
                                  ) : (
                                    <span className="read"></span>
                                  )}

                                  <Link
                                    to={`${Url}/author/${authorImage.user_id}`}
                                    className="authorImgaeNotifi"
                                  >
                                    <img
                                      alt="User Avatar"
                                      src={
                                        authorImage.image_user || IMAGES_User
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
                                        notificationData.blog_id
                                      )
                                    }
                                  >
                                    <p>
                                      {notificationData.title ||
                                        "No title available"}
                                    </p>
                                    <div className="time">
                                      <span>
                                        {notificationData?.created_at ? (
                                          formatDistanceToNow(
                                            new Date(
                                              notificationData.created_at
                                            ),
                                            { addSuffix: true }
                                          )
                                        ) : (
                                          <span>Invalid time</span>
                                        )}
                                      </span>
                                    </div>
                                  </div>

                                  <div
                                    className="thumbnail"
                                    onClick={() =>
                                      handleMarkAsRead(
                                        notifiData.id,
                                        notificationData.blog_id
                                      )
                                    }
                                  >
                                    <img
                                      alt="Thumbnail"
                                      className="me-1"
                                      src={
                                        notificationData.image ||
                                        "https://bootdey.com/img/Content/avatar/avatar1.png"
                                      }
                                    />
                                  </div>

                                  <div className="menu-container">
                                    <i className="fas fa-ellipsis-v menu-icon"></i>
                                    <div
                                      className="notification-menu"
                                      id="notificationMenu"
                                    >
                                      <div
                                        className="notification-item"
                                        onClick={() =>
                                          handleHideNotification(notifiData.id)
                                        }
                                      >
                                        <i className="fa-regular fa-eye-slash me-2"></i>
                                        <span>Hide this notification</span>
                                      </div>
                                      <div
                                        className="notification-item"
                                        onClick={() =>
                                          turnOffAllNotifi(
                                            userProfile.user_id,
                                            authorImage.user_id
                                          )
                                        }
                                      >
                                        <i className="fa-regular fa-bell-slash me-2"></i>
                                        <span>
                                          Mute all notifications from{" "}
                                          {authorImage.full_name}
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
                            <div class="row justify-content-center">
                              <div class="col-2">
                                <div className="">
                                  <img src={Nofiti}></img>
                                </div>
                              </div>
                            </div>
                            <div class="row justify-content-center">
                              <div class="col-3">
                                <div className="notificationTextProfile">
                                  No new notifications !!
                                </div>
                              </div>
                            </div>
                            <div class="row justify-content-center">
                              <div class="col-5">
                                <div>
                                  You don't have any new notifications at all
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {Array.isArray(BlogNotification) &&
                        BlogNotification.length > 0 && (
                          <Paginator
                            currentPage={nofitiCurrentPage}
                            lastPage={nofitiLastPage}
                            setCurrentPage={setNofitiCurrentPage}
                            fetchData={fetchNotification}
                          />
                        )}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="following">
                    <div className="row">
                      {Array.isArray(BlogDeleteNotification) &&
                      BlogDeleteNotification.length > 0 ? (
                        <>
                          {BlogDeleteNotification.map((notifiData, index) => {
                            const blog = blogData[index] || {};

                            return (
                              <div
                                className="notification"
                                key={notifiData.notification_id}
                              >
                                {notifiData.is_read === 0 ? (
                                  <span className="isRead"></span>
                                ) : (
                                  <span className="read"></span>
                                )}

                                <Link className="authorImgaeNotifi">
                                  <img
                                    alt="User Avatar"
                                    src={
                                      IMAGES_HeThong ||
                                      "https://via.placeholder.com/40"
                                    }
                                    width="40"
                                    height="40"
                                  />
                                </Link>

                                <div className="content">
                                  <p>
                                    {notifiData.reason || "No title available"}
                                  </p>
                                  <div className="time">
                                    <span>
                                      {notifiData?.created_at
                                        ? formatDistanceToNow(
                                            new Date(notifiData.created_at),
                                            { addSuffix: true }
                                          )
                                        : "Invalid time"}
                                    </span>
                                  </div>
                                </div>

                                <div
                                  className="thumbnail"
                                  onClick={() =>
                                    blog.blog_id &&
                                    handleMarkAsReadBlog(
                                      notifiData.notification_id,
                                      blog.blog_id
                                    )
                                  }
                                >
                                  <img
                                    alt="Thumbnail"
                                    className="me-1"
                                    src={
                                      blog.image ||
                                      "https://bootdey.com/img/Content/avatar/avatar1.png"
                                    }
                                  />
                                </div>

                                <div className="menu-container">
                                  <i className="fas fa-ellipsis-v menu-icon"></i>
                                  <div
                                    className="notification-menu"
                                    id="notificationMenu"
                                  >
                                    <div className="notification-item">
                                      <i className="fas fa-comment-dots me-2"></i>
                                      <span>Send system feedback</span>
                                    </div>
                                    <div
                                      className="notification-item"
                                      onClick={() =>
                                        deleteNotifiBlog(
                                          notifiData.notification_id
                                        )
                                      }
                                    >
                                      <i className="fas fa-trash-alt me-2"></i>
                                      <span>Delete this notification</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <div class="row justify-content-center">
                            <div class="col-2">
                              <div className="">
                                <img src={Nofiti}></img>
                              </div>
                            </div>
                          </div>
                          <div class="row justify-content-center">
                            <div class="col-3">
                              <div className="notificationTextProfile">
                                No new notifications !!
                              </div>
                            </div>
                          </div>
                          <div class="row justify-content-center">
                            <div class="col-5">
                              <div>
                                You don't have any new notifications at all
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    {Array.isArray(BlogDeleteNotification) &&
                      BlogDeleteNotification.length > 0 && (
                        <Paginator
                          currentPage={blogCurrentPage}
                          lastPage={blogLastPage}
                          setCurrentPage={setBlogCurrentPage}
                          fetchData={fetchBlogUserData}
                        />
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

export default NofitiProfile;
