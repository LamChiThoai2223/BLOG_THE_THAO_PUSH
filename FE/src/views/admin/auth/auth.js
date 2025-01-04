import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import đúng các component
import Login from '../../../components/admin/Auth/Login/login';

const AuthView = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AuthView;
