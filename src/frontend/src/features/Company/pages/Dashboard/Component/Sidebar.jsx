// Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.toLowerCase() === path; // Check if the link is active
  return (
    <div className="w-full bg-white">
      <div className="p-6">
        <div className="w-full text-[#9199a3] text-xs font-medium font-['Inter'] leading-[18px] mb-6">
          EMPLOYERS DASHBOARD
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/company/dashboard/overview"
                className={`flex items-center ${
                  isActive("/company/dashboard/overview")
                    ? "text-blue"
                    : "text-[#767F8C]"
                } hover:text-blue relative`}
              >
                <img
                  src={`/image/Stack.png`}
                  alt="logo"
                  className={`h-auto mr-2 ${
                    isActive("/company/dashboard/overview") ? "filter-blue" : ""
                  }`}
                />
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/company/dashboard/post-job"
                className={`flex items-center ${
                  isActive("/company/dashboard/post-job")
                    ? "text-blue"
                    : "text-[#767F8C]"
                } hover:text-blue relative`}
              >
                <img
                  src={`/image/PlusCircle.svg`}
                  alt="logo"
                  className="h-auto mr-2"
                />
                Post a Job
              </Link>
            </li>
            <li>
              <Link
                to="/company/dashboard/my-job"
                className={`flex items-center ${
                  isActive("/company/dashboard/my-job")
                    ? "text-blue"
                    : "text-[#767F8C]"
                } hover:text-blue relative`}
              >
                <img
                  src={`/image/Briefcase.png`}
                  alt="logo"
                  className="h-auto mr-2"
                />
                My Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/company/dashboard/candidate"
                className={`flex items-center ${
                  isActive("/company/dashboard/candidate")
                    ? "text-blue"
                    : "text-[#767F8C]"
                } hover:text-blue relative`}
              >
                <img
                  src={`/image/BookmarkSimple.png`}
                  alt="logo"
                  className="h-auto mr-2"
                />
                Candidates
              </Link>
            </li>
            <li>
              <Link
                to="/company/dashboard/settings"
                className={`flex items-center ${
                  isActive("/company/dashboard/settings")
                    ? "text-blue"
                    : "text-[#767F8C]"
                } hover:text-blue`}
              >
                <img
                  src={`/image/setting_btn.svg`}
                  alt="logo"
                  className={`w-auto h-auto mr-2 ${
                    isActive("/company/dashboard/settings") ? "filter-blue" : ""
                  }`}
                />
                Settings
              </Link>
            </li>
            <li>
              <div className="flex items-center text-[#767F8C] hover:text-blue relative mt-64">
                <img
                  src={`/image/SignOut.png`}
                  alt="logo"
                  className="w-auto h-auto mr-2"
                />
                Log-out
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
