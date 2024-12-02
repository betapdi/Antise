import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/Main";
import ProfilePage from "./pages/Profile";
import PersonalPage from "./pages/Personal";
import SocialLinksPage from "./pages/SocialLinks";
import AccountSettingPage from "./pages/AccountSetting";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<MainPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/social-links" element={<SocialLinksPage />} />
        <Route path="/account-setting" element={<AccountSettingPage />} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
};

export default App;
