import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Nav({isAuthen}) {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownItems, setDropdownItems] = useState('Job'); 
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };
    const handleSignInClick = () => {
        navigate('/auth/login'); // Route for Sign In
    };

    const handleSignUpClick = () => {
        navigate('/auth/register'); // Route for Sign Up
    };
    
    return (
        <div className="w-full py-5 gap-20 items-center bg-white flex justify-center">
            <div className="flex gap-4">
                <div className="justify-start items-center gap-2 flex">
                    <img src={require("../../../image/logo_job.png")} alt="logo" />
                    <div className="text-[#18191c] text-2xl font-semibold font-inter leading-10">Antise</div>
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
                                className={`absolute top-full mt-1 z-10 ${isDropdownVisible ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                            >
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                                    <li>
                                        <button
                                            type="button"
                                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                setDropdownItems('Job');
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
                                                setDropdownItems('Company');
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
                                className="w-full px-4 py-4 pr-10 text-sm font-medium text-black rounded-e-lg border border-gray/100 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-sm text-white bg-blue-600 rounded"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M21 21L16.65 16.65" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
        
                    </div>
                </form>
            </div>
            {isAuthen === 1 ? (
                <div className="h-12 justify-start items-center gap-6 inline-flex">
                    <button className="inline-block relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-[#E05151] bg-[#E05151]"></span>
                    </button>
                    <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/48x48" />
                </div>
            ) : (

                <div className="me-5 justify-end gap-2 flex">
                    <button
                        className="px-6 py-3 bg-white border border-[#0a65cc] rounded-[3px] justify-center items-center gap-3 flex"
                        onClick={handleSignInClick}
                    >
                        <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">Sign in</div>
                    </button>
                    <button
                        className="px-6 py-3 bg-[#0a65cc] rounded-[3px] justify-center items-center gap-3 flex"
                        onClick={handleSignUpClick}
                    >
                        <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">Sign up</div>
                    </button>
                </div>
            )}
        </div>
    )
}

export default Nav