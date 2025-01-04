import React, { useState } from 'react';
import { Route, Switch, useRouteMatch, useParams, useMatch, Routes } from 'react-router-dom';

import CategoryList from '../../../components/admin/Category/list_category';
import CategoryAdd from '../../../components/admin/Category/add_category';
import CategoryEdit from '../../../components/admin/Category/edit_category';

const CategoryView = () => {

  return (
    <div>
      <Routes>
        <Route path={'/list'} element={<CategoryList />} />
        <Route path={'/add'} element={<CategoryAdd />} />
        <Route path={'/edit/:id'} element={<CategoryEdit />} />
      </Routes>
    </div>
  );
};

export default CategoryView;