import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import PostJob from "./Component/PostJob";
import MyJob from "./Component/MyJob";
import OverView from "./Component/OverView";
import CandidateList from "./Component/CandidateList";
import SavedApplication from "./Component/SavedApplication";
import ViewApplication from "./Component/ViewApplication";
import Settings from "./Component/Settings";
import Notifications from "./Component/Notifications";
import Error from "../../../../components/Error";


const Dashboard = () => {
  return (
    <div className="w-screen flex justify-center h-screen">
      <div className="w-[90%] max-w-screen-xl flex flex-row mt-5">
        <div className="w-1/4 border-r border-[#adb5bd] mr-8 h-full">
          <Sidebar />
        </div>
        <div className="w-3/4">
          <Routes>
            <Route exact path='/' element={<Navigate to="/company/dashboard/overview" replace />} />
            <Route path="/overview" element={<OverView />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/saved-application" element={<SavedApplication />} />
            <Route path="/my-job" element={<MyJob />} />
            <Route path="/my-job/viewApplication/:id" element={<ViewApplication />} />
            <Route path="/my-job/list-candidate/:id" element={<CandidateList />} />
            <Route path="Notifications" element={<Notifications />} />
            <Route path="Settings" element={<Settings />} />
            <Route path="*" element={<Error/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
