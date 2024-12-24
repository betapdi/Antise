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
            <li>
              <Link
                to="/admin/dashboard/pending-companies"
                className={`flex items-center py-2 gap-4 ${isActive("/admin/dashboard/pending-companies")
                  ? "bg-[#e7f0fa] text-[#0a65cc]"
                  : "text-[#767F8C]"
                  } hover:bg-[#e7f0fa] relative`}
              >
                <img
                  src={`${isActive("/admin/dashboard/pending-companies") ? "/image/BluePlusCircle.png" : "/image/PlusCircle.png"}`}
                  alt="logo"
                  className="h-auto ml-4 mr-2"
                />
                Pending Companies
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/users"
                className={`flex items-center py-2 gap-4 ${isActive("/admin/dashboard/users")
                  ? "bg-[#e7f0fa] text-[#0a65cc]"
                  : "text-[#767F8C]"
                  } hover:bg-[#e7f0fa] relative`}
              >
                <img
                  src={`${isActive("/admin/dashboard/users") ? "/image/BlueUser.png" : "/image/user.png"}`}
                  alt="logo"
                  className="h-auto ml-4 mr-2"
                />
                Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
