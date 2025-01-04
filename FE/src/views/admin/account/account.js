import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Account from '../../../components/admin/Account/account';

const AccountView = () => {
  return (
    <div>
      <Routes>
      <Route path={'/account'} element={<Account/>} />
      </Routes>
    </div>
  );
};

export default AccountView;