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


const Company = (props) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("accessToken") ? true : false);
  const {
        userId, setUserId, email, setEmail, role, setRole, resetUser
  } = useContext(UserContext);
  const {verified}= useContext(CompanyContext);
  const navigate = useNavigate();
    useEffect(() => {
      if (role === "APPLICANT" || role === "ANONYMOUS") {
        navigate("/job/homepage", { replace: true });
      }
      if (role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      }
    }, [role, navigate]);
  return (
    <div>
      <div className='sticky top-0 z-50'>
      {isAuthenticated ? <HeaderLogginComany /> : <HeaderUnloggin />}
      </div>
      <Routes>
        <Route exact path='/' element={<Navigate to="/company/dashboard" replace />} />
        <Route path="/AddCompany" element={<AddCompany />} />
        <Route path="/Dashboard/*" element={<Dashboard />} />
        <Route path="/SuccessCompanyUpload" element={<SuccessCompanyUpload />} />
        <Route path="/CompanySetupSuccess" element={<CompanySetupSuccess />} />
        <Route path="/postjobsuccess" element={<PostJobSuccess />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  )
}
Company.propTypes = {};

export default Company