import React from "react";
import { useState, useEffect } from "react";

const jobs = [
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
    },
];

function ListJob({ jobs, numberOfJobs }) {
    return (
        <div>
            {/*Display how many job are there, for example, display Favorite Job (13) */}

            <span className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">Job Alerts </span>
            <span className="text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">({numberOfJobs} new job)</span>
            {/* Job List */}
            <div className='flex flex-col gap-3 items-center justify-center w-full mt-5'>
                {jobs.map((job, index) => (
                    <div
                        key={index}
                        className="w-full h-[132px] p-6 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-0 transform transition-transform duration-300 hover:border-[#1877f2]"
                    >
                        <div className="justify-start items-start gap-5 flex">
                            <img src={require(`../../../../../image/logoCompany/${job.companyLogo}`)} alt="job_icon" className="w-16 h-16" />
                            <div className="flex-col justify-start items-start gap-3.5 inline-flex">
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="text-[#181f33] text-xl font-medium font-['Inter'] leading-loose">{job.title}</div>
                                    <div className="px-3 py-[3px] bg-[#e8f1ff] rounded-[52px] justify-start items-start gap-2.5 flex">
                                        <div className="text-[#0a65cc] text-sm font-normal font-['Inter'] leading-tight">{job.contractType}</div>
                                    </div>
                                </div>
                                <div className="justify-start items-center gap-4 inline-flex">
                                    <div className="justify-start items-center gap-1.5 flex">
                                        <img src={require("../../../../../image/icon_map.png")} alt="location_icon" className="h-4" />
                                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.location}</div>
                                    </div>
                                    <div className="justify-start items-center gap-1 flex">
                                        <img src={require("../../../../../image/icon_salary.png")} alt="salary_icon" className="h-4" />
                                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.salary}</div>
                                    </div>
                                    <div className="justify-start items-center gap-1.5 flex">
                                        <img src={require("../../../../../image/icon_calander.png")} alt="calendar_icon" className="h-4" />
                                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.daysRemaining} Days Remaining</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="justify-start items-start gap-3 flex">
                            <div className="p-3 rounded-[5px] justify-start items-start gap-2.5 flex">
                                <img src={require("../../../../../image/bookmark.png")} alt="icon_star" className="w-4 h-4" />
                            </div>
                            <div className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex
                                hover:bg-[#0a65cc] hover:text-white group">
                                <div className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                                    Apply Now
                                </div>
                                <img
                                    src={require("../../../../../image/arrow_right.png")}
                                    alt="arrow_right"
                                    className="h-4 group-hover:hidden"
                                />
                                <img
                                    src={require("../../../../../image/arrow_right_hover.png")}
                                    alt="arrow_right_hover"
                                    className="h-4 hidden group-hover:block"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


const JobAlerts = ({ onJobCountChange }) => {
    useEffect(() => {
        onJobCountChange(jobs.length);  // Notify parent of job count
    }, [jobs, onJobCountChange]);

    const itemsPerPage = 8; // Number of jobs to display per page
    const totalPages = Math.ceil(jobs.length / itemsPerPage); // Total number of pages
    const [currentPage, setCurrentPage] = useState(1);

    const currentJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Callback function to handle filter data


    return (
        <div>
            <div className={`w-100 overflow-y-auto ml-8 mb-5 `}>
                <ListJob jobs={currentJobs} numberOfJobs={jobs.length} />
            </div>
            <div className="h-12 justify-center items-center gap-2 inline-flex w-full">
                {/* Previous Page Button */}
                <div className="p-3 bg-[#e7f0fa] rounded-[84px] justify-start items-start gap-2.5 flex" onClick={handlePrevPage}>
                    <img src={require("../../../../../image/arrow_left.png")} alt="icon_arrow" className="w-6 h-6" />
                </div>

                {/* Page Number */}
                <div className="justify-start items-start flex">
                    <div className="w-12 h-12 px-2 py-3.5 bg-[#0a65cc] rounded-[50px] justify-center items-center flex ml-2">
                        <div className="text-center text-white text-sm font-medium font-['Inter'] leading-tight">{currentPage}</div>
                    </div>
                </div>

                {/* Next Page Button */}
                <div className="p-3 bg-[#e7f0fa] rounded-[84px] justify-start items-start gap-2.5 flex" onClick={handleNextPage}>
                    <img src={require("../../../../../image/arrow_right.png")} alt="icon_arrow" className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}

export default JobAlerts;