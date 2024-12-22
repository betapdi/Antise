import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ApplicantContext } from "../../../../../context/ApplicantContext";
import jobApi from "../../../../../api/jobApi";
import applicantApi from "../../../../../api/applicantApi";


function ListJob({ jobs, numberOfJobs }) {
    const navigate = useNavigate();
    const handleSettingCompany = (company) => {
        navigate(`/job/dashboard/settings`);
    };
    return (
        <div classname="space-y-5 flex-col justify-start items-start gap-5 inline-flex border ">
            {/*Display how many job are there, for example, display Favorite Job (13) */}
            <div className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7 mb-2">Hello, Esther Howard</div>
            <div className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight mb-5">Here is your daily activities and job alerts</div>
            <div className="flex w-full gap-5 mb-5">
                <div className="w-1/3 pl-6 pr-5 bg-[#e7f0fa] rounded-lg justify-center items-center gap-20 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex mb-2">
                        <div className=" text-[#18191c] text-2xl font-semibold font-['Inter'] leading-loose">589</div>
                        <div className=" opacity-80 text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">Applied jobs</div>
                    </div>
                    <div className="p-4 bg-white rounded-[5px] justify-start items-start gap-2.5 flex">
                        <img src={`/image/briefcase-duotone (1) 1.png`} alt="icon_star" className="w-8 h-8" />
                    </div>
                </div>
                <div className="w-1/3 pl-6 pr-5 py-5 bg-[#fff6e6] rounded-lg justify-center items-center gap-20 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex mb-2">
                        <div className="text-[#18191c] text-2xl font-semibold font-['Inter'] leading-loose">238</div>
                        <div className="opacity-80 text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">Favorite jobs</div>
                    </div>
                    <div className="p-4 bg-white rounded-[5px] justify-start items-start gap-2.5 flex">
                        <div className="justify-center items-center flex">
                            <img src={`/image/BookmarkSimpleColored.png`} alt="icon_star" className="w-8 h-8" />
                        </div>
                    </div>
                </div>
                <div className="w-1/3 pl-6 pr-5 py-5 bg-[#e7f6ea] rounded-lg justify-center items-center gap-20 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex">
                        <div className=" text-[#18191c] text-2xl font-semibold font-['Inter'] leading-loose">574</div>
                        <div className="opacity-80 text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">Job Alerts</div>
                    </div>
                    <div className="p-4 bg-white rounded-[5px] justify-start items-start gap-2.5 flex">
                        <div className="w-8 h-8 justify-center items-center flex">
                            <img src={`/image/BellRingingColored.png`} alt="icon_star" className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-32 p-8 bg-[#e05050] rounded-lg justify-between items-center inline-flex mb-5">
                <div className="justify-center items-center gap-6 flex">
                    <img className="w-16 h-16 rounded-full" alt="icon_star" src={`/image/Ellipse 19.png`} />
                    <div className="flex-col justify-start items-start gap-2 inline-flex">
                        <div className="text-white text-lg font-medium font-['Inter'] leading-7">Your profile editing is not completed.</div>
                        <div className="text-white text-sm font-normal font-['Inter'] leading-tight">Complete your profile editing & build your custom Resume</div>
                    </div>
                </div>
                <button className="px-6 py-3 bg-white rounded-[3px] justify-center items-center gap-3 flex">
                    <div className="text-[#e05050] text-base font-semibold font-['Inter'] capitalize leading-normal"
                        onClick={() => handleSettingCompany()}
                    >Edit Profile</div>
                    <img src={`/image/fi_arrow-right.png`} alt="icon_star" className="w-8 h-8" />
                </button>
            </div>
            <div className="w-full h-6 justify-between items-center inline-flex">
                <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">Recently Applied</div>
                <div className="justify-center items-center gap-2 flex">
                    <div className="text-[#767f8c] text-base font-medium font-['Inter'] leading-normal">View all</div>
                    <img src={`/image/fi_arrow-right-grey.png`} alt="icon_star" className="w-6 h-6" />
                </div>
            </div>
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
                            <img src={`/image/logoCompany/${job.companyLogo}`} alt="job_icon" className="w-16 h-16" />
                            <div className="flex-col justify-start items-start gap-3.5 inline-flex">
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="text-[#181f33] text-xl font-medium font-['Inter'] leading-loose">{job.title}</div>
                                    <div className="px-3 py-[3px] bg-[#e8f1ff] rounded-[52px] justify-start items-start gap-2.5 flex">
                                        <div className="text-[#0a65cc] text-sm font-normal font-['Inter'] leading-tight">{job.contractType}</div>
                                    </div>
                                </div>
                                <div className="justify-start items-center gap-4 inline-flex">
                                    <div className="justify-start items-center gap-1.5 flex">
                                        <img src={`/image/icon_map.png`} alt="location_icon" className="h-4" />
                                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.location}</div>
                                    </div>
                                    <div className="justify-start items-center gap-1 flex">
                                        <img src={`/image/icon_salary.png`} alt="salary_icon" className="h-4" />
                                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.salary}</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className=" text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight mr-10">{job.dateApplied}</div>
                        <div className=" mr-5 justify-start items-start gap-3 flex">
                            <div className="justify-start items-center gap-1.5 flex">
                                <img src={`/image/Check.png`} alt="icon_star" className="w-4 h-4" />
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

    // const { applications, favoriteJobs } = useContext(ApplicantContext);
    // const [jobIDs, setJobIDs] = useState([]);
    // const [jobs, setJobs] = useState([]);
    // const [isClicked, setIsClicked] = useState(false);

    // useEffect(() => {
    //     const fetchJobs = async () => {
    //         try {
    //             // Fetch job details for each jobId
    //             const jobPromises = jobIDs.map((jobID) => jobApi.getJob(jobID));
    //             const jobResponses = await Promise.all(jobPromises);
    //             const jobData = jobResponses.map((response) => response.data);
    //             setJobs(jobData);

    //             // Check if any of the jobs are in favoriteJobs
    //             const isAnyJobFavorite = jobIDs.some((jobID) =>
    //                 favoriteJobs.some((job) => job.id === jobID)
    //             );
    //             setIsClicked(isAnyJobFavorite);
    //         } catch (error) {
    //             console.error('Error fetching job data:', error);
    //         }
    //     };

    //     if (jobIDs && jobIDs.length > 0) {
    //         fetchJobs();
    //     }
    // }, [jobIDs, favoriteJobs]);

    const [appliedJobs, setAppliedJob] = useState([]);
    useEffect(() => {
        const fetchAppliedJob = async () => {
            try {
                const response = await applicantApi.getAppliedJob();
                console.log("Fetch Applied Jobs: ", response.data);
                setAppliedJob(response.data);
            } catch (error) {
                console.log("Failed to fetch companies: ", error);
            }
        };
        fetchAppliedJob();
    }, []);


    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedJobs = appliedJobs.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(appliedJobs.length / itemsPerPage);

    return (
        <div>
            <div className={`w-100 overflow-y-auto ml-8 mb-5 `}>
                <ListJob jobs={paginatedJobs} numberOfJobs={appliedJobs.length} />
            </div>
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
    );
}

export default AppliedJobs;