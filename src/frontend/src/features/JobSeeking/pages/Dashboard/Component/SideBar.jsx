import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../../../context/UserContext";

const Sidebar = ({ numberOfJobs }) => {
  const location = useLocation(); // Get the current location/path
  const {notifications} = useContext(UserContext);

  const isActive = (path) => location.pathname.toLowerCase() === path; // Check if the link is active

  return (
    <div className="w-full bg-white">
      <div className="p-6">
        <div className="w-full text-[#9199a3] text-xs font-medium font-['Inter'] leading-[18px] mb-6">
          CANDIDATE DASHBOARD
        </div>
        <nav>
          <ul className="">
            <li>
              <Link
                to="/job/dashboard/overview"
                className={`flex items-center py-2 gap-4 ${isActive("/job/dashboard/overview") ? "bg-[#e7f0fa] text-[#0a65cc]" : 'text-[#767F8C]'} hover:bg-[#e7f0fa] relative`}
              >
                <img
                  src={`${isActive("/job/dashboard/overview") ? "/image/BlueStack.png" : "/image/Stack.png"}`}
                  alt="logo"
                  className={`h-auto ml-4 mr-2 ${isActive("/job/dashboard/overview") ? 'filter-blue' : ''}`}
                />
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/applied-jobs"
                className={`flex items-center py-2 gap-4 ${isActive("/job/dashboard/applied-jobs") ? "bg-[#e7f0fa] text-[#0a65cc]" : 'text-[#767F8C]'} hover:bg-[#e7f0fa] relative`}
              >
                <img
                  src={`${isActive("/job/dashboard/applied-jobs") ? "/image/BlueBriefcase.png" : "/image/Briefcase.png"}`}
                  alt="logo"
                  className={`h-auto ml-4 mr-2 ${isActive("/job/dashboard/applied-jobs") ? 'filter-blue' : ''}`}
                />
                Applied Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/favorite-jobs"
                className={`flex items-center py-2 gap-4 ${isActive("/job/dashboard/favorite-jobs") ? "bg-[#e7f0fa] text-[#0a65cc]" : 'text-[#767F8C]'} hover:bg-[#e7f0fa] relative`}
              >
                <img
                  src={`${isActive("/job/dashboard/favorite-jobs") ? "/image/BlueBookmarkSimple.png" : "/image/BookmarkSimple.png"}`}
                  alt="logo"
                  className={`h-auto ml-4 mr-2 ${isActive("/job/dashboard/favorite-jobs") ? 'filter-blue' : ''}`}
                />
                Favorite Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/job-alerts"
                className={`flex items-center py-2 gap-4 ${isActive("/job/dashboard/job-alerts") ? "bg-[#e7f0fa] text-[#0a65cc]" : 'text-[#767F8C]'} hover:bg-[#e7f0fa] relative`}
              >
                <img
                  src={`${isActive("/job/dashboard/job-alerts") ? "/image/BlueBellRinging.png" : "/image/BellRinging.png"}`}
                  alt="logo"
                  className={`h-auto ml-4 mr-2 ${isActive("/job/dashboard/job-alerts") ? 'filter-blue' : ''}`}
                />
                Job Alert
                <div className="absolute right-0 bg-[#e7f0fa] text-[#18191c] text-xs font-medium font-['Inter'] rounded-sm px-2 py-1">
                  {notifications.length}
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/settings"
                className={`flex items-center py-2 gap-4 ${isActive("/job/dashboard/settings") ? "bg-[#e7f0fa] text-[#0a65cc]" : 'text-[#767F8C]'} hover:bg-[#e7f0fa]`}
              >
                <img
                  src={`${isActive("/job/dashboard/settings") ? "/image/BlueGear.png" : "/image/setting_btn.svg"}`}
                  alt="logo"
                  className={`w-auto h-auto ml-4 mr-2 ${isActive("/job/dashboard/settings") ? 'filter-blue' : ''}`}
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