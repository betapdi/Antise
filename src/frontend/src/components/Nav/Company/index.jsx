import React from 'react'

function NavCompany() {
  return (
    <div className="w-full py-5 gap-20 items-center bg-white flex justify-center">
        <div className="flex flex-row justify-between w-full max-w-5xl">
            <div className=" items-center gap-2 flex">
                <img src={require("../../../image/logo_job.png")} alt="logo" />
                <div className="text-[#18191c] text-2xl font-semibold font-inter leading-10">Antise</div>
            </div>
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
                    <button className="h-12 px-6 py-3 rounded-[3px] border-2 border-[#0a65cc] justify-center items-center gap-3 text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal inline-flex hover:bg-[#0a65cc] hover:text-white">
                        Post a Job
                    </button>
                    <img className="w-12 h-12 rounded-full" src="https://via.placeholder.com/48x48" />
            </div>
        </div>
    </div>
  )
}

export default NavCompany