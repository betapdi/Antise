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
          <ul className="">
            <li>
              <Link
                to="/admin/dashboard/overview"
                className={`flex items-center py-2 gap-4 ${isActive("/admin/dashboard/overview")
                  ? "bg-[#e7f0fa] text-[#0a65cc]"
                  : "text-[#767F8C]"
                  } hover:bg-[#e7f0fa] relative`}
              >
                <img
                  src={`${isActive("/admin/dashboard/overview") ? "/image/BlueStack.png" : "/image/Stack.png"}`}
                  alt="logo"
                  className={`h-auto ml-4 mr-2 ${isActive("/admin/dashboard/overview") ? "filter-blue" : ""
                    }`}
                />
                Overview
              </Link>
            </li>
            {/* <li>
              <Link
                to="/company/dashboard/post-job"
                className={`flex items-center py-2 gap-4 ${isActive("/company/dashboard/post-job")
                  ? "bg-[#e7f0fa] text-[#0a65cc]"
                  : "text-[#767F8C]"
                  } hover:bg-[#e7f0fa] relative`}
              >
                <img
                  src={`${isActive("/company/dashboard/post-job") ? "/image/BluePlusCircle.png" : "/image/PlusCircle.png"}`}
                  alt="logo"
                  className="h-auto ml-4 mr-2"
                />
                Post a Job
              </Link>
            </li>
            <li>
              <Link
                to="/company/dashboard/my-job"
                className={`flex items-center py-2 gap-4 ${isActive("/company/dashboard/my-job")
                  ? "bg-[#e7f0fa] text-[#0a65cc]"
                  : "text-[#767F8C]"
                  } hover:bg-[#e7f0fa] relative`}
              >
                <img
                  src={`${isActive("/company/dashboard/my-job") ? "/image/BlueBriefcase.png" : "/image/Briefcase.png"}`}
                  alt="logo"
                  className="h-auto ml-4 mr-2"
                />
                My Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/company/dashboard/candidate"
                className={`flex items-center py-2 gap-4 ${isActive("/company/dashboard/candidate")
                  ? "bg-[#e7f0fa] text-[#0a65cc]"
                  : "text-[#767F8C]"
                  } hover:bg-[#e7f0fa] relative`}
              >
                <img
                  src={`${isActive("/company/dashboard/candidate") ? "/image/BlueBookmarkSimple.png" : "/image/BookmarkSimple.png"}`}
                  alt="logo"
                  className="h-auto ml-4 mr-2"
                />
                Candidates
              </Link>
            </li>
            <li>
              <Link
                to="/company/dashboard/settings"
                className={`flex items-center py-2 gap-4 ${isActive("/company/dashboard/settings")
                  ? "bg-[#e7f0fa] text-[#0a65cc]"
                  : "text-[#767F8C]"
                  } hover:bg-[#e7f0fa]`}
              >
                <img
                  src={`${isActive("/company/dashboard/settings") ? "/image/BlueGear.png" : "/image/setting_btn.svg"}`}
                  alt="logo"
                  className={`w-auto h-auto ml-4 mr-2 ${isActive("/company/dashboard/settings") ? "filter-blue" : ""
                    }`}
                />
                Settings
              </Link>
            </li>
            <li>
              <div className="flex items-center py-2.5 text-[#767F8C] hover:bg-[#e7f0fa] relative mt-64">
                <img
                  src={`/image/SignOut.png`}
                  alt="logo"
                  className="w-auto h-auto ml-4 mr-2"
                />
                Log-out
              </div> */}
            {/* </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
