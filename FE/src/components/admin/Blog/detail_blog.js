import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchBlogDetails } from "../../../services/Blog";
import { useNavigate } from "react-router-dom";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Helmet } from "react-helmet";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogDetails = async () => {
      try {
        const response = await fetchBlogDetails(id);
        console.log("API Response:", response); // Kiểm tra dữ liệu API

        if (response && response.data && response.data.length > 0) {
          const blogData = response.data[0];
          const rawContentState = JSON.parse(blogData.content);
          const contentState = convertFromRaw(rawContentState);
          const htmlContent = stateToHTML(contentState);
          setBlog({
            ...blogData,
            content: htmlContent,
          });
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getBlogDetails();
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Loading...</div>;

  return (
    <div className="app">
      <Helmet>
        <title>{blog.title}</title>
      </Helmet>
      <div className="app-wrapper-admin">
        <div className="app-content pt-3 p-md-3 p-lg-4">
          <div className="container-xl card">
            <div className="card-body">
              <h1 className="app-page-title">Detail Blog {blog.title}</h1>
              <hr className="mb-4" />
              <div className="row g-4 settings-section">
                <div className="col-12 col-md-12">
                  <div className="app-card app-card-settings shadow-sm p-4 mb-5">
                    <div
                      className="app-card-body"
                      style={{ fontFamily: "Noto Color Emoji, sans-serif" }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <Link
                    className="btn btn-success"
                    to={`/admin/blogs/edit/${blog.blog_id}`}
                  >
                    EDIT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
