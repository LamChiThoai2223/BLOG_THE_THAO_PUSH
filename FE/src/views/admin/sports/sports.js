import React, { useState } from 'react';
import { Route, Switch, useRouteMatch, useParams, useMatch, Routes } from 'react-router-dom';
import SportsList from '../../../components/admin/Sports/list_sports';
import SportsAdd from '../../../components/admin/Sports/add_sports'
import SportsEdit from '../../../components/admin/Sports/edit_sports';

const SportsView = () => {
  return (
    <div>
      <Routes>
        <Route path={'/list'} element={<SportsList />} />
        <Route path={'/add'} element={<SportsAdd />} />
        <Route path={'/edit/:id'} element={<SportsEdit />} />
      </Routes>
    </div>
  );
};

export default SportsView;
