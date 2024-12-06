import React from "react";
import { useState } from "react";

const jobs = [
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        dateApplied: "Feb 2, 2019 19:28",
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        dateApplied: "Feb 2, 2019 19:28",
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        dateApplied: "Feb 2, 2019 19:28",
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        dateApplied: "Feb 2, 2019 19:28",
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        dateApplied: "Feb 3, 2019 19:28",
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        dateApplied: "Feb 4, 2019 19:28",
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        dateApplied: "Feb 5, 2019 19:28",
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        dateApplied: "Feb 6, 2019 19:28",
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        dateApplied: "Feb 7, 2019 19:28",
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        dateApplied: "Feb 8, 2019 19:28",
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        dateApplied: "Feb 9, 2019 19:28",
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        dateApplied: "Feb 10, 2019 19:28",
    },
];

function ListJob({ jobs, numberOfJobs }) {
    return (
        <div>
            {/*Display how many job are there, for example, display Favorite Job (13) */}

            <span className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">Applied job </span>
            <span className="text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">({numberOfJobs})</span>
            {/* Job List */}
            <div className='flex flex-col gap-3 items-center justify-center w-full mt-5'>
                <div className="w-full px-5 py-2.5 bg-[#f1f2f4] rounded gap-5 inline-flex">
                    <div className="w-1/2 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">JOBS</div>
                    <div className="w-1/6 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">DATE APPLIED</div>
                    <div className="w-1/12 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">STATUS</div>
                    <div className="w-1/6 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">ACTION</div>
                </div>
                {jobs.map((job, index) => (
                    <div
                        key={index}
                        className="w-full h-[132px] p-6 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-0 transform transition-transform duration-300 hover:border-[#1877f2]"
                    >
                        <div className="justify-start items-start gap-5 flex w-1/2">
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
                                </div>
                            </div>

                        </div>
                        <div className=" text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight mr-10">{job.dateApplied}</div>
                        <div className=" mr-5 justify-start items-start gap-3 flex">
                            <div className="justify-start items-center gap-1.5 flex">
                                <img src={require("../../../../../image/Check.png")} alt="icon_star" className="w-4 h-4" />
                                <div className="text-[#0ba02c] text-sm font-medium font-['Inter'] leading-tight">Active</div>
                            </div>

                        </div>
                        <div className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex
                                hover:bg-[#0a65cc] hover:text-white group mr-5">
                            <div className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                                View Detail
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


const AppliedJobs = () => {

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

export default AppliedJobs;