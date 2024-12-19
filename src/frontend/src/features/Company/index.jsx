import React from 'react';
import {
  Route, Routes, Navigate, useLocation
} from "react-router-dom";

import { useState } from "react";

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


const Company = (props) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("accessToken") ? true : false);
  return (
    <div>
      {isAuthenticated ? <HeaderLogginComany /> : <HeaderUnloggin />}
      <Routes>
        <Route exact path='/' element={<Navigate to="/company/dashboard" replace />} />
        <Route path="/AddCompany" element={<AddCompany />} />
        <Route path="/Dashboard/*" element={<Dashboard />} />
        <Route path="/SuccessCompanyUpload" element={<SuccessCompanyUpload />} />
        <Route path="/CompanySetupSuccess" element={<CompanySetupSuccess />} />
        <Route path="/postjobsuccess" element={<PostJobSuccess />} />
        <Route path="*" element={<p>NONE</p>} />
      </Routes>
    </div>
  )
}
Company.propTypes = {};

export default Company