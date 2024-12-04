import React from 'react';
import {
  Route, Routes, Navigate
} from "react-router-dom";

import AddCompany from './pages/AddCompany';


const Company = (props) => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Navigate to="/company/AddCompany" replace />} />
        <Route path="/AddCompany" element={<AddCompany/>} />
        <Route path="*" element={<p>NONE</p>} />
      </Routes>
    </div>
  )
}

Company.propTypes = {};

export default Company