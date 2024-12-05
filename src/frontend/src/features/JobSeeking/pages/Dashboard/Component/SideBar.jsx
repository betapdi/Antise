import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full bg-white">
      <div className="p-6">
        <div className="w-full text-[#9199a3] text-xs font-medium font-['Inter'] leading-[18px] mb-6">
          CANDIDATE DASHBOARD
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/job/dashboard/overview"
                className="flex items-center text-[#767F8C] hover:text-blue"
              >
                <img
                  src={require("../../../../../image/Stack.png")}
                  alt="logo"
                  className="h-auto mr-2"
                />
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/applied-jobs"
                className="flex items-center text-[#767F8C] hover:text-blue"
              >
                <img
                  src={require("../../../../../image/Briefcase.png")}
                  alt="logo"
                  className="h-auto mr-2"
                />
                Applied Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/favorite-jobs"
                className="flex items-center text-[#767F8C] hover:text-blue"
              >
                <img
                  src={require("../../../../../image/BookmarkSimple.png")}
                  alt="logo"
                  className="h-auto mr-2"
                />
                Favorite Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/job-alerts"
                className="flex items-center text-[#767F8C] hover:text-blue relative"
              >
                <img
                  src={require("../../../../../image/BellRinging.png")}
                  alt="logo"
                  className="h-auto mr-2"
                />
                Job Alert
                <div className="absolute right-0 bg-[#e7f0fa] text-[#18191c] text-xs font-medium font-['Inter'] rounded-sm px-2 py-1">
                  09
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/settings"
                className="flex items-center text-[#767F8C] hover:text-blue"
              >
                <img
                  src={require("../../../../../image/setting_btn.svg").default}
                  alt="logo"
                  className="w-auto h-auto mr-2"
                />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;