import React from "react";
import Sidebar from "../Component/SideBar";
import Settings from "../Component/Settings";

const Dashboard = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="flex w-full max-w-screen-xl">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content */}
        <Settings />
      </div>
    </div>
  );
};

export default Dashboard;
