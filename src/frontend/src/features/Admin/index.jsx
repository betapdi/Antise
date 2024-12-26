import React from 'react';
import {
  Route, Routes, Navigate, useLocation, useNavigate
} from "react-router-dom";

import { useState, useEffect, useContext} from "react";

import {UserContext} from '../../context/UserContext';
import Error from '../../components/Error';
import HeaderLogginAdmin from '../../components/Header/Admin';
import HeaderUnloggin from '../../components/Header/Unloggin';
import Dashboard from './Dashboard';


const Admin = (props) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("accessToken") ? true : false);

  // const {
  //       userId, setUserId, email, setEmail, role, setRole, resetUser
  // } = useContext(UserContext);
  // const navigate = useNavigate();
  //   useEffect(() => {
  //     if (role === "APPLICANT" || role === "ANONYMOUS") {
  //       navigate("/job/homepage", { replace: true });
  //     }
  //   //   if (role === "COMPANY") {
  //   //     navigate("/company/dashboard", { replace: true });
  //   //   }
  //   }, [role, navigate]);
  return (
    <div>
      <div className='sticky top-0 z-50'>
      {isAuthenticated ? <HeaderLogginAdmin /> : <HeaderLogginAdmin />}
      </div>
      <Routes>
        <Route exact path='/' element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  )
}
Admin.propTypes = {};

export default Admin