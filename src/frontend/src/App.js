import React, { Suspense } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes
} from "react-router-dom";

import './App.css';
import Authentication from './features/Authentication';
import Header from './components/Header';

const Job = React.lazy(() => import('./features/JobSeeking'));


function App() {
  return (
    <Suspense fallback = {<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path = "/" element = {<Navigate to = "auth/" replace />} />
            <Route path = "job/*" element = {<Job />} />
            <Route path = "auth/*" element = {<Authentication />} />
          </Routes>
        </BrowserRouter>
    </Suspense>
  );
}

export default App;
