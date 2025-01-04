import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import ClientRoutes from './routes/ClientRoutes';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} /> {/* Handles all admin routes */}
      <Route path="/*" element={<ClientRoutes />} /> {/* Handles all other routes */}
    </Routes>
  </Router>
);

export default AppRoutes;
