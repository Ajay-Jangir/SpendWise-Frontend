import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Layout from "./Layout";
import './App.css';

import Dashboard from "./Dashboard/index";
import Transactions from "./Transactions/index";
import Setting from "./Setting/index";
import Analysis from "./Analysis/index";
import Register from "./Register/index";
import Login from "./Login/index";
import ForgotPassword from './ForgotPassword'
import ResetNewPassword from "./ResetNewPassword";

const isAuthenticated = () => {
  return !!localStorage.getItem('spendwise_token');
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<ForgotPassword />} />
          <Route path="/resetNewPassword/:token" element={<ResetNewPassword />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
