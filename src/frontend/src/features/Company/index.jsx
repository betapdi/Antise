import React from 'react';
import {
  Route, Routes, Navigate, useLocation, useNavigate
} from "react-router-dom";

import { useState, useEffect, useContext} from "react";

import AddCompany from './pages/AddCompany';
import NavCompany from '../../components/Nav/Company';
import Dashboard from './pages/Dashboard';
import SuccessCompanyUpload from './pages/SuccessPage/uploadsuccess';
import PostJob from './pages/Dashboard/Component/PostJob';
import PostJobSuccess from './pages/SuccessPage/postjobsuccess';
import HeaderLogginComany from '../../components/Header/Company';
import HeaderUnloggin from '../../components/Header/Unloggin';
import CompanySetupSuccess from './pages/SuccessPage/companysetupsuccess';
import ApplyForm from '../../components/Form/applyform';
import {UserContext} from '../../context/UserContext';
import Error from '../../components/Error';
import {CompanyContext} from '../../context/CompanyContext';

const BlurOverlay = () => (
  <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Company Not Verified</h2>
      <p className="text-gray-600">Please wait for admin verification to access the dashboard.</p>
    </div>
  </div>
);
const Company = (props) => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("accessToken") ? true : false);
  const {
        userId, setUserId, email, setEmail, role, setRole, resetUser
  } = useContext(UserContext);
  const {verified,companyName}= useContext(CompanyContext);
  const navigate = useNavigate();
    useEffect(() => {
      if (role === "APPLICANT" || role === "ANONYMOUS") {
        navigate("/job/homepage", { replace: true });
      }
      if (role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      }
    }, [role, navigate]);
  const shouldShowBlur = !verified && isAuthenticated && currentRoute !== '/company/AddCompany';
  if (isAuthenticated && !verified && companyName == null) {
    navigate("/company/AddCompany", { replace: true });
  }
  return (
    <div>
      <div className='sticky top-0 z-50'>
      {isAuthenticated ? <HeaderLogginComany /> : <HeaderUnloggin />}
      </div>
      <div className={shouldShowBlur ? 'relative' : ''}>
        <Routes>
          <Route exact path='/' element={<Navigate to="/company/dashboard" replace />} />
          <Route path="/AddCompany" element={<AddCompany />} />
          <Route path="/Dashboard/*" element={<Dashboard />} />
          <Route path="/SuccessCompanyUpload" element={<SuccessCompanyUpload />} />
          <Route path="/CompanySetupSuccess" element={<CompanySetupSuccess />} />
          <Route path="/postjobsuccess" element={<PostJobSuccess />} />
          <Route path="*" element={<Error/>} />
        </Routes>
        {shouldShowBlur && <BlurOverlay />}
      </div>
    </div>
  )
}
Company.propTypes = {};

export default Company