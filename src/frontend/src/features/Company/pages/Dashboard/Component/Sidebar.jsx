// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
      <div className="w-full bg-white">
            <div className="p-6">
                <div className="w-full text-[#9199a3] text-xs font-medium font-['Inter'] leading-[18px] mb-6">
                    EMPLOYERS DASHBOARD
                </div>
                <nav>
                    <ul className="space-y-4">
                        <li>
                            <div className="flex items-center text-[#767F8C] hover:text-blue">
                                <img
                                    src={`/image/Stack.png`}
                                    alt="logo"
                                    className="h-auto mr-2"
                                /> 
                                Overview
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center text-[#767F8C] hover:text-blue">
                                <img
                                    src={`/image/PlusCircle.svg`}
                                    alt="logo"
                                    className="h-auto mr-2"
                                /> 
                                Post a Job
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center text-[#767F8C] hover:text-blue">
                                <img
                                    src={`/image/Briefcase.png`}
                                    alt="logo"
                                    className="h-auto mr-2"
                                /> 
                                My Jobs
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center text-[#767F8C] hover:text-blue relative">
                            <img
                            src={`/image/BookmarkSimple.png`}
                            alt="logo"
                            className="w-auto h-auto mr-2"
                            /> Save Candidates
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center text-[#767F8C] hover:text-blue relative">
                            <img
                            src={`/image/setting_btn.svg`}
                            alt="logo"
                            className="w-auto h-auto mr-2"
                            /> Settings
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center text-[#767F8C] hover:text-blue relative mt-64">
                            <img
                            src={`/image/SignOut.svg")`}
                            alt="logo"
                            className="w-auto h-auto mr-2"
                            /> Log-out
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
      </div>
  );
};

export default Sidebar;
