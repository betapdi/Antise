import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/SideBar";
import Overview from "./Component/Overview";
import AppliedJobs from "./Component/AppliedJobs";
import FavoriteJobs from "./Component/FavoriteJobs";
import JobAlerts from "./Component/JobAlerts";
import Settings from "./Component/Settings";

const Dashboard = () => {
  return (
      <div className="w-screen flex justify-center">
        <div className="w-[90%] max-w-screen-xl flex flex-row mt-5">
          <div className="w-1/4 border-r border-[#adb5bd]">
            <Sidebar />
          </div>
          <div className="w-3/4">
            <Routes>
              <Route path="/overview" element={<Overview />} />
              <Route path="/applied-jobs" element={<AppliedJobs />} />
              <Route path="/favorite-jobs" element={<FavoriteJobs />} />
              <Route path="/job-alerts" element={<JobAlerts />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
