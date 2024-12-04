// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
<div className="w-1/4 bg-white shadow-lg border-r border-[#adb5bd]">
          <div className="p-6">
            <div className="w-[248px] text-[#9199a3] text-xs font-medium font-['Inter'] leading-[18px] mb-6">
              CANDIDATE DASHBOARD
            </div>
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link to="/job/overview" className="flex items-center text-gray-700 hover:text-blue-600 font-medium">
                  <img
                    src={require("../../../../image/Stack.png")}
                    alt="logo"
                    className="h-auto mr-2"
                  /> Overview
                  </Link>
                </li>
                <li>
                  <Link to="/job/applied" className="flex items-center text-gray-700 hover:text-blue-600">
                  <img
                    src={require("../../../../image/Briefcase.png")}
                    alt="logo"
                    className="h-auto mr-2"
                  /> Applied Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/job/favorites" className="flex items-center text-gray-700 hover:text-blue-600">
                  <img
                    src={require("../../../../image/BookmarkSimple.png")}
                    alt="logo"
                    className="h-auto mr-2"
                  /> Favorite Jobs
                  </Link>
                </li>
                <li>
                <Link to="/job/alerts" className="flex items-center text-gray-700 hover:text-blue-600 relative">
                  <img
                    src={require("../../../../image/BellRinging.png")}
                    alt="logo"
                    className="h-auto mr-2"
                  />
                  <span>Job Alert</span>
                  <div className="absolute right-0 bg-[#e7f0fa] text-[#18191c] text-xs font-medium font-['Inter'] rounded-sm px-2 py-1">
                    09
                  </div>
                </Link>
              </li>
                <li>
                  <Link to="/job/settings" className="flex items-center text-[#0a65cc] font-semibold">
                  <img
                    src={require("../../../../image/Gear.png")}
                    alt="logo"
                    className="w-auto h-auto mr-2"
                  /> Settings
                  </Link>
                </li>
              </ul>
            </nav>
            </div>
        </div>
  );
};

export default Sidebar;
