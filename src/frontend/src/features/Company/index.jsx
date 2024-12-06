import React from 'react';
import {
  Route, Routes, Navigate,useLocation 
} from "react-router-dom";

import AddCompany from './pages/AddCompany';
import NavCompany from '../../components/Nav/Company';
import Dashboard from './pages/Dashboard';


const Company = (props) => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/company/AddCompany" && <NavCompany />}
      <Routes>
        <Route exact path='/' element={<Navigate to="/company/AddCompany" replace />} />
        <Route path="/AddCompany" element={<AddCompany/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="*" element={<p>NONE</p>} />
      </Routes>
    </div>
  )
}

Company.propTypes = {};

export default Company