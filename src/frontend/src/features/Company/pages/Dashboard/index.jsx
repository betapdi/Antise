import React from "react";
import Sidebar from "./Component/Sidebar";
import PostJob from "./Component/PostJob";
import MyJob from "./Component/MyJob";


const Dashboard = () => {
  return (
    <div className="w-screen flex justify-center">
      <div className="w-[90%] max-w-screen-xl flex flex-row mt-5">
        <div className="w-1/4 border-r border-[#adb5bd] mr-8">
          <Sidebar />
        </div>
        <div className="w-3/4">
            <MyJob/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
