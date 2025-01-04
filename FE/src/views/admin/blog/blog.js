import React, { useState } from 'react';
import { Route, Switch, useRouteMatch, useParams, useMatch, Routes } from 'react-router-dom';
import BlogList from '../../../components/admin/Blog/list_blog';
import BlogAdd from '../../../components/admin/Blog/add_blog'
import BlogDetail from '../../../components/admin/Blog/detail_blog';
import BlogEdit from '../../../components/admin/Blog/edit_blog';

const BlogView = () => {

  return (
    <div>
      <Routes>
        <Route path={'/list'} element={<BlogList />} />
        <Route path={'/detail/:id'} element={<BlogDetail />} />
        <Route path={'/add'} element={<BlogAdd />} />
        <Route path={'/edit/:id'} element={<BlogEdit />} />
      </Routes>
    </div>
  );
};

export default BlogView;
