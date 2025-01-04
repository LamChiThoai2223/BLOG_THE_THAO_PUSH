import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  fetchBlogComments,
  fetchUserById,
  fetchBlogById,
} from "../../../services/Comment";
import Paginator from "../Paginator";
import { Helmet } from "react-helmet";

const CommentList = () => {
  const { blogId } = useParams();
  const [comments, setComments] = useState([]);
  const [blogs, setBlogs] = useState({});
  const [users, setUsers] = useState({});
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const commentsPerPage = 5; // số bình luận trên mỗi trang

  useEffect(() => {
    if (blogId) {
      fetchBlogComments(
        blogId,
        setComments,
        setTotalComments,
        setError,
        currentPage,
        commentsPerPage
      );
      fetchBlogById(
        blogId,
        (blogData) => {
          const blog = Array.isArray(blogData) ? blogData[0] : blogData;
          setBlogs((prevBlogs) => ({ ...prevBlogs, [blogId]: blog }));
          console.log("Blogs after update:", { [blogId]: blog });
        },
        setError
      );
    }
  }, [blogId, currentPage]);

  useEffect(() => {
    comments.forEach((comment) => {
      if (!users[comment.user_id]) {
        fetchUserById(
          comment.user_id,
          (userData) => {
            setUsers((prevUsers) => ({
              ...prevUsers,
              [comment.user_id]: userData,
            }));
          },
          setError
        );
      }
    });
  }, [comments, users]);

  const totalPages = Math.ceil(totalComments / commentsPerPage);

  return (
    <div className="app">
      <Helmet>
        <title>List Comments</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                  <h1 className="app-page-title mb-0">
                    Comment for Blog:{" "}
                    {blogs[blogId] ? blogs[blogId].title : "Loading..."}
                  </h1>
                </div>
              </div>
              <div className="app-card app-card-orders-table shadow-sm mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left text-md-center">
                      <thead>
                        <tr>
                          <th className="cell">#</th>
                          <th className="cell">User</th>
                          <th className="cell">Content</th>
                          <th className="cell">Comment Date</th>
                          <th className="cell">Image</th>
                          <th className="cell"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {comments.map((comment, index) => (
                          <tr key={comment.comment_id}>
                            <td className="cell">
                              {(currentPage - 1) * commentsPerPage + index + 1}
                            </td>
                            <td className="cell">
                              {users[comment.user_id]
                                ? users[comment.user_id].username
                                : "Loading..."}
                            </td>
                            <td className="cell">{comment.content}</td>
                            <td className="cell">
                              <span className="badge bg-success">
                                {new Date(
                                  comment.created_at
                                ).toLocaleDateString()}
                              </span>
                            </td>
                            <td className="cell">
                              {comment.image_url && (
                                <img
                                  className="img-fluid img-thumbnail"
                                  src={comment.image_url}
                                  alt=""
                                  style={{
                                    width: "200px",
                                    height: "120px",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                            </td>
                            <td className="cell">
                              <Link
                                className="btn-sm app-btn-secondary m-2"
                                to={`/admin/detail-comment/${comment.comment_id}`}
                              >
                                <i className="bi bi-eye"></i>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Paginator
                currentPage={currentPage}
                lastPage={totalPages}
                setCurrentPage={setCurrentPage}
                fetchData={(page) =>
                  fetchBlogComments(
                    blogId,
                    setComments,
                    setTotalComments,
                    setError,
                    page,
                    commentsPerPage
                  )
                }
                loading={false} // Có thể tùy chỉnh nếu cần trạng thái loading
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
