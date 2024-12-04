import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/Main";
import ProfilePage from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<MainPage />} />

        <Route path="/settings" element={<ProfilePage />} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </div>
  );
};

export default App;
