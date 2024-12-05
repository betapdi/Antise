import React from 'react';
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
const Manga = (props) => {
  return (
    <div>
      <HeaderUnloggin />
      <Routes>
        <Route exact path='/' element={<Navigate to="/temp" replace />} />
        <Route path="/temp" element={<MainPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/detailjob" element={<DetailJob />} />
        <Route path="/listjob" element={<ListJob isSearch ={0} />} />
        <Route path="/listjob/search" element={<ListJob isSearch ={1} />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/uploadCV" element={<UploadCV />} />
        <Route path="*" element={<p>NONE</p>} />
      </Routes>
    </div>
  );
};

export default Manga;
