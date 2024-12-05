import React from 'react'

function postjobsuccess() {
  return (
    <div className="w-full flex flex-col mx-auto p-8 bg-white shadow-md rounded">
        <div className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">🎉 Congratulation, Your Job is successfully posted!</div>
        <div className="text-[#767f8c] text-base font-normal font-['Inter'] leading-normal">You can manage your form my-jobs section in your dashboard</div>
        <button className="h-12 px-6 py-3 rounded-[3px] border-2 border-[#0a65cc] justify-center items-center gap-3 inline-flex text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal hover:bg-blue hover:text-white">
            View Jobs
            <img
                src={require("../../../../image/arrow_right.png")}
                alt="arrow-right"
                className="group-hover:hidden"
            />
            <img
                src={require("../../../../image/arrow_right_hover.png")}
                alt="arrow-right-hover"
                className="hidden group-hover:inline"
            />
        </button>
    </div>
  )
}

export default postjobsuccess