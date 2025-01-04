import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchBlogsByTag } from "../../../services/Blog"; // Điều chỉnh tên hàm này nếu cần
import { fetchCategoryById } from "../../../services/Category";
import { fetchSportDetails } from "../../../services/Sports";
import { fetchUserDetails } from "../../../services/Users";
import { fetchAll } from "../../../services/Tag";
import { apiUrl } from "../../../config/Api";
import moment from "moment";
import BlogTopic from "./topic_blog";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const BlogTag = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [error, setError] = useState(null);
  const [categoryNames, setCategoryNames] = useState({});
  const [currentTag, setCurrentTags] = useState("");
  const [sportNames, setSportNames] = useState({});
  const [userNames, setUserNames] = useState({});
  const [userImages, setUserImages] = useState({});
  const [tagNames, setTagNames] = useState({});
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);

  useEffect(() => {
    // Fetch blogs by tag
    console.log("Fetching blogs by tag...");
    fetchBlogsByTag(id, setBlogData, setError); // Hàm này cần được định nghĩa trong services/Blog
  }, [id]);

  useEffect(() => {
    // Update filteredBlogs when blogData changes
    console.log("Updating filtered blogs...");
    setFilteredBlogs(blogData);
  }, [blogData]);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      const categoryPromises = blogData
        .filter((blog) => blog.category_id && !categoryNames[blog.category_id])
        .map((blog) =>
          fetchCategoryById(blog.category_id).then((data) => ({
            id: blog.category_id,
            name: data.data[0].name,
          }))
        );

      const sportPromises = blogData
        .filter((blog) => blog.sport_id && !sportNames[blog.sport_id])
        .map((blog) =>
          fetchSportDetails(blog.sport_id).then((data) => ({
            id: blog.sport_id,
            name: data.data[0].name,
          }))
        );

      const userPromises = blogData
        .filter((blog) => blog.author_id && !userNames[blog.author_id])
        .map((blog) =>
          fetchUserDetails(blog.author_id).then((data) => ({
            id: blog.author_id,
            name: data.data?.full_name,
            image: data.data?.image_user,
          }))
        );

      const tagPromises = blogData.flatMap((blog) => {
        if (blog.tag_ids) {
          const tagIds = blog.tag_ids.split(",").map((id) => parseInt(id, 10));
          return tagIds.map((tagId) =>
            fetchAll(
              apiUrl,
              1,
              () => { },
              () => { }
            ).then((data) => {
              const tag = data.find((t) => t.tag_id === tagId);
              return tag ? { id: tag.tag_id, name: tag.name } : null;
            })
          );
        }
        return [];
      });

      try {
        const [categoryResults, sportResults, userResults, tagResults] =
          await Promise.all([
            Promise.all(categoryPromises),
            Promise.all(sportPromises),
            Promise.all(userPromises),
            Promise.all(tagPromises),
          ]);

        const categoryMap = categoryResults.reduce(
          (acc, { id, name }) => ({ ...acc, [id]: name }),
          {}
        );
        const sportMap = sportResults.reduce(
          (acc, { id, name }) => ({ ...acc, [id]: name }),
          {}
        );
        const userMap = userResults.reduce(
          (acc, { id, name }) => ({ ...acc, [id]: name }),
          {}
        );
        const userImageMap = userResults.reduce(
          (acc, { id, image }) => ({ ...acc, [id]: image }),
          {}
        );
        const tagMap = tagResults.reduce(
          (acc, { id, name }) => ({ ...acc, [id]: name }),
          {}
        );

        if (tagMap[id]) {
          setCurrentTags(tagMap[id]);
        }
        console.log(tagMap);

        setCategoryNames(categoryMap);
        setSportNames(sportMap);
        setUserNames(userMap);
        setUserImages(userImageMap);
        setTagNames(tagMap);
      } catch (error) {
        console.error("Failed to fetch additional data:", error);
      }
    };

    if (blogData.length > 0) {
      fetchAdditionalData();
    }
  }, [blogData]);

  // Logic for Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredBlogs.length / blogsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumbs mb-4">
                <Link to="/">Home</Link>
                <span className="mx-1">/</span>
                <Link to="#!">Tag</Link>
              </div>
              <h1 className="mb-4 border-bottom border-primary d-inline-block">
                Blogs by Tags: {currentTag || "Loading..."}
              </h1>
              <Helmet>
                <title>{currentTag || "Not found"}</title>
              </Helmet>
            </div>
            <div className="col-lg-8 mb-5 mb-lg-0">
              <div className="row">
                {currentBlogs
                  .filter(
                    (blog) => !blog.is_delete && blog.status === "approved"
                  )
                  .map((blog, index) => (
                    <div className="col-md-6 mb-4">
                      <article className="card article-card article-card-sm h-100">
                        <Link to={`/blog/detail/${blog.blog_id}`}>
                          <div className="card-image">
                            <div className="post-info">
                              <span className="text-uppercase">
                                cr:{" "}
                                {moment(blog.created_at).format("DD/MM/YYYY")}
                              </span>
                              <span className="text-uppercase">
                                up:{" "}
                                {moment(blog.update_at).format("DD/MM/YYYY")}
                              </span>
                            </div>
                            <img
                              loading="lazy"
                              decoding="async"
                              src={blog.image}
                              alt="Hình đại diện bài viết"
                              className="card-img-top"
                              style={{ objectFit: 'cover', height: '250px', width: '480px' }}
                            />
                          </div>
                        </Link>
                        <div className="card-body px-0 pb-0 ">
                          <div className="d-flex justify-content-end">
                            <ul className="post-meta mb-2 d-flex">
                              {blog.tag_ids &&
                                blog.tag_ids.split(",").map((tagId) => (
                                  <li key={tagId}>
                                    <Link to={`/blog/tag/${tagId}`}>
                                      #{tagNames[tagId]}
                                    </Link>
                                  </li>
                                ))}
                            </ul>

                            <div className="d-flex align-items-center ms-auto">
                              <img
                                src={userImages[blog.author_id]}
                                alt="Author"
                                className="rounded-circle"
                                width="30"
                                height="30"
                              />
                              <span className="ms-2">
                                {userNames[blog.author_id]}
                              </span>
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
                            {blog.context}
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
                <div className="col-12">
                  <div className="row">
                    <div className="col-12">
                      <nav className="mt-4">
                        {/* pagination */}
                        <nav className="mb-md-50">
                          <ul className="pagination justify-content-center">
                            <li
                              className={`page-item ${currentPage === 1 ? "disabled" : ""
                                }`}
                            >
                              <a
                                className="page-link"
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                                aria-label="Pagination Arrow"
                                tabIndex="-1"
                                aria-disabled={currentPage === 1}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="26"
                                  height="26"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                                  />
                                </svg>
                              </a>
                            </li>
                            {pageNumbers.map((number) => (
                              <li
                                key={number}
                                className={`page-item ${currentPage === number ? "active" : ""
                                  }`}
                              >
                                <a
                                  className="page-link"
                                  onClick={() => handlePageChange(number)}
                                >
                                  {number}
                                </a>
                              </li>
                            ))}
                            <li
                              className={`page-item ${currentPage === pageNumbers.length
                                  ? "disabled"
                                  : ""
                                }`}
                            >
                              <a
                                className="page-link"
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                                aria-label="Pagination Arrow"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="26"
                                  height="26"
                                  fill="currentColor"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                                  />
                                </svg>
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </nav>
                    </div>
                  </div>
                </div>
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

export default BlogTag;
