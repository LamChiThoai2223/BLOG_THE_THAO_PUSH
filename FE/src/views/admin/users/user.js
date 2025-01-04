import React, { useState } from 'react';
import { Route, Switch, useRouteMatch, useParams, useMatch, Routes } from 'react-router-dom';
import UsersList from '../../../components/admin/Users/list_user';
import UsersAdd from '../../../components/admin/Users/add_user';
import UsersEdit from '../../../components/admin/Users/edit_user';
import UserDetail from '../../../components/admin/Users/detail_user';


const UsersView = () => {

  return (
    <div>
      <Routes>
        <Route path={'/list'} element={<UsersList />} />
        <Route path={'/detail/:id'} element={<UserDetail />} />
        <Route path={'/add'} element={<UsersAdd />} />
        <Route path={'/edit/:id'} element={<UsersEdit />} />
      </Routes>
    </div>
  );
};

export default UsersView;
