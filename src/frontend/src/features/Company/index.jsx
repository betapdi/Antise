import React from 'react';
import {
  Route, Routes, Navigate,useLocation 
} from "react-router-dom";

import AddCompany from './pages/AddCompany';
import NavCompany from '../../components/Nav/Company';
import Dashboard from './pages/Dashboard';
import SucessCompanyUpload from './pages/SucessPage/uploadsuccess';
import PostJob from './pages/Dashboard/Component/PostJob';
import postjobsuccess from './pages/SucessPage/postjobsuccess';


const Company = (props) => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/company/AddCompany" && <NavCompany />}
      <Routes>
        <Route exact path='/' element={<Navigate to="/company/AddCompany" replace />} />
        <Route path="/AddCompany" element={<AddCompany/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/SucessCompanyUpload" element={<SucessCompanyUpload/>} />
        <Route path="/PostJob" element={<PostJob/>} />
        <Route path="/postjobsuccess" element={<postjobsuccess/>} />
        <Route path="*" element={<p>NONE</p>} />
      </Routes>
    </div>
  )
}
Company.propTypes = {};

export default Company