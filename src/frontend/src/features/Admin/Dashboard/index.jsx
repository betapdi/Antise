import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Component/SideBar.jsx";
import OverView from "../../Company/pages/Dashboard/Component/OverView.jsx";


const Dashboard = () => {
  return (
    <div className="w-screen flex justify-center h-screen">
      <div className="w-[90%] max-w-screen-xl flex flex-row mt-5">
        <div className="w-1/4 border-r border-[#adb5bd] mr-8 h-full">
          <Sidebar />
        </div>
        <div className="w-3/4">
          <Routes>
            <Route exact path='/' element={<Navigate to="/admin/dashboard/overview" replace />} />
            <Route path="/overview" element={<OverView/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
