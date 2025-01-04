import IMAGES_CLEINT from "../../../assets/styles/client/images";
import IMAGES_CLEINT_POST from "../../../assets/styles/client/images/post";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchAllPaginator,
  fetchLatestBlog,
  fetchBlogsAll,
  fetchAllFollow,
} from "../../../services/Blog";
import { fetchCategoryById } from "../../../services/Category";
import { listLikesByUser } from "../../../services/Like";
import { fetchSportDetails } from "../../../services/Sports";
import { fetchUserDetails } from "../../../services/Users";
import { fetchAll } from "../../../services/Tag";
import { fetchCategories } from "../../../services/Category";
import { fetchSports } from "../../../services/Sports";
import { getUserProfile, getUserGoogleProfile } from "../../../services/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Nav, Tab } from "react-bootstrap";
import { apiUrl } from "../../../config/Api";
import BlogTopic from "./topic_blog";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import {
  fetchFollowersAll,
  fetchFollowingAll,
  followUser,
  unfollowUser,
} from "../../../services/follow";
import {
  fetchAllBlockedUsers,
  fetchBlockedUsers,
  blockUser,
  unblockUser,
  isUserBlocked,
} from "../../../services/BlockUser/index";
import Paginator from "../../admin/Paginator";
import moment from "moment";
import { Helmet } from "react-helmet";

