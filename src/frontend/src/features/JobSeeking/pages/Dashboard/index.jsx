import React from "react";
import Settings from './Component/Settings';
import Sidebar from './Component/SideBar';

const Dashboard = () => {
  return (
    <div className="w-screen flex justify-center">
      <div className="w-[90%] max-w-screen-xl flex flex-row mt-5">
        <div className="w-1/4 border-r border-[#adb5bd]">
          <Sidebar />
        </div>
        <div className="w-3/4">
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
