import React, { useState } from 'react';
import { Route, Switch, useRouteMatch, useParams, useMatch, Routes } from 'react-router-dom';
import TagsList from '../../../components/admin/Tag/list_tag';
import AddTag from '../../../components/admin/Tag/add_tag';
import EditTag from '../../../components/admin/Tag/edit_tag';


const TagView = () => {

  return (
    <div>
      <Routes>
        <Route path={'/'} element={<TagsList />} />
        <Route path={'/add'} element={<AddTag />} />
        <Route path={'/edit/:tagId'} element={<EditTag />} />
      </Routes>
    </div>
  );
};

export default TagView;
