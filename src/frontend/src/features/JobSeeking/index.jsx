import React, { useState } from 'react';
import {
  Route, Routes, Navigate
} from "react-router-dom";
import MainPage from './pages/Main';
import HomePage from './pages/HomePage';
import HeaderUnloggin from '../../components/Header/Unloggin';
import DetailJob from './pages/DetailJob';
import ListJob from './pages/ListJob';
import Dashboard from './pages/Dashboard';
import UploadCV from '../../components/Form/uploadCV';
import HeaderLoggin from '../../components/Header/Loggin';
import WelcomeEmployee from './pages/Welcome/WelcomeEmployee';
import WelcomeEmployer from './pages/Welcome/WelcomeEmployer';
import ListCompany from './pages/ListCompany';
const JobSeeking = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("accessToken") ? true : false); 

  return (
    <div>
      {isAuthenticated ? <HeaderLoggin /> : <HeaderUnloggin />}
      <Routes>
        <Route exact path='/' element={<Navigate to="/job/homePage" replace />} />
        <Route path="/homePage" element={<HomePage />} />
        {/* <Route path="/detailjob" element={<DetailJob />} /> */}
        <Route path="/detailjob/:id" element={<DetailJob />} />
        <Route path="/welcomeEmployee" element={<WelcomeEmployee />} />
        <Route path="/welcomeEmployer" element={<WelcomeEmployer />} />
        <Route path="/listjob" element={<ListJob isSearch={0} />} />
        <Route path="/listjob/search" element={<ListJob isSearch={1} />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/uploadCV" element={<UploadCV />} />
        <Route path="/findcompany" element={<ListCompany />} />
        <Route path="*" element={<p>NONE</p>} />
      </Routes>
    </div>
  );
};

export default JobSeeking;
