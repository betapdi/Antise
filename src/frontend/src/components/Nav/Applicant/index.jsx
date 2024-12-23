import React from "react";
import { useState, useContext, useEffect } from "react";
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

  const [isNotiDropdownOpen, setIsNotiDropdownOpen] = useState(false);

  const toggleNotiDropdown = () => {
    setIsNotiDropdownOpen(!isNotiDropdownOpen);
  };

  const handleAvatarClick = () => {
    setIsDropdownAvatarVisible((prev) => !prev);
  };

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
    navigate("/auth/login"); // Route for Sign In
  };

  const handleSignUpClick = () => {
    navigate("/auth/register"); // Route for Sign Up
  };
  const handleSearchChange = () => {
    console.log(searchQuery);

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
    handleAvatarClick();
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
                <svg
                  className="w-4 h-4 ms-auto"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M12 18L24 30L36 18"
                    stroke="#1E1E1E"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </form>
      </div>
      {isAuthen === 1 ? (
        <div className="h-12 justify-start items-center gap-7 inline-flex">
          <div className = "relative">
          <button 
          className="inline-block relative "
          onClick={toggleNotiDropdown}>
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
            <div className="absolute right-[100px] mt-2 w-64 bg-white shadow-lg rounded-lg">
              <NotificationDropdown />
            </div>
          )}
          </div>

          <div className="relative">
            <div className="w-full">
              <img
                className="w-12 h-12 rounded-full cursor-pointer"
                src={"http://172.28.102.169:8080/api/v1" + profileImageUrl}
                alt="avatar"
                onClick={handleAvatarClick}
              />
            </div>

            {isDropdownAvatarVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg max-h-96 overflow-auto">
                <ul id="dropdownMenu" className="py-2">
                  <li
                    className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                    onClick={() => handleItemClick("profile")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-4 h-4 mr-3"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M337.711 241.3a16 16 0 0 0-11.461 3.988c-18.739 16.561-43.688 25.682-70.25 25.682s-51.511-9.121-70.25-25.683a16.007 16.007 0 0 0-11.461-3.988c-78.926 4.274-140.752 63.672-140.752 135.224v107.152C33.537 499.293 46.9 512 63.332 512h385.336c16.429 0 29.8-12.707 29.8-28.325V376.523c-.005-71.552-61.831-130.95-140.757-135.223zM446.463 480H65.537V376.523c0-52.739 45.359-96.888 104.351-102.8C193.75 292.63 224.055 302.97 256 302.97s62.25-10.34 86.112-29.245c58.992 5.91 104.351 50.059 104.351 102.8zM256 234.375a117.188 117.188 0 1 0-117.188-117.187A117.32 117.32 0 0 0 256 234.375zM256 32a85.188 85.188 0 1 1-85.188 85.188A85.284 85.284 0 0 1 256 32z"
                      ></path>
                    </svg>
                    View profile
                  </li>
                  <li
                    className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                    onClick={() => handleItemClick("dashboard")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-4 h-4 mr-3"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.337 5.337 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0"
                      ></path>
                    </svg>
                    Dashboard
                  </li>
                  <li
                    className="py-2.5 px-5 flex items-center hover:bg-gray-100 text-[#333] text-sm cursor-pointer"
                    onClick={() => handleItemClick("logout")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-4 h-4 mr-3"
                      viewBox="0 0 6.35 6.35"
                    >
                      <path
                        d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                      ></path>
                    </svg>
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
