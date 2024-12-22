import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { ApplicantContext } from "../../../../../context/ApplicantContext";
import companyApi from "../../../../../api/companyApi";
import applicantApi from "../../../../../api/applicantApi";

function ListJob() {
    const { favoriteJobs, removeFavoriteJob, addFavoriteJob } = useContext(ApplicantContext);
    const numberOfJobs = favoriteJobs.length;
    const [jobCompanies, setJobCompanies] = useState({});
    const [remainingDays, setRemainingDays] = useState([]);
    const [isClicked, setIsClicked] = useState({});

    useEffect(() => {
        const fetchCompanies = async () => {
            const fetchedCompanies = {};

            try {
                await Promise.all(
                    favoriteJobs.map(async (job) => {
                        if (job.companyId && !fetchedCompanies[job.companyId]) {
                            const response = await companyApi.getCompany(job.companyId);
                            fetchedCompanies[job.companyId] = response.data; // Store company data keyed by companyId
                        }
                    })
                );
                setJobCompanies((prevCompanies) => ({ ...prevCompanies, ...fetchedCompanies }));
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        if (favoriteJobs.length > 0) {
            fetchCompanies();
            console.log("COMPANY", jobCompanies);
        }
    }, [favoriteJobs]);

    const calculateRemainingDays = () => {
        const remainingDaysList = [];
        let check = false;
        for (let i = 0; i < favoriteJobs.length; i++) {
            const targetDateString = favoriteJobs[i].expirationDate;
            const targetDate = new Date(targetDateString);
            const now = new Date();
            const diff = targetDate - now;
            const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
            if (daysLeft > 0) {
                remainingDaysList.push(daysLeft);
            } else {
                check = true;
            }
        }
        setRemainingDays(remainingDaysList);
    };

    useEffect(() => {
        calculateRemainingDays();
        if (favoriteJobs.length > 0) {
            const interval = setInterval(() => {
                calculateRemainingDays();
            }, 5000);

            // Cleanup interval on component unmount
            return () => clearInterval(interval);
        }
    }, [favoriteJobs]);

    const handleJobFavoriteClick = (jobId) => {
        setIsClicked((prev) => ({ ...prev, [jobId]: !prev[jobId] }));
    };

    useEffect(() => {
        if (favoriteJobs != null) {
            favoriteJobs.forEach((job) => {
                setIsClicked((prev) => ({ ...prev, [job.id]: true }));
            });
        }
    }, []);

    const handleAddFavoriteJob = async (id) => {
        console.log(id);
        try {
            const response = await applicantApi.addFavoriteJob(id);
            const job = response.data;
            console.log(job);
            addFavoriteJob(job);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveFavoriteJob = async (id) => {
        try {
            const response = await applicantApi.removeFavoriteJob(id);
            const job = response.data;
            console.log("REMOVE", job);
            removeFavoriteJob(id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <span className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">Favorite job </span>
            <span className="text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">({numberOfJobs})</span>
            {/* Job List */}
            <div className='flex flex-col gap-3 items-center justify-center w-full mt-5'>
                {favoriteJobs.map((job, index) => (
                    <div
                        key={index}
                        className="w-full h-[132px] p-6 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-0 transform transition-transform duration-300 hover:border-[#1877f2]"
                    >
                        <div className="justify-start items-start gap-5 flex">
                            <img src={"http://172.28.102.169:8080/api/v1" + [jobCompanies[job.companyId]?.logoUrl]} alt="job_icon" className="w-16 h-16" />
                            <div className="flex-col justify-start items-start gap-3.5 inline-flex">
                                <div className="justify-start items-center gap-2 inline-flex">
                                    <div className="text-[#181f33] text-xl font-medium font-['Inter'] leading-loose">{job.title}</div>
                                    <div className="px-3 py-[3px] bg-[#e8f1ff] rounded-[52px] justify-start items-start gap-2.5 flex">
                                        <div className="text-[#0a65cc] text-sm font-normal font-['Inter'] leading-tight">{job.jobType}</div>
                                    </div>
                                </div>
                                <div className="justify-start items-center gap-4 inline-flex">
                                    <div className="justify-start items-center gap-1.5 flex">
                                        <img src={`/image/icon_map.png`} alt="location_icon" className="h-4" />
                                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.location}</div>
                                    </div>
                                    <div className="justify-start items-center gap-1 flex">
                                        <img src={`/image/icon_salary.png`} alt="salary_icon" className="h-4" />
                                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.minSalary} - {job.maxSalary}</div>
                                    </div>
                                    <div className="justify-start items-center gap-1.5 flex">
                                        <img src={`/image/icon_calander.png`} alt="calendar_icon" className="h-4" />
                                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{remainingDays[index]} Days Remaining</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="justify-start items-start gap-3 flex">
                            <div
                                className="p-3 rounded-[5px] justify-start items-start gap-2.5 flex"
                                onClick={() => {
                                    handleJobFavoriteClick(job.id);
                                    if (!favoriteJobs.some((favJob) => favJob.id === job.id)) {
                                        handleAddFavoriteJob(job.id);
                                    } else {
                                        handleRemoveFavoriteJob(job.id);
                                    }
                                }}
                            >
                                <div className="w-6 h-6 justify-center items-center flex">
                                    <div className="w-6 h-6 relative">
                                        <img
                                            src={`/image/${isClicked[job.id]
                                                ? "bookmark_click.png"
                                                : "bookmark.png"
                                                }`}
                                            alt="icon"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex
                                hover:bg-[#0a65cc] hover:text-white group">
                                <div className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                                    Apply Now
                                </div>
                                <img
                                    src={`/image/arrow_right.png`}
                                    alt="arrow_right"
                                    className="h-4 group-hover:hidden"
                                />
                                <img
                                    src={`/image/arrow_right_hover.png`}
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


const FavoriteJobs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { favoriteJobs } = useContext(ApplicantContext);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(favoriteJobs.length / itemsPerPage);
    const currentJobs = favoriteJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

    return (
        <div>
            <div className={`w-100 overflow-y-auto ml-8 mb-5 `}>
                <ListJob />
            </div>
            <div className="h-12 justify-center items-center gap-2 inline-flex w-full">
                {/* Previous Page Button */}
                <div className="p-3 bg-[#e7f0fa] rounded-[84px] justify-start items-start gap-2.5 flex" onClick={handlePrevPage}>
                    <img src={`/image/arrow_left.png`} alt="icon_arrow" className="w-6 h-6" />
                </div>

                {/* Page Number */}
                <div className="justify-start items-start flex">
                    <div className="w-12 h-12 px-2 py-3.5 bg-[#0a65cc] rounded-[50px] justify-center items-center flex ml-2">
                        <div className="text-center text-white text-sm font-medium font-['Inter'] leading-tight">{currentPage}</div>
                    </div>
                </div>

                {/* Next Page Button */}
                <div className="p-3 bg-[#e7f0fa] rounded-[84px] justify-start items-start gap-2.5 flex" onClick={handleNextPage}>
                    <img src={`/image/arrow_right.png`} alt="icon_arrow" className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}

export default FavoriteJobs;