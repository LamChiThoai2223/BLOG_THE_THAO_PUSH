import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import BlogList from '../../../components/client/Blog/list_blog';
import BlogDetail from '../../../components/client/Blog/detail_blog';
import BlogCategory from '../../../components/client/Blog/list_blog_caterory';
import BlogTag from '../../../components/client/Blog/list_blog_tag';
import BlogSport from '../../../components/client/Blog/list_blog_sport';
import BlogSearch from '../../../components/client/Blog/list_blog_search';
import PageNotFound from '../404/'; // Đảm bảo import đúng đường dẫn
import CreateBlog from '../../../components/client/Blog/add_blog';

const BlogView = () => {
  const location = useLocation();
  const [cookies] = useCookies(['token', 'role']);

  const isAuthenticated = () => {
    return cookies.token && ['admin', 'author'].includes(cookies.role);
  };

  return (
    <div>
      <Routes>
        <Route path={'/list'} element={<BlogList />} />
        <Route path={'/detail/:id'} element={<BlogDetail />} />
        <Route path={'/category/:id'} element={<BlogCategory />} />
        <Route path={'/tag/:id'} element={<BlogTag />} />
        <Route path={'/sport/:id'} element={<BlogSport />} />
        <Route path={'/search'} element={<BlogSearch />} />
        <Route 
          path={'/create'} 
          element={isAuthenticated() ? <CreateBlog /> : <Navigate to="*" replace />} 
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default BlogView;
