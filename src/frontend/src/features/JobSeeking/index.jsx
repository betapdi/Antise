import React from 'react';
import {
  Route, Routes, Navigate
} from "react-router-dom";
import MainPage from './pages/Main';
import ProfilePage from "./pages/Profile";
import HomePage from './pages/HomePage';
import Header from '../../components/Header';
const Manga = (props) => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route exact path = '/' element = {<Navigate to = "/temp" replace />} />
        <Route path = "/temp" element = {<MainPage/>} />
        <Route path = "/profile" element = {<ProfilePage/>} />
        <Route path = "/homePage" element = {<HomePage/>} />
        <Route path = "*" element = {<p>NONE</p>} />
      </Routes>
    </div>
  )
}

Manga.propTypes = {};

export default Manga