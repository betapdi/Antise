import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ numberOfJobs }) => {
  const location = useLocation(); // Get the current location/path
  
  const isActive = (path) => location.pathname === path; // Check if the link is active

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
                className={`flex items-center ${isActive("/job/dashboard/overview") ? 'text-blue' : 'text-[#767F8C]'} hover:text-blue relative`}
              >
                <img
                  src={`/image/Stack.png`}
                  alt="logo"
                  className={`h-auto mr-2 ${isActive("/job/dashboard/overview") ? 'filter-blue' : ''}`}
                />
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/applied-jobs"
                className={`flex items-center ${isActive("/job/dashboard/applied-jobs") ? 'text-blue' : 'text-[#767F8C]'} hover:text-blue relative`}
              >
                <img
                  src={`/image/Briefcase.png`}
                  alt="logo"
                  className={`h-auto mr-2 ${isActive("/job/dashboard/applied-jobs") ? 'filter-blue' : ''}`}
                />
                Applied Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/favorite-jobs"
                className={`flex items-center ${isActive("/job/dashboard/favorite-jobs") ? 'text-blue' : 'text-[#767F8C]'} hover:text-blue relative`}
              >
                <img
                  src={`/image/BookmarkSimple.png`}
                  alt="logo"
                  className={`h-auto mr-2 ${isActive("/job/dashboard/favorite-jobs") ? 'filter-blue' : ''}`}
                />
                Favorite Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/job-alerts"
                className={`flex items-center ${isActive("/job/dashboard/job-alerts") ? 'text-blue' : 'text-[#767F8C]'} hover:text-blue relative`}
              >
                <img
                  src={`/image/BellRinging.png`}
                  alt="logo"
                  className={`h-auto mr-2 ${isActive("/job/dashboard/job-alerts") ? 'filter-blue' : ''}`}
                />
                Job Alert
                <div className="absolute right-0 bg-[#e7f0fa] text-[#18191c] text-xs font-medium font-['Inter'] rounded-sm px-2 py-1">
                  {numberOfJobs}
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/job/dashboard/settings"
                className={`flex items-center ${isActive("/job/dashboard/settings") ? 'text-blue' : 'text-[#767F8C]'} hover:text-blue`}
              >
                <img
                  src={`/image/setting_btn.svg`}
                  alt="logo"
                  className={`w-auto h-auto mr-2 ${isActive("/job/dashboard/settings") ? 'filter-blue' : ''}`}
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