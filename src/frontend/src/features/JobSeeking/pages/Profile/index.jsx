import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();

  // Highlight active button by comparing the current path
  const getButtonClass = (path) => {
    return location.pathname === path
      ? "h-12 px-5 py-3 bg-white shadow-inner justify-start items-center gap-2 inline-flex border-l-4 border-blue-600"
      : "h-12 px-5 py-3 bg-white shadow-inner justify-start items-center gap-2 inline-flex";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="flex w-full max-w-screen-xl">
        {/* Left Column (Sidebar) */}
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

        {/* Main Content */}
        <div className="w-3/4 overflow-y-auto">
          <div className="mx-auto p-4 bg-white shadow-md rounded-lg h-full">
            <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      {/* Profile Form */}
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Nationality</label>
            <select className="w-full border rounded-lg p-2">
              <option value="">Select...</option>
              <option value="vn">Vietnam</option>
              <option value="us">USA</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select className="w-full border rounded-lg p-2">
              <option value="">Select...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Education</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Fill University"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Biography</label>
          <textarea
            rows="4"
            className="w-full border rounded-lg p-2"
            placeholder="Write down your biography here..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default ProfilePage;
