import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../../../config/Api";
import BlogSuggest from "../suggest_blog";
import { fetchAllCategories } from "../../../../services/Category";
import { fetchAllTags } from "../../../../services/Tag";
import { fetchAllSports } from "../../../../services/Sports";
import { fetchApprovedBlogs } from "../../../../services/Blog";
import "./style.css";

const BlogTopic = ({ blogID }) => {
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sports, setSports] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    fetchAllCategories(apiUrl, setCategories, setError);
    fetchAllTags(apiUrl, setTags, setError);
    fetchAllSports(apiUrl, setSports, setError);
    fetchApprovedBlogs(apiUrl, setBlogs, setError);
  }, []);


  const toggleShowMore = () => {
    setShowAllTags(!showAllTags);
  };

  // Hàm kiểm tra nếu category/tag/sport có bài viết
  const hasArticlesForCategory = (categoryId) => {
    return blogs.some(blog => blog.category_id === categoryId);
  };

  // Hàm kiểm tra nếu bài viết có tag
  const hasArticlesForTag = (tagId) => {
    return blogs.some(blog => blog.tag_ids && blog.tag_ids.includes(tagId));
  };

  const hasArticlesForSport = (sportId) => {
    // Kiểm tra xem sportId có trong bài viết nào không
    return blogs.some(blog => blog.sport_id === sportId);
  };

  return (
    <div className="widget-blocks ">
      <div className="row">
        {categories.some(category => hasArticlesForCategory(category.category_id)) && (
          <div className="col-lg-12 col-md-6">
            <div className="widget">
              <h2 className="section-title mb-1">Categories</h2>
              <div className="widget-body">
                <ul className="widget-list">
                  {categories.filter(category => hasArticlesForCategory(category.category_id)).map((category) => (
                    <li key={category.category_id}>
                      <Link to={`/blog/category/${category.category_id}`}>
                        {category.name}
                        <span className="ml-auto"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {tags.some(tag => hasArticlesForTag(tag.tag_id)) && (
          <div className="col-lg-12 col-md-6">
            <div className="widget">
              <h2 className="section-title mb-1">Tags</h2>
              <div className="widget-body">
                <ul className="widget-list">
                  {tags.filter(tag => hasArticlesForTag(tag.tag_id)).slice(0, showAllTags ? tags.length : 10).map((tag) => (
                    <li key={tag.tag_id}>
                      <Link to={`/blog/tag/${tag.tag_id}`}>
                        #{tag.name}
                        <span className="ml-auto"></span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {tags.length > 10 && (
                  <div className="text-center mt-3">
                    <div
                      onClick={toggleShowMore}
                      className="btn p-0"
                      style={{ color: "black", border: "none", background: "transparent" }}
                    >
                      <div>{showAllTags ? "Show Less" : "Show More"}</div>
                      <div>
                        {showAllTags ? (
                          <i className="bi bi-chevron-compact-up"></i>
                        ) : (
                          <i className="bi bi-chevron-compact-down"></i>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {sports.some(sport => hasArticlesForSport(sport.sport_id)) && (
          <div className="col-lg-12 col-md-6">
            <div className="widget">
              <h2 className="section-title mb-1">Sports</h2>
              <div className="widget-body">
                <ul className="widget-list">
                  {sports
                    .filter(sport => hasArticlesForSport(sport.sport_id)) // Lọc sport có bài viết
                    .map((sport) => (
                      <li key={sport.sport_id}>
                        <Link to={`/blog/sport/${sport.sport_id}`}>
                          {sport.name}
                          <span className="ml-auto"></span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <BlogSuggest blogID={blogID} />
      </div>
    </div>
  );
};

export default BlogTopic;
