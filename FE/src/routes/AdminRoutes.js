import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Home from '../components/admin/home.js';
import UsersView from '../views/admin/users/user.js';
import BlogView from '../views/admin/blog/blog.js';
import CategoryView from '../views/admin/category/category.js';
import Account from '../components/admin/Auth/Account/account.js';
import SportsView from '../views/admin/sports/sports.js';
import Header from '../views/@theme/admin/header.js';
import Footer from '../views/@theme/admin/footer.js';
import '../assets/css/portal.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.min.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import CommentList from '../components/admin/comment/list_comment.js';
import RatingList from '../views/admin/ratings/list_rating.js';
import UserChart from '../views/admin/chart/user.js';
// import CommentsChart from '../views/admin/chart/comment.js';
import PostsChart from '../views/admin/chart/views/index.js';
import LikesChart from '../views/admin/chart/likes/index.js';
import RatingsChart from '../views/admin/chart/rating.js';
import Login from '../components/admin/Auth/Login/login.js';
import ResetPassword from '../views/admin/auth/reset-password/reset_password.js';
import TagView from '../views/admin/tags/tag.js';
import BlogList from '../components/admin/comment/blog_comment_list.js';
import BlogsChart from '../views/admin/chart/post.js';
import ShareChart from '../views/admin/chart/share/index.js';
import ConfirmAuthor from '../components/admin/ConfirmAuthor/index.js';
import Reports from '../components/admin/Reports/index.js';

const AdminRoutes = () => {
  const [cookies] = useCookies(['token', 'role']);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (cookies.token && cookies.role === 'admin') {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    setLoading(false);
  }, [cookies]);

  const noHeaderFooterRoutes = ['/admin/login', '/admin/reset-password'];
  const renderHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {renderHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {authenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/users/*" element={<UsersView />} />
            <Route path="/blogs/*" element={<BlogView />} />
            <Route path="/category/*" element={<CategoryView />} />
            <Route path="/tags/*" element={<TagView />} />
            <Route path="/account" element={<Account />} />
            <Route path="/blogs-list-comment" element={<BlogList />} />
            <Route path="/comments-list/:blogId" element={<CommentList />} />
            <Route path="/list-rating" element={<RatingList />} />
            <Route path="/chart-user" element={<UserChart />} />
            {/* <Route path="/chart-comment" element={<CommentsChart />} /> */}
            <Route path="/chart-post" element={<PostsChart />} />
            <Route path="/chart-rating" element={<RatingsChart />} />
            <Route path="/sports/*" element={<SportsView />} />
            <Route path="/chart-blog" element={<BlogsChart />} />
            <Route path="/chart-like" element={<LikesChart />} />
            <Route path="/confirmAuthor" element={<ConfirmAuthor />} /><Route path="/share" element={<ShareChart />} />
            <Route path="/reports" element={<Reports />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        )}
      </Routes>
    </>
  );
};

export default AdminRoutes;
