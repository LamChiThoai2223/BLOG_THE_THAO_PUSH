import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBlogs } from '../../../services/Comment';
import { apiUrl } from '../../../config/Api';
import Paginator from "../Paginator";
import { Helmet } from "react-helmet";

const BlogList = () => {
    const [blogs, setBlogData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
    const navigate = useNavigate();
    const loadBlogs = (page = 1) => {
        fetchBlogs(apiUrl, page, setBlogData, setError)
          .then((data) => {
            console.log('API Response:', data); // Kiểm tra phản hồi
            if (data && data.meta) {
              setLastPage(data.meta.last_page);
            } else {
              console.error("API response missing 'pagination' or 'last_page'");
              setLastPage(1);
            }
          })
          .catch((err) => {
            console.error("Error fetching blogs:", err);
            setError("Error fetching blogs");
          });
    };

      useEffect(() => {
        loadBlogs(currentPage);
      }, [currentPage]);

    return (
        <div className='app'>
            <Helmet>
                <title>List Comment Blog</title>
            </Helmet>
            <div className='app-wrapper-admin'>
                <div className="app-content pt-3 p-md-3 p-lg-4">
                    <div className="container-xl card">
                        <div className="card-body">
                            <div className="row g-3 mb-4 align-items-center justify-content-between">
                                <div className="col-auto">
                                    <h1 className="app-page-title mb-0">Blog List</h1>
                                </div>
                            </div>
                            <div className="app-card app-card-orders-table shadow-sm mb-5">
                                <div className="app-card-body">
                                    <div className="table-responsive">
                                        <table className="table app-table-hover mb-0 ">
                                            <thead>
                                                <tr>
                                                    <th className="cell">#</th>
                                                    <th className="cell">Blog Name</th>
                                                    <th className="cell">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {blogs.map((blog, index) => (
                                                    <tr key={index}>
                                                        <td className="cell">{index + 1}</td>
                                                        <td className="cell fw-bold">{blog.title}</td>
                                                        <td className="cell">
                                                            <button
                                                                className='btn-sm app-btn-secondary'
                                                                onClick={() => navigate(`/admin/comments-list/${blog.blog_id}`)}
                                                            >
                                                               <i className="bi bi-eye"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {error && (
                                                    <tr>
                                                        <td colSpan="3" className="text-danger">
                                                            {error}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <Paginator
                    currentPage={currentPage}
                    lastPage={lastPage}
                    setCurrentPage={setCurrentPage}
                    fetchData={loadBlogs}
                  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
