import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import PostJob from "./Component/PostJob";
import MyJob from "./Component/MyJob";
import OverView from "./Component/OverView";
import CandidateList from "./Component/CandidateList";
import SavedCandidate from "./Component/SavedCandidate";
import ViewCandidate from "./Component/ViewCandidate";
import Settings from "./Component/Settings";


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
            <Route path="/saved-candidate" element={<SavedCandidate />} />
            <Route path="/my-job" element={<MyJob />} />
            <Route path="/my-job/viewCandidate/:id" element={<ViewCandidate />} />
            <Route path="/my-job/list-candidate/:id" element={<CandidateList />} />
            <Route path="Settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
