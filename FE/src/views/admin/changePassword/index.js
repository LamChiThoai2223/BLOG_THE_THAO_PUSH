import React, { useState } from 'react';
import { Route, Switch, useRouteMatch, useParams, useMatch, Routes } from 'react-router-dom';

import ChangePassword from '../../../components/admin/Category/list_category';


const ChangePassView = () => {

  return (
    <div>
      <Routes>
        <Route path={'/change-password'} element={<ChangePassword />} />
      </Routes>
    </div>
  );
};

export default ChangePassView;