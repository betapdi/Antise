import React, { useState, useEffect } from "react";
import { use } from "react";


function ListJob({ jobList }) {
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of jobs to display per page


    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const [remainingDays, setRemainingDays] = useState([]);
    const calculateRemainingDays = () => {
        console.log(jobList);
        for (let i = 0; i < jobList.length; i++) {
            const targetDateString = jobList[i].expirationDate;
            const targetDate = new Date(targetDateString);
            const now = new Date();
            const diff = targetDate - now;
            setRemainingDays((prev) => [...prev, Math.ceil(diff / (1000 * 60 * 60 * 24))]);
        }
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedJobs = jobList.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(jobList.length / itemsPerPage);

    useEffect(() => {
        calculateRemainingDays();
    }, []);

    return (
        <div className="w-full flex flex-col mt-4 gap-4">
            {paginatedJobs.map((job, index) => (
                <div key={index} className='flex flex-row bg-white shadow-md p-5 rounded-lg'>
                    {/* Job Title and Info */}
                    <div className='flex flex-col w-5/12 gap-2'>
                        <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">{job.title}</div>
                        <div className="inline-flex items-center gap-4">
                            <span className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">{job.jobType}</span>
                            <span className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">{remainingDays[index] > 0 ? `${remainingDays[index]}` : "0"} days remaining</span>
                        </div>
                    </div>

                    {/* Job Status */}
                    <div className='inline-flex gap-1 items-center w-2/12'>
                        <img
                            src={remainingDays[index] > 0 ? `/image/CheckCircle.svg` : `/image/XCircle.png`}
                            className='h-6 w-6'
                            alt="status"
                        />
                        <div className={`${remainingDays[index] > 0 ? "text-[#0ba02c]" : "text-[#d32f2f]"} text-sm font-medium font-['Inter'] leading-tight`}>
                            {remainingDays[index] > 0 ? "Active" : "Expired"}
                        </div>
                    </div>

                    {/* Applications Count */}
                    <div className='inline-flex gap-1 items-center w-3/12'>
                        <img
                            src={`/image/Users.svg`}
                            className='h-6 w-6'
                            alt="applications"
                        />
                        <div className="text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight">
                            {job.applications.length} Applications

                        </div>
                    </div>

                    {/* View Applications Button */}
                    <button className="h-12 px-1 py-3 bg-white border-blue border rounded-[3px] justify-center items-center gap-3 inline-flex w-2/12">
                        <span className="text-[#0a65cc] text-sm font-semibold font-['Inter'] capitalize leading-normal">View Applications</span>
                    </button>

                    {/* Arrow Icon */}
                    <div className="h-12 p-3 rounded-[5px] justify-start items-start gap-2.5 inline-flex">
                        <img
                            src={`/image/arrow_right.png`}
                            className='h-6 w-6'
                            alt="arrow"
                        />
                    </div>
                </div>
            ))}
            <div className="h-12 justify-center items-center gap-2 inline-flex">
                {/* Previous Button */}
                <button
                    className="p-3 bg-[#e7f0fa] rounded-[84px]"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <img src={`/image/arrow_left.png`} alt="icon_arrow" className="w-6 h-6" />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                    const startPage = Math.max(1, currentPage - 2); // Ensure startPage is at least 1
                    const endPage = Math.min(totalPages, currentPage + 2); // Ensure endPage does not exceed totalPages
                    const displayPage = startPage + index; // Compute the actual page to display

                    if (displayPage > totalPages) return null; // Prevent rendering out-of-bounds pages

                    return (
                        <button
                            key={displayPage}
                            className={`w-12 h-12 px-2 py-3 rounded-[50px] ${currentPage === displayPage ? "bg-[#0a65cc] text-white" : "text-[#5e6670]"
                                }`}
                            onClick={() => setCurrentPage(displayPage)}
                        >
                            {displayPage}
                        </button>
                    );
                })}

                {/* Next Button */}
                <button
                    className="p-3 bg-[#e7f0fa] rounded-[84px]"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <img src={`/image/arrow_right.png`} alt="icon_arrow" className="w-6 h-6" />
                </button>
            </div>
        </div>
        
    )
}

export default ListJob