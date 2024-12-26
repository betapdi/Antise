import React, { useState, useContext, useEffect, useRef } from "react";
import { Route, useNavigate, useLocation } from "react-router-dom";
import { ApplicantContext } from "../../../context/ApplicantContext";
import { useSearchParams } from "react-router-dom";
import NotificationDropdown from "../../Notification/";

function Nav({ isAuthen }) {
  const location = useLocation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownItems, setDropdownItems] = useState("Job");
  const navigate = useNavigate();
  const { profileImageUrl } = useContext(ApplicantContext);
  const [searchQuery, setSearchQuery] = useState("");
  const params = new URLSearchParams({
    dropdownItems,
    searchQuery,
  });
  const [isDropdownAvatarVisible, setIsDropdownAvatarVisible] = useState(false);
  const avatarDropdownRef = useRef(null);
  const [isNotiDropdownOpen, setIsNotiDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleAvatarDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownAvatarVisible((prev) => !prev);
  };

  const toggleNotiDropdown = (e) => {
    e.stopPropagation();
    setIsNotiDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (avatarDropdownRef.current && !avatarDropdownRef.current.contains(e.target)) {
      setIsDropdownAvatarVisible(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsNotiDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/job/findjob")) {
      setDropdownItems("Job");
    } else if (location.pathname.startsWith("/job/findcompany")) {
      setDropdownItems("Company");
    } else {
      setDropdownItems("Job");
    }
  }, [location]);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };
  const handleSignInClick = () => {
    navigate("/auth/login");
  };

  const handleSignUpClick = () => {
    navigate("/auth/register");
  };

  const handleSearchChange = () => {
    if (dropdownItems === "Job") {
      navigate(`/job/listjob/search?${params.toString()}`);
    } else {
      navigate(`/job/findcompany?${params.toString()}`);
    }
  };

  const handleItemClick = (action) => {
    switch (action) {
      case "profile":
        console.log("View profile clicked");
        navigate("dashboard/settings");
        break;
      case "dashboard":
        navigate("dashboard");
        break;
      case "logout":
        console.log("Logout clicked");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.reload("/job/homepage");
        break;
      default:
        console.log("Unhandled action");
    }
    setIsDropdownAvatarVisible(false);
  };

  return (
    <div className="w-full py-5 gap-20 items-center bg-white flex justify-center">
      <div className="flex ms-24 gap-4">
        <div className="justify-start items-center gap-2 flex">
          <img src="/image/logo_job.png" alt="logo" />
          <div className="text-[#18191c] text-2xl font-semibold font-inter leading-10">
            Antise
          </div>
        </div>

        <form className="w-full ml-8">
          <div className="flex flex-row">
            <div className="relative">
              <button
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                onClick={toggleDropdown}
                className="flex-shrink-0 w-44 justify-between inline-flex items-center py-4 px-4 text-sm font-medium text-center text-black rounded-s-lg border border-gray/100"
                type="button"
              >
                <span className="mx-auto">{dropdownItems}</span>
                <svg className="w-4 h-4 ms-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48">
                    <path d="M12 18L24 30L36 18" stroke="#1E1E1E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id="dropdown"
                className={`absolute top-full mt-1 z-10 ${isDropdownVisible ? "block" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setDropdownItems("Job");
                        setDropdownVisible((prev) => !prev);
                      }}
                    >
                      Job
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setDropdownItems("Company");
                        setDropdownVisible((prev) => !prev);
                      }}
                    >
                      Company
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative w-[33rem]">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchQuery(e.target.value)} // Update `tag` as user types
                className="w-full px-4 py-4 pr-10 text-sm font-medium text-black rounded-e-lg border border-gray/100 focus:outline-none"
              />
              <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-sm text-white bg-blue-600 rounded"
                onClick={handleSearchChange}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#0066FF"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="#0066FF"
                    strokewidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </form>
      </div>
      {isAuthen === 1 ? (
        <div className="h-12 justify-start items-center gap-7 inline-flex">
          <div className="relative">
            <button className="inline-block relative" onClick={toggleNotiDropdown}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-[#E05151] bg-[#E05151]"></span>
            </button>
            {isNotiDropdownOpen && (
              <div ref={dropdownRef} className="absolute right-[100px] mt-2 w-64 bg-white shadow-lg rounded-lg">
                <NotificationDropdown />
              </div>
            )}
          </div>

          <div className="relative">
            <img
              className="w-12 h-12 rounded-full cursor-pointer"
              src={"http://172.28.102.169:8080/api/v1" + profileImageUrl}
              alt="avatar"
              onClick={toggleAvatarDropdown}
            />
            {isDropdownAvatarVisible && (
              <div
                ref={avatarDropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg max-h-96 overflow-auto"
              >
                <ul id="dropdownMenu" className="py-2">
                  <li
                    className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                    onClick={() => handleItemClick("profile")}
                  >
                    Profile
                  </li>
                  <li
                    className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                    onClick={() => handleItemClick("dashboard")}
                  >
                    Dashboard
                  </li>
                  <li
                    className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                    onClick={() => handleItemClick("logout")}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
          ) : (
            <div className="justify-end gap-2 flex">
              <button
                className="px-4 py-3 bg-white border border-[#0a65cc] rounded-[3px] justify-center items-center gap-3 flex"
                onClick={handleSignInClick}
              >
                <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">
                  Sign in
                </div>
              </button>
              <button
                className="px-4 py-3 bg-[#0a65cc] rounded-[3px] justify-center items-center gap-3 flex"
                onClick={handleSignUpClick}
              >
                <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                  Sign up
                </div>
              </button>
            </div>
          )}
        </div>
    );
}

export default Nav;