const BlogList = () => {
  const [blogData, setBlogData] = useState([]);
  const [blogFollowData, setBlogFollowData] = useState([]);
  const [error, setError] = useState(null);
  const [categoryNames, setCategoryNames] = useState({});
  const [sportNames, setSportNames] = useState({});
  const [sports, setSports] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [userImages, setUserImages] = useState({});
  const [userName, setUserName] = useState({});
  const [userBio, setUserBio] = useState({});
  const [success, setSuccess] = useState(false);
  const [tagNames, setTagNames] = useState({});
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState("");
  const [searchKeywords, setSearchKeywords] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [followcurrentPage, setfollowCurrentPage] = useState(1);
  const [followlastPage, setFollowLastPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const [cookies, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState({});
  const [author, setAuthor] = useState({});
  const [followersData, setFollowersData] = useState([]);
  const [likeUserData, setLikeUserData] = useState([]);
  const [userFollowingData, setUserFollowingData] = useState([]);
  const [userFollowerData, setUserFollowerData] = useState([]);
  const [userData, setUserData] = useState({});
  const [lastPage, setLastPage] = useState(1);
  const [newBlog, setNewBlog] = useState(null);
  const [isCheckBlocked, setIsCheckBlocked] = useState([]);
  const [blogAllData, setBlogAllData] = useState([]);
  const [authorIds, setAuthorIds] = useState([]);

  const URL = "http://localhost:3000";
  const navigate = useNavigate();
  // console.log(authorIds);

  const loadBlogs = async (page = 1) => {
    try {
      const initialData = user.user_id
        ? await fetchAllFollow(
          apiUrl,
          user.user_id,
          page,
          setBlogData,
          setError
        )
        : await fetchAllPaginator(apiUrl, page, setBlogData, setError);

      if (!initialData || !initialData.meta || !initialData.data) {
        console.error("API không có 'meta' hoặc 'data'");
        setLastPage(1);
        return [];
      }

      const { last_page } = initialData.meta;
      setLastPage(last_page);

      const sortedBlogs = initialData.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      return sortedBlogs.slice(0, blogsPerPage);
    } catch (err) {
      console.error("Lỗi khi tải blogs:", err);
      setError("Lỗi khi tải blogs");
      return [];
    }
  };


  //   try {
  //     const initialData = await fetchAllFollow(
  //       apiUrl,
  //       user.user_id,
  //       page,
  //       setBlogFollowData,
  //       setError
  //     );
  //     if (!initialData || !initialData.meta || !initialData.data) {
  //       console.error("API không có 'meta' hoặc 'data'");
  //       setLastPage(1);
  //       return [];
  //     }

  //     const { last_page } = initialData.meta;
  //     setLastPage(last_page);

  //     const sortedBlogs = initialData.data.sort(
  //       (a, b) => new Date(b.created_at) - new Date(a.created_at)
  //     );

  //     return sortedBlogs.slice(0, blogsPerPage);
  //   } catch (err) {
  //     console.error("Lỗi khi tải blogs:", err);
  //     setError("Lỗi khi tải blogs");
  //     return [];
  //   }
  // };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const blogs = await loadBlogs(currentPage);
        const authorIds = blogs.map((b) => b.author_id);

        console.log("Author IDs:", authorIds);

        // Gọi API kiểm tra trạng thái chặn song song
        const responses = await Promise.all(
          authorIds.map((authorId) =>
            isUserBlocked(apiUrl, user.user_id, authorId)
          )
        );

        const validBlogs = blogs.filter((b, index) => {
          const response = responses[index];
          return response && response.isBlocked === false;
        });

        // Chỉ cập nhật dữ liệu nếu currentPage không bị thay đổi
        setBlogData(validBlogs);

        // Tải các dữ liệu khác nếu ở trang đầu tiên
        if (currentPage === 1) {
          await Promise.all([
            fetchCategories(apiUrl, 1, setCategories, setError),
            fetchAll(apiUrl, 1, setTags, setError),
            fetchSports(apiUrl, 1, setSports, setError),
          ]);
          FollowerData();
          LikeCount();
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, [currentPage, user.user_id]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await fetchLatestBlog(apiUrl);

        if (!data || !data.author_id) {
          console.error("Data hoặc author_id bị thiếu");
          return;
        }

        console.log("Author ID:", data.author_id);
        if (cookies.token) {
          const response = await isUserBlocked(
            apiUrl,
            user.user_id,
            data.author_id
          );
          console.log(response);

          if (isMounted && response && response.isBlocked === false) {
            setNewBlog(data);
          }
        } else {
          if (isMounted) {
            setNewBlog(data);
          }
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiUrl, user]);

  const fetchAdditionalData = async () => {
    try {
      // Fetch missing categories
      const categoryPromises = blogData
        .filter((blog) => blog.category_id && !categoryNames[blog.category_id])
        .map(async (blog) => {
          const data = await fetchCategoryById(blog.category_id);
          return {
            id: blog.category_id,
            name: data.data[0]?.name || "Unknown",
          };
        });

      const sportPromises = blogData
        .filter((blog) => blog.sport_id && !sportNames[blog.sport_id])
        .map(async (blog) => {
          const data = await fetchSportDetails(blog.sport_id);
          return { id: blog.sport_id, name: data.data[0]?.name || "Unknown" };
        });

      const userPromises = blogData
        .filter((blog) => blog.author_id && !userNames[blog.author_id])
        .map(async (blog) => {
          const data = await fetchUserDetails(blog.author_id);
          return {
            id: blog.author_id,
            name: data.data.full_name,
            image: data.data.image_user,
            username: data.data.username,
            bio: data.data.bio,
          };
        });

      const tagPromises = blogData.flatMap((blog) => {
        if (blog.tag_ids) {
          const tagIds = blog.tag_ids.split(",").map((id) => parseInt(id, 10));
          return tagIds
            .filter((tagId) => !tagNames[tagId])
            .map(async (tagId) => {
              const data = await fetchAll(
                apiUrl,
                1,
                () => { },
                () => { }
              );
              const tag = data.find((t) => t.tag_id === tagId);
              return tag ? { id: tag.tag_id, name: tag.name } : null;
            });
        }
        return [];
      });

      const [categories, sports, users, tags] = await Promise.all([
        Promise.all(categoryPromises),
        Promise.all(sportPromises),
        Promise.all(userPromises),
        Promise.all(tagPromises),
      ]);

      // Map results to state
      const categoryMap = categories.reduce(
        (acc, { id, name }) => ({ ...acc, [id]: name }),
        {}
      );
      const sportMap = sports.reduce(
        (acc, { id, name }) => ({ ...acc, [id]: name }),
        {}
      );
      const userMap = users.reduce(
        (acc, { id, name }) => ({ ...acc, [id]: name }),
        {}
      );
      const userImageMap = users.reduce(
        (acc, { id, image }) => ({ ...acc, [id]: image }),
        {}
      );
      const userBioMap = users.reduce(
        (acc, { id, bio }) => ({ ...acc, [id]: bio }),
        {}
      );
      const tagMap = tags.reduce(
        (acc, { id, name }) => ({ ...acc, [id]: name }),
        {}
      );

      // Update states with merged data
      setCategoryNames((prev) => ({ ...prev, ...categoryMap }));
      setSportNames((prev) => ({ ...prev, ...sportMap }));
      setUserNames((prev) => ({ ...prev, ...userMap }));
      setUserImages((prev) => ({ ...prev, ...userImageMap }));
      setUserBio((prev) => ({ ...prev, ...userBioMap }));
      setTagNames((prev) => ({ ...prev, ...tagMap }));
    } catch (error) {
      console.error("Failed to fetch additional data:", error);
    }
  };

  // Trigger additional data fetch whenever blogData changes
  useEffect(() => {
    if (cookies.token) {
      fetchUser();
    }
    if (blogData.length > 0) {
      fetchAdditionalData();
    }
  }, [cookies.token, blogData]);

  const getLatestApprovedBlog = () => {
    return blogData.find(
      (blog) => blog.status === "approved" && blog.is_delete === 0
    );
  };
  const latestBlog = getLatestApprovedBlog();

  const fetchUser = async () => {
    try {
      let userData;
      let authorData;
      try {
        userData = await getUserProfile(cookies.token);
        authorData = await fetchUserDetails(latestBlog.author_id);
        setUser(userData);

        //--------------/ danh sách follower và following của user profile
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
      } catch (e) {
        console.log(
          "Đăng nhập thường không thành công, thử đăng nhập Google..."
        );
        userData = await getUserGoogleProfile(cookies.token);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      setError("Lỗi khi lấy dữ liệu người dùng.");
    }
  };

  const LikeCount = async (author_id) => {
    try {
      const response = await listLikesByUser(apiUrl, author_id, (likeData) => {
        const likeCount = likeData.length;

        setLikeUserData((prevState) => ({
          ...prevState,
          [author_id]: likeCount,
        }));
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách like:", error);
      setError("Lỗi khi lấy danh sách like");
    }
  };

  const UserButton = ({ userId, following, followers }) => {
    const isFollowing = following.includes(userId);

    const isFollower = followers.includes(userId);

    const isFriend = isFollowing && isFollower;

    const renderButton = () => {
      if (isFriend) {
        return (
          <Button
            variant="primary"
            className="follow-btn-author ms-auto"
            onClick={() => unfollow(userId)}
          >
            Friend
          </Button>
        );
      } else if (isFollowing) {
        return (
          <Button
            variant="secondary"
            className="follow-btn-author ms-auto"
            onClick={() => unfollow(userId)}
          >
            Following
          </Button>
        );
      } else {
        return (
          <Button
            variant="outline-danger"
            className="follow-btn-author ms-auto"
            onClick={() => follow(userId)}
          >
            Follow
          </Button>
        );
      }
    };

    return <div>{renderButton()}</div>;
  };

  const follow = async (followed_id) => {
    if (cookies.token) {
      try {
        await followUser(apiUrl, user.user_id, followed_id);
        await fetchUser();
        await FollowerData(followed_id);
        toast.success("Followed successfully!", { autoClose: 1000 });
      } catch (error) {
        console.error("Error following user:", error);
        toast.error(
          "An error occurred while tracking, please check your login!",
          { autoClose: 1000 }
        );
      }
      return;
    } else {
      navigate("/login");
      return;
    }
  };

  const unfollow = async (followed_id) => {
    try {
      await unfollowUser(apiUrl, user.user_id, followed_id);
      await fetchUser();
      await FollowerData(followed_id);
      toast.success("Unfollowed successfully!", { autoClose: 1000 });
    } catch (error) {
      console.error("Error unfollowing user:", error);
      toast.error("An error occurred while unfollowing!", { autoClose: 1000 });
    }
  };

  const FollowerData = async (author_id) => {
    try {
      const response = await fetchFollowersAll(apiUrl, author_id, setError);
      const followerCount = response.data.length;
      setFollowersData((prevState) => ({
        ...prevState,
        [author_id]: followerCount,
      }));
    } catch (error) {
      console.error("Lỗi khi lấy danh sách follower:", error);
      setError("Lỗi khi lấy danh sách follower");
    }
  };

  useEffect(() => {
    if (blogData.length > 0) {
      blogData.forEach((blog) => {
        FollowerData(blog.author_id);
        LikeCount(blog.author_id);
      });
    }
  }, [blogData]);

  const isUserFollowing = userFollowingData.map(
    (following) => following.user_id
  );
  const isUserFollower = userFollowerData.map((follower) => follower.user_id);

  return (
    <main>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="section-title">New post</h1>
            </div>
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="row">

                {blogData
                  .filter(
                    (blog) => !blog.is_delete && blog.status === "approved"
                  )
                  .map((blog, index) => (
                    <div
                      className="col-md-6 col-lg-6 col-sm-12 mb-4"
                      key={blog.blog_id}
                    >
                      {" "}
                      {/* Added key for list item */}
                      <article className="card article-card h-100">
                        {/* Link to Blog Details */}
                        <Link to={`/blog/detail/${blog.blog_id}`}>
                          {/* Blog Image */}
                          <div className="card-image">
                            <div className="post-info d-flex justify-content-between text-white p-2">
                              <span>
                                cr:{" "}
                                {moment(blog.created_at).format("DD/MM/YYYY")}
                              </span>
                              <span>
                                up:{" "}
                                {moment(blog.update_at).format("DD/MM/YYYY")}
                              </span>
                            </div>
                            <img
                              loading="lazy"
                              src={blog.image}
                              alt="Hình đại diện bài viết"
                              className="card-img-top"
                              style={{
                                objectFit: "cover",
                                height: "250px",
                              }}
                            />
                          </div>
                        </Link>

                        <div className="card-body px-0 pb-0 ">
                          {/* Blog Content */}
                          <div className="card-body px-3 pb-3">
                            <div className="d-flex justify-content-between align-items-center">
                              {/* Tags */}
                              <ul className="post-meta d-flex flex-wrap mb-2">
                                {blog.tag_ids &&
                                  blog.tag_ids.split(",").map((tagId) => (
                                    <li key={tagId} className="me-2">
                                      <Link
                                        to={`/blog/tag/${tagId}`}
                                        className="text-decoration-none"
                                      >
                                        #{tagNames[tagId]}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>

                              {/* Author */}
                              {blog.author_id === user.user_id ? (
                                <div className="follow_author_blog">
                                  <div className="d-flex align-items-center ms-auto">
                                    <div className="dropdown">
                                      <div
                                        className="dropdown-toggle"
                                        id="dropdownMenuButton1"
                                        aria-expanded="false"
                                      >
                                        <Link to={`${URL}/profile`}>
                                          <img
                                            src={
                                              userImages[blog.author_id] ||
                                              "https://bootdey.com/img/Content/avatar/avatar1.png"
                                            }
                                            alt="Author"
                                            className="rounded-circle"
                                            width="30"
                                            height="30"
                                          />
                                          <span className="ms-2 text-dark">
                                            {userNames[blog.author_id]}
                                          </span>
                                        </Link>
                                      </div>
                                      <div
                                        className="dropdown-menu user-info-dropdown"
                                        aria-labelledby="dropdownMenuButton1"
                                      >
                                        <div className="dropdown-item">
                                          <div className="d-flex align-items-center justify-content-between">
                                            <Link to={`${URL}/author`}>
                                              <div className="d-flex align-items-center">
                                                <img
                                                  src={
                                                    userImages[
                                                    blog.author_id
                                                    ] ||
                                                    "https://bootdey.com/img/Content/avatar/avatar1.png"
                                                  }
                                                  alt="Author"
                                                  className="rounded-circle"
                                                  width="40"
                                                  height="40"
                                                />
                                                <div className="ms-3 me-3">
                                                  <h6 className="mb-0">
                                                    {userNames[blog.author_id]}
                                                  </h6>
                                                  <p className="text-muted mb-0">
                                                    @{userName[blog.author_id]}
                                                  </p>
                                                </div>
                                              </div>
                                            </Link>

                                            {blog.author_id ===
                                              userData.user_id && (
                                                <UserButton
                                                  userId={blog.author_id}
                                                  following={isUserFollowing}
                                                  followers={isUserFollower}
                                                />
                                              )}
                                          </div>

                                          <div className="d-flex justify-content-between mt-2">
                                            <span className="me-3">
                                              {followersData[blog.author_id] ||
                                                0}{" "}
                                              Follower
                                            </span>
                                            <span>
                                              {likeUserData[blog.author_id] ||
                                                0}{" "}
                                              Likes
                                            </span>
                                          </div>
                                          <p className="mt-2 bio_author">
                                            {userBio[blog.author_id]}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="follow_author_blog">
                                  <div className="dropdown">
                                    <div
                                      className="dropdown-toggle"
                                      id="dropdownMenuButton1"
                                      aria-expanded="false"
                                    >
                                      <Link
                                        to={`${URL}/author/${blog.author_id}`}
                                      >
                                        <img
                                          src={
                                            userImages[blog.author_id] ||
                                            "https://bootdey.com/img/Content/avatar/avatar1.png"
                                          }
                                          alt="Author"
                                          className="rounded-circle"
                                          width="30"
                                          height="30"
                                        />
                                        <span className="text-dark">
                                          {userNames[blog.author_id]}
                                        </span>
                                      </Link>
                                    </div>
                                    <div
                                      className="dropdown-menu user-info-dropdown"
                                      aria-labelledby="dropdownMenuButton1"
                                    >
                                      <div className="dropdown-item">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <Link
                                            to={`${URL}/author/${blog.author_id}`}
                                          >
                                            <div className="d-flex align-items-center">
                                              <img
                                                src={
                                                  userImages[blog.author_id] ||
                                                  "https://bootdey.com/img/Content/avatar/avatar1.png"
                                                }
                                                alt="Author"
                                                className="rounded-circle"
                                                width="40"
                                                height="40"
                                              />
                                              <div className="ms-3 me-3">
                                                <h6 className="mb-0">
                                                  {userNames[blog.author_id]}
                                                </h6>
                                                <p className="text-muted mb-0">
                                                  @{userName[blog.author_id]}
                                                </p>
                                              </div>
                                            </div>
                                          </Link>

                                          {blog.author_id !== user.user_id && (
                                            <div className="ms-auto">
                                              <UserButton
                                                userId={blog.author_id}
                                                following={isUserFollowing}
                                                followers={isUserFollower}
                                              />
                                            </div>
                                          )}
                                        </div>

                                        <div className="d-flex justify-content-between mt-2">
                                          <span className="me-3">
                                            {followersData[blog.author_id] || 0}{" "}
                                            Follower
                                          </span>
                                          <span>
                                            {likeUserData[blog.author_id] || 0}{" "}
                                            Likes
                                          </span>
                                        </div>

                                        <p className="mt-2 bio_author">
                                          {userBio[blog.author_id]}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <span className="badge bg-secondary">
                            {sportNames[blog.sport_id]}
                          </span>

                          <h2>
                            <Link
                              className="post-title"
                              to={`/blog/detail/${blog.blog_id}`}
                            >
                              {blog.title}
                            </Link>
                          </h2>
                          <p
                            className="card-text"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {blog.short_description}
                          </p>
                          <div className="content">
                            <Link
                              className="read-more-btn"
                              to={`/blog/detail/${blog.blog_id}`}
                            >
                              See Full Page
                            </Link>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}

                <Paginator
                  currentPage={currentPage}
                  lastPage={lastPage}
                  setCurrentPage={setCurrentPage}
                  fetchData={(page) => {
                    // Kiểm tra xem người dùng có đăng nhập chưa
                    if (user.user_id) {
                      return fetchAllFollow(
                        apiUrl,
                        user.user_id,
                        page,
                        setBlogData,
                        setError
                      );
                    } else {
                      return fetchAllPaginator(
                        apiUrl,
                        page,
                        setBlogData,
                        setError
                      );
                    }
                  }}
                />

              </div>
            </div>
            <div className="col-lg-4">
              <BlogTopic />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogList;
