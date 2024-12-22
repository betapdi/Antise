import React, { useState } from 'react';
import {
  Route, Routes, Navigate
} from "react-router-dom";
import MainPage from './pages/Main';
import HomePage from './pages/HomePage';
import HeaderUnloggin from '../../components/Header/Unloggin';
import DetailJob from './pages/DetailJob';
import DetailCompany from './pages/DetailCompany';
import ListJob from './pages/ListJob';
import Dashboard from './pages/Dashboard';
import UploadCV from '../../components/Form/uploadCV';
import HeaderLoggin from '../../components/Header/Loggin';
import ListCompany from './pages/ListCompany';
import WelcomeEmployee from '../Welcome/WelcomeEmployee';
import WelcomeEmployer from '../Welcome/WelcomeEmployer';
const JobSeeking = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("accessToken") ? true : false);

  return (
    <div>
      <div className="sticky top-0 z-50">
        {isAuthenticated ? <HeaderLoggin /> : <HeaderUnloggin />}
      </div>
      <Routes>
        <Route exact path='/' element={<Navigate to="/job/homePage" replace />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/detailjob/:id" element={<DetailJob />} />
        <Route path="/detailcompany/:id" element={<DetailCompany />} />
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

