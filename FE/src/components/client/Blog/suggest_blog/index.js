import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { fetchBlogs, fetchRecommendations } from '../../../../services/Blog';
import { apiUrl } from '../../../../config/Api';
import { getUserGoogleProfile, getUserProfile } from "../../../../services/Auth";
import Cookies from 'js-cookie';

const BlogSuggest = ({ blogID }) => {
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [error, setError] = useState(null);
    const [recommendedBlogs, setRecommendedBlogs] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm trạng thái đăng nhập

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                let recommendationsData = [];
                let user_id = null; // Biến lưu trữ user_id

                if (token) {
                    setIsLoggedIn(true); // Đặt trạng thái đăng nhập là true
                    const [userProfile, userGoogleProfile] = await Promise.allSettled([
                        getUserProfile(token),
                        getUserGoogleProfile(token),
                    ]);

                    // Kiểm tra nếu có user_id từ một trong các API
                    if (userProfile.status === 'fulfilled' && userProfile.value) {
                        user_id = userProfile.value.user_id;
                    } else if (userGoogleProfile.status === 'fulfilled' && userGoogleProfile.value) {
                        user_id = userGoogleProfile.value.user_id;
                    }

                    // Gọi API fetchRecommendations với user_id nếu có
                    recommendationsData = user_id
                        ? await fetchRecommendations(apiUrl, blogID, user_id)
                        : await fetchRecommendations(apiUrl, blogID);
                } else {
                    recommendationsData = await fetchRecommendations(apiUrl, blogID); // Nếu không có token
                }

                setRecommendedBlogs(recommendationsData); // Lưu trữ dữ liệu gợi ý
            } catch (error) {
                setError('Lỗi khi lấy bài viết gợi ý.');
            }
        };

        fetchData(); // Gọi fetchData khi component mount
    }, [apiUrl, blogID]);

    useEffect(() => {
        const getLatestBlogs = () => {
            fetchBlogs(apiUrl, (data) => {
                console.log('Received data:', data);
                if (Array.isArray(data)) {
                    const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setLatestBlogs(sortedData);
                } else {
                    setError('Dữ liệu không hợp lệ.');
                }
            }, setError);
        };

        getLatestBlogs();
    }, [apiUrl]);

    return (
        <div className="col-lg-12 col-md-6">
            <div className="widget-2">
                <h2 className="section-title mb-3">Suggested Blogs</h2>
                <div className="widget-body">

                    {recommendedBlogs && recommendedBlogs.length > 0 ? (
                        <div className="suggestions">
                            {recommendedBlogs.map((suggestion, index) => (
                                <Link key={index} className="media" to={`/blog/detail/${suggestion.blog_id}`}>
                                    <div className="d-flex align-items-center">
                                        <img
                                            loading="lazy"
                                            decoding="async"
                                            src={suggestion.image}
                                            alt="Hình đại diện bài viết"
                                            className="mr-3"
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px' }}
                                        />
                                        <div className="media-body">
                                            <h4 className="mb-1">{suggestion.title}</h4>
                                        </div>
                                    </div>
                                    <p className="mb-0 small">{suggestion.description}</p>
                                    <hr className="my-4" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="suggestions">
                            {Array.isArray(latestBlogs) && latestBlogs.length > 0 ? (
                                latestBlogs.slice(0, 10).map((blog, index) => (
                                    <Link key={index} className="media" to={`/blog/detail/${blog.blog_id}`}>
                                        <div className="d-flex align-items-center">
                                            <img
                                                loading="lazy"
                                                decoding="async"
                                                src={blog.image}
                                                alt="Hình đại diện bài viết"
                                                className="mr-3"
                                                style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '10px' }}
                                            />
                                            <div className="media-body">
                                                <h4 className="mb-1">{blog.title}</h4>
                                            </div>
                                        </div>
                                        <p className="mb-0 small">{blog.description}</p>
                                        <hr className="my-4" />
                                    </Link>
                                ))
                            ) : (
                                <p className="text-muted">Không có bài viết mới nhất.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BlogSuggest;
