import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { apiUrl } from "../../../../config/Api";
import ProfileSidebar from "../../../../components/client/auth/profile/sidebar";
import ImgaeFollow from "../../../../assets/images/background/chuaCoFollow.png";
import ImgaeBlock from "../../../../assets/images/background/chuaCoBlock.png";
import {
  fetchFollowers,
  fetchFollowing,
  followUser,
  unfollowUser,
  fetchFollowersAll,
  fetchFollowingAll,
} from "../../../../services/follow";
import { LikedPosts } from "../../../../services/Like";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Url } from "../../../../config/Api";
import { motion } from "framer-motion";
import {
  getUserProfile,
  getUserGoogleProfile,
  logout,
  handleLogout,
} from "../../../../services/Auth";

import {
  fetchAllBlockedUsers,
  fetchBlockedUsers,
  blockUser,
  unblockUser,
  isUserBlocked,
} from "../../../../services/BlockUser/index";
import { useForm } from "react-hook-form";
import { Button, Nav, Tab } from "react-bootstrap";
import { fetchBlogUser, fetchAllBlogUser } from "../../../../services/Blog";
import { fetchReports, deleteReport } from "../../../../services/Reports";
import Paginator from "../../../admin/Paginator";
import { Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";

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
  const [blockUserData, setBlockUserBlogData] = useState([]);
  const [blockAllUserData, setBlockAllUserBlogData] = useState([]);
  const [blockUsercurrentPage, setblockUserCurrentPage] = useState(1);
  const [blockUserLastPage, setblockUserLastPage] = useState(1);

  const [postLikesData, setPostLikesData] = useState([]);
  const [postLikesTotal, setPostLikesTotal] = useState(0);
  const [postLikesCurrentPage, setPostLikesCurrentPage] = useState(1);
  const [postLikesLastPage, setPostLikesLastPage] = useState(1);

  const [followersCurrentPage, setFollowersCurrentPage] = useState(1);
  const [followersLastPage, setFollowersLastPage] = useState(1);
  const [followingCurrentPage, setFollowingCurrentPage] = useState(1);
  const [followingLastPage, setFollowingLastPage] = useState(1);
  const [isFollowingUpdated, setIsFollowingUpdated] = useState(false);
  const [isBlogUpdated, setIsBlogUpdated] = useState(false);
  const [isFollowingMap, setIsFollowingMap] = useState({});
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [reportsData, setReportsData] = useState([]);
  const [reportCurrentPage, setRportCurrentPage] = useState(1);
  const [reportLastPage, setReportLastPage] = useState(1);
  const navigate = useNavigate();
  const currentUser = user;

  console.log(reportsData);

  useEffect(() => {
    if (cookies.token) {
      fetchUser();
      fetchBlogUserData(currentPage);
    } else {
      navigate("/login");
    }
  }, [cookies.token, navigate, currentPage]);

  useEffect(() => {
    if (isFollowingUpdated) {
      fetchFollowersData(followersCurrentPage);
      fetchFollowingData(followingCurrentPage);
      fetchBlockUserData(blockUsercurrentPage);
      fetchPostLikesData(postLikesCurrentPage);
      setIsFollowingUpdated(false);
    }
  }, [
    isFollowingUpdated,
    followersCurrentPage,
    followingCurrentPage,
    postLikesCurrentPage,
  ]);

  useEffect(() => {
    const followingMap = followingData.reduce((acc, following) => {
      acc[following.user_id] = true;
      return acc;
    }, {});
    setIsFollowingMap(followingMap);
  }, [followingData]);

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
        await fetchAllBlockedUsers(
          apiUrl,
          data.user_id,
          setBlockAllUserBlogData,
          setError
        );
        await fetchAllBlockedUsers(
          apiUrl,
          data.user_id,
          setBlockAllUserBlogData,
          setError
        );
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

  const fetchReportsPagi = async (page = 1) => {
    fetchReports(apiUrl, user.user_id, page, setReportsData, setError)
      .then((response) => {
        if (response && response.meta) {
          setReportLastPage(response.meta.last_page);
        } else {
          console.error("API response thiếu 'meta' hoặc 'last_page'");
          setReportLastPage(1);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu báo cáo:", err);
        setError("Lỗi khi lấy dữ liệu báo cáo");
      });
  };

  const deleteReports = async (reportId) => {
    try {
      console.log("Deleting report:", reportId);
      const response = await deleteReport(apiUrl, reportId);
      console.log("Delete response:", response);
      toast.success("Report permanently deleted!", { autoClose: 1000 });

      // Refresh dữ liệu
      fetchReportsPagi(
        apiUrl,
        reportCurrentPage,
        setReportsData,
        setError,
        setLastPage
      );
    } catch (err) {
      console.error("Delete report error:", err);
      toast.error(`Error: ${err.message}`);
    }
  };

  const fetchBlogUserData = async (page = 1) => {
    let profileId;

    try {
      profileId = await getUserProfile(cookies.token);
    } catch (e) {
      console.log("Failed to get user profile");
    }
    fetchBlogUser(apiUrl, profileId.user_id, page, setBlogData, setError)
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
  };

  const fetchFollowersData = (page) => {
    fetchFollowers(apiUrl, user.user_id, page, setFollowersData)
      .then((response) => {
        if (response && response.meta) {
          setFollowersLastPage(response.meta.last_page); // Giữ nguyên trang hiện tại
        } else {
          console.error("API response thiếu 'meta' hoặc 'last_page'");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu follower:", err);
      });
  };

  const fetchFollowingData = (page) => {
    fetchFollowing(apiUrl, user.user_id, page, setFollowingData)
      .then((response) => {
        if (response && response.meta) {
          setFollowingLastPage(response.meta.last_page); // Giữ nguyên trang hiện tại
        } else {
          console.error("API response thiếu 'meta' hoặc 'last_page'");
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu following:", err);
      });
  };

  const follow = async (followed_id) => {
    if (isFollowingMap[followed_id]) {
      toast.error("You are already following this user!", { autoClose: 1000 });
      return;
    }

    try {
      await followUser(apiUrl, user.user_id, followed_id);
      await fetchUser();
      setIsFollowingMap((prev) => ({ ...prev, [followed_id]: true }));
      toast.success("Followed successfully!", { autoClose: 1000 });
      // setIsFollowingUpdated(true);
    } catch (error) {
      console.error("Error following user:", error);
      toast.error("An error occurred while following!", { autoClose: 1000 });
    }
  };

  const unfollow = async (followed_id) => {
    if (!isFollowingMap[followed_id]) {
      toast.error("You are not following this user!", { autoClose: 1000 });
      return;
    }

    try {
      await unfollowUser(apiUrl, user.user_id, followed_id);
      await fetchUser();
      setIsFollowingMap((prev) => ({ ...prev, [followed_id]: false }));
      toast.success("Unfollowed successfully!", { autoClose: 1000 });
      // setIsFollowingUpdated(true)
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast.error("An error occurred while unfollowing!", { autoClose: 1000 });
    }
  };

  const fetchPostLikesData = async (page = 1) => {
    LikedPosts(apiUrl, user.user_id, page)
      .then((response) => {
        if (response && response.meta) {
          setPostLikesData(response.data);  // Lưu danh sách bài viết đã like vào state
          setPostLikesTotal(response.meta.total);  // Lưu tổng số bài viết đã like vào state (sử dụng từ meta)
        }
      })
      .catch((error) => {
        console.error("Error fetching post likes:", error);
      });
  };

  useEffect(() => {
    if (user && user.user_id) {
      fetchPostLikesData();  // Gọi API ngay khi có user_id
    }
  }, [user]);

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

  const fetchBlockUserData = async (page = 1) => {
    fetchBlockedUsers(
      apiUrl,
      user.user_id,
      page,
      setBlockUserBlogData,
      setError
    )
      .then((response) => {
        if (response && response.meta) {
          setblockUserLastPage(response.meta.last_page);
        } else {
          console.error("API response thiếu 'meta' hoặc 'last_page'");
          setblockUserLastPage(1);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu blog:", err);
        setError("Lỗi khi lấy dữ liệu blog");
      });
  };

  const unBlockUser = async (blockedId) => {
    try {
      await unblockUser(apiUrl, user.user_id, blockedId, setError);
      await fetchBlockUserData(blockUsercurrentPage);
      await fetchUser();
      toast.success("Unblock user successfully!", { autoClose: 1000 });
    } catch (error) {
      console.error("Error Unblock user:", error);
      toast.error("An error occurred while Unblock!", { autoClose: 1000 });
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
      <div className="author-client user-profile">
        <div className="row">
          <ProfileSidebar />
          <div className="col-md-8 backG-proflie">
            <span className="profile-info-author-title">Activity Overview</span>
            <div className="profile-info-right mt-3">
              <Tab.Container defaultActiveKey="activities">
                <Nav
                  variant="pills"
                  className="nav-pills-custom-minimal pb-2 d-flex align-items-center"
                  style={{
                    gap: "10px",
                    flexWrap: "nowrap",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Nav.Item>
                    <Nav.Link
                      eventKey="activities"
                      className="button-author-follow text-center"
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.5rem 1rem",
                        minWidth: "90px",
                      }}
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
                      className="text-center"
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.5rem 1rem",
                        minWidth: "90px",
                      }}
                    >
                      {followersAllData.length} Followers
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="following"
                      onClick={() => fetchFollowingData(followingCurrentPage)}
                      className="text-center"
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.5rem 1rem",
                        minWidth: "90px",
                      }}
                    >
                      {followingAllData.length} Following
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="blockUsers"
                      onClick={() => fetchBlockUserData(blockUsercurrentPage)}
                      className="text-center"
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.5rem 1rem",
                        minWidth: "90px",
                      }}
                    >
                      {blockAllUserData.length} Block
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="postLikes"
                      onClick={() => fetchPostLikesData(postLikesCurrentPage)}
                      className="text-center"
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.5rem 1rem",
                        minWidth: "90px",
                      }}
                    >
                        {postLikesData.length} Post Likes
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="listReports"
                      onClick={() => fetchReportsPagi(reportCurrentPage)}
                      className="text-center"
                      style={{
                        fontSize: "0.85rem",
                        padding: "0.5rem 1rem",
                        minWidth: "90px",
                      }}
                    >
                      {reportsData.length} Reports
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="activities">
                    {Array.isArray(blogData) && blogData.length > 0 ? (
                      <>
                        {blogData.map((blog) => (
                          <div
                            className="media activity-item d-flex justify-content-between align-items-center mb-3"
                            key={blog.blog_id}
                          >
                            <div className="d-flex">
                              <Link
                                to={`http://103.72.96.123/blog/detail/${blog.blog_id}`}
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
                                  to={`http://103.72.96.123/blog/detail/${blog.blog_id}`}
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

                            {/* Nút Edit */}
                            <Link
                              to={`/profile/edit_blog/${blog.blog_id}`}
                              className="btn-sm app-btn-secondary"
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </Link>
                          </div>
                        ))}
                        <Paginator
                          currentPage={currentPage}
                          lastPage={lastPage}
                          setCurrentPage={setCurrentPage}
                          fetchData={fetchBlogUserData}
                        />
                      </>
                    ) : (
                      <p>No blog posts found.</p>
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey="followers">
                    {followersData.length > 0 ? (
                      <>
                        {followersData.map((follower) => {
                          const isFollowing = followingAllData.some(
                            (following) =>
                              following.user_id === follower.user_id
                          );

                          return (
                            <div
                              className="user-following  author-client__user-follower media"
                              key={follower.user_id}
                            >
                              <Link to={`/author/${follower.user_id}`}>
                                <img
                                  src={
                                    follower.image_user ||
                                    "https://bootdey.com/img/Content/avatar/avatar1.png"
                                  }
                                  alt="User Avatar"
                                  className="author-client__user-follower-avatar media-object"
                                />
                              </Link>

                              <div className="user-following-body">
                                <Link to={`/author/${follower.user_id}`}>
                                  {follower.full_name}
                                  <br />
                                  <span className="author-client__user-follower-username text-muted">
                                    @{follower.username}
                                  </span>{" "}
                                </Link>
                                <Button
                                  variant={
                                    isFollowing ? "secondary" : "success"
                                  }
                                  size="sm"
                                  className=" pull-right"
                                  onClick={() =>
                                    isFollowing
                                      ? unfollow(follower.user_id)
                                      : follow(follower.user_id)
                                  }
                                >
                                  {isFollowing ? "Friend" : "Follow"}
                                </Button>
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
                    ) : (
                      <>
                        <div class="row justify-content-center">
                          <div class="col-2">
                            <div className="">
                              <img src={ImgaeFollow} width="70px"></img>
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-center">
                          <div class="col-3">
                            <div className="notificationTextProfile">
                              No one is following !!
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-center">
                          <div class="col-5">
                            <div>You currently have no one following you</div>
                          </div>
                        </div>
                      </>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="following">
                    {followingData.length > 0 ? (
                      <>
                        {followingData.map((following) => {
                          const isFollowing = followingAllData.some(
                            (item) => item.user_id === following.user_id
                          );

                          return (
                            <div
                              className="media user-following author-client__user-follower"
                              key={following.user_id}
                            >
                              <Link to={`/author/${following.user_id}`}>
                                <img
                                  src={
                                    following.image_user ||
                                    "https://bootdey.com/img/Content/avatar/avatar5.png"
                                  }
                                  alt="User Avatar"
                                  className="user-following-image"
                                />
                              </Link>
                              <div className="user-following-body">
                                <Link to={`/author/${following.user_id}`}>
                                  {following.full_name}
                                  <br />
                                  <span className="text-muted username">
                                    @{following.username}
                                  </span>
                                </Link>

                                <Button
                                  variant={
                                    isFollowingMap[following.user_id]
                                      ? "danger"
                                      : "success"
                                  }
                                  size="sm"
                                  onClick={() =>
                                    isFollowingMap[following.user_id]
                                      ? unfollow(following.user_id)
                                      : follow(following.user_id)
                                  }
                                >
                                  {isFollowingMap[following.user_id]
                                    ? "Following"
                                    : "Follow"}
                                </Button>
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
                    ) : (
                      <>
                        <div class="row justify-content-center">
                          <div class="col-2">
                            <div className="">
                              <img src={ImgaeFollow} width="70px"></img>
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-center">
                          <div class="col-3">
                            <div className="notificationTextProfile">
                              No one is following !!
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-center">
                          <div class="col-5">
                            <div>You are not currently following any users</div>
                          </div>
                        </div>
                      </>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="blockUsers">
                    {Array.isArray(blockUserData) &&
                    blockUserData.length > 0 ? (
                      <>
                        {blockUserData.map((blockUser, index) => {
                          return (
                            <div className="user-following author-client__user-follower media">
                              <Link to={`/author/${blockUser.blocked_id}`}>
                                <img
                                  src={
                                    blockUser.image_user ||
                                    "https://bootdey.com/img/Content/avatar/avatar1.png"
                                  }
                                  alt="User Avatar"
                                  className="author-client__user-follower-avatar media-object"
                                />
                              </Link>

                              <div className="user-following-body">
                                <Link to={`/author/${blockUser.blocked_id}`}>
                                  {blockUser.full_name}
                                  <br />
                                  <span className="author-client__user-follower-username text-muted">
                                    {blockUser.username}
                                  </span>{" "}
                                </Link>
                                <Button
                                  variant={"danger"}
                                  size="sm"
                                  className="author-client__follow-button pull-right"
                                  onClick={() => {
                                    unBlockUser(blockUser.blocked_id);
                                  }}
                                >
                                  Unblock
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                        <Paginator
                          currentPage={blockUsercurrentPage}
                          lastPage={blockUserLastPage}
                          setCurrentPage={setblockUserCurrentPage}
                          fetchData={fetchBlockUserData}
                        />
                      </>
                    ) : (
                      <>
                        <div class="row justify-content-center">
                          <div class="col-2">
                            <div className="">
                              <img src={ImgaeBlock} width="80px"></img>
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-center">
                          <div class="col-3">
                            <div className="notificationTextProfile">
                              Do not block any users !!
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-center">
                          <div class="col-5">
                            <div>You are not currently blocking any users</div>
                          </div>
                        </div>
                      </>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="postLikes">
                    {Array.isArray(postLikesData) &&
                    postLikesData.length > 0 ? (
                      <>
                        {postLikesData.map((post) => (
                          <motion.div
                            className="media activity-item d-flex justify-content-between align-items-center mb-3"
                            key={post.blog_id}
                            whileHover={{ x: 10 }} // Khi hover, phần tử sẽ dịch chuyển sang phải 10px
                            transition={{ type: "spring", stiffness: 300 }} // Điều chỉnh độ mềm mại của chuyển động
                          >
                            <div className="d-flex">
                              <Link
                                to={`http://103.72.96.123/blog/detail/${post.blog_id}`}
                                className="pull-left me-3"
                              >
                                <img
                                  src={
                                    post.image ||
                                    "https://bootdey.com/img/Content/avatar/avatar1.png"
                                  }
                                  alt="Post"
                                  className="media-object avatar"
                                />
                              </Link>
                              <div className="media-body">
                                <Link
                                  to={`http://103.72.96.123/blog/detail/${post.blog_id}`}
                                >
                                  <p className="activity-title">
                                    <a href="#" className="text-dark">
                                      {post.title}
                                    </a>
                                    <small className="text-muted">
                                      -{" "}
                                      {formatDistanceToNow(
                                        new Date(post.liked_at),
                                        {
                                          addSuffix: true,
                                        }
                                      )}
                                    </small>
                                  </p>
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <Paginator
                          currentPage={postLikesCurrentPage}
                          lastPage={postLikesLastPage}
                          setCurrentPage={setPostLikesCurrentPage}
                          fetchData={fetchPostLikesData}
                        />
                      </>
                    ) : (
                      <div className="row justify-content-center">
                        <div className="col-5">
                          <div>No posts liked yet</div>
                        </div>
                      </div>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="listReports">
                    {Array.isArray(blockUserData) && reportsData.length > 0 ? (
                      <>
                        {reportsData.map((report) => {
                          return (
                            <div
                              className="notification"
                              key={report.report_id}
                            >
                              <Link to={`/blog/detail/${report.blog_id}`}>
                                <div className="thumbnail">
                                  <img
                                    alt="Thumbnail"
                                    className="me-1"
                                    src={
                                      report.blog_image ||
                                      "https://bootdey.com/img/Content/avatar/avatar1.png"
                                    }
                                  />
                                </div>
                              </Link>

                              <div className="content">
                                <p className="fs-6">
                                  {report.reason || "No reason available"}
                                </p>
                                <div className="time">
                                  <span>
                                    {formatDistanceToNow(
                                      new Date(report.updated_at),
                                      {
                                        addSuffix: true,
                                      }
                                    )}
                                  </span>
                                </div>
                              </div>

                              <div className="thumbnail"></div>

                              {report.status !== "pending" && (
                                <div className="menu-container">
                                  <i className="fas fa-ellipsis-v menu-icon"></i>
                                  <div
                                    className="notification-menu"
                                    id="notificationMenu"
                                  >
                                    <div
                                      className="notification-item p-2"
                                      onClick={() =>
                                        deleteReports(report.report_id)
                                      }
                                    >
                                      <i className="bi bi-trash"></i>
                                      <span>Delete report</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <div class="row justify-content-center">
                          <div class="col-2">
                            <div className="">
                              {/* <img src={Nofiti}></img> */}
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-center">
                          <div class="col-3">
                            <div className="notificationTextProfile">
                              There are no reported!!
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-center">
                          <div class="col-5">
                            <div>
                              You currently do not have reported posts!!
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <Paginator
                      currentPage={reportCurrentPage}
                      lastPage={reportLastPage}
                      setCurrentPage={setRportCurrentPage}
                      fetchData={fetchReportsPagi}
                    />
                  </Tab.Pane>
                  ;
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
