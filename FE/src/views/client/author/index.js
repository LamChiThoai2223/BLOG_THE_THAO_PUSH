import React, { useState } from 'react';
import { Route, Switch, useRouteMatch, useParams, useMatch, Routes } from 'react-router-dom';
import Author from "../../../components/client/auth/author/author";

const AuthorViews = () => {
  return (
    <div>
       <Routes>
        <Route path={'/:id'} element={<Author />} />
      </Routes>
    </div>
  )
};

export default AuthorViews;
