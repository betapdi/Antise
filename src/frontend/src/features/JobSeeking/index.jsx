import React from 'react';
import {
  Route, Routes
} from "react-router-dom";
import MainPage from './pages/Main';

const Manga = (props) => {
  return (
    <div>
      <Routes>
        <Route exact path = '/' element = {<MainPage/>} />
        <Route path = "temp" element = {<MainPage/>} />
        <Route path = "*" element = {<p>NONE</p>} />
      </Routes>
    </div>
  )
}

Manga.propTypes = {};

export default Manga