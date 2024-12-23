import React from 'react'
import { useState, useEffect, useContext } from 'react';
import FilterTable from './filter';
import jobApi from '../../../../api/jobApi.js';
import companyApi from '../../../../api/companyApi.js';
import { useSearchParams, useNavigate } from "react-router-dom";
import { UserContext } from '../../../../context/UserContext';
import { ApplicantContext } from '../../../../context/ApplicantContext';
import applicantApi from '../../../../api/applicantApi';




function ListJob({ isSearch }) {
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const { role } = useContext(UserContext);
    const itemsPerPage = 5; // Number of jobs to display per page
    const navigate = useNavigate();


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

    const handleViewDetailJob = (job) => {
        navigate(`/job/detailjob/${job.id}`);
    };


    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [remainingDays, setRemainingDays] = useState([]);
    const [companies, setcompanies] = useState([]);
    const [logo, setLogo] = useState({});
    const [title, setTitle] = useState(null);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("searchQuery");
    const [filters, setFilters] = useState({
        Experience: null,
        Salary: null,
        JobType: null,
        Education: null,
    });
    const [sortOption, setSortOption] = useState("latest");
    // Handle sorting
    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        setSortOption(selectedOption);

        const sortedJobs = [...jobs];
        if (selectedOption === "latest") {
            sortedJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        } else if (selectedOption === "popular") {
            sortedJobs.sort((a, b) => b.applicant.length - a.applicant.length); // Assuming popularity is a job attribute
        }
        setJobs(sortedJobs);
    };


    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedJobs = jobs.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(jobs.length / itemsPerPage);

    useEffect(() => {
        const search = async () => {
            let minSalary = null;
            let maxSalary = null;

            if (filters.Salary) {
                const salaryRange = filters.Salary.split("-");
                if (salaryRange.length === 2) {
                    minSalary = parseInt(salaryRange[0]);
                    maxSalary = parseInt(salaryRange[1]);
                } else {
                    minSalary = parseInt(salaryRange[0]);
                    maxSalary = parseInt("10000000000000");
                }
            }
            const searchData = {
                experience: filters.Experience,
                minSalary: minSalary,
                maxSalary: maxSalary,
                jobType: filters.JobType,
                education: filters.Education,
                searchPattern: searchQuery !== "" ? searchQuery : null
            };
            console.log(searchData);
            try {
                console.log(searchData);
                const response = await jobApi.searchJob(searchData);
                console.log("Search Jobs: ", response.data);
                setJobs(response.data);
            } catch (error) {
                console.error("Error searching jobs:", error);
            }
        }
        search();
    }, [searchQuery, filters]);
    const calculateRemainingDays = () => {
        const updatedListJobs = [];
        const remainingDaysList = [];
        let check = false;
        for (let i = 0; i < jobs.length; i++) {
            const targetDateString = jobs[i].expirationDate;
            const targetDate = new Date(targetDateString);
            const now = new Date();
            const diff = targetDate - now;
            const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
            if (daysLeft > 0) {
                updatedListJobs.push(jobs[i]);
                remainingDaysList.push(daysLeft);
            } else {
                check = true;
            }
        }
        if (check) setJobs(updatedListJobs);
        setRemainingDays(remainingDaysList);
    };

    // Fetch all jobs from API
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await jobApi.getAllJobs();
                console.log("Fetch Jobs: ", response.data);
                setJobs(response.data);
            } catch (error) {
                console.log("Failed to fetch jobs: ", error);
            }
        }
        fetchJobs();
    }, []);

    useEffect(() => {
        calculateRemainingDays();
        if (jobs.length > 0) {
            const interval = setInterval(() => {
                calculateRemainingDays();
            }, 5000);

            // Cleanup interval on component unmount
            return () => clearInterval(interval);
        }
    }, [jobs]);
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await companyApi.getAllCompanies();
                console.log("Fetch Companies: ", response.data);
                setcompanies(response.data);
            } catch (error) {
                console.log("Failed to fetch companies: ", error);
            }
        }
        fetchCompanies();
    }, []);
    useEffect(() => {
        if (companies.length > 0) {
            const idToLogoMap = {}
            for (const company of companies) {
                console.log("Company: ", company.id, " id: ", company.logoUrl);
                if (company.id && company.logoUrl) {
                    idToLogoMap[company.id] = company.logoUrl;
                }
            }
            setLogo(idToLogoMap);
        }
    }, [companies]);
    // Callback function to handle filter data
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setIsFilterOpen(false);
    };

    const handleClose = () => {
        setIsFilterOpen(false);
    };

    const { favoriteJobs, removeFavoriteJob, addFavoriteJob } = useContext(ApplicantContext);
    const [isClicked, setIsClicked] = useState({});
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
        <div className={`flex flex-col gap-12 justify-center items-center w-full py-16`}>
            <div
                className={`flex flex-row h-12 mb-8 ${isSearch === 1 ? "gap-[55rem]" : "gap-[44rem]"
                    }`}
            >
                {isSearch === 1 ? (
                    <button className="h-12 px-6 py-3 bg-[#0a65cc] rounded-[3px] justify-center items-center gap-3 inline-flex"
                        onClick={() => { setIsFilterOpen(!isFilterOpen); }}>
                        <div className="w-6 h-6 justify-center items-center flex">
                            <img src={`/image/icon_filter.png`} alt="icon_filter" className="w-6 h-6" />
                        </div>
                        <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                            Filter
                        </div>
                    </button>
                ) : (
                    <div className="text-center text-[#181f33] text-[40px] font-medium font-['Inter'] leading-[48px]">Featured job</div>
                )}
                <select id="sort" class="bg-white border border-gray/100 text-black rounded-lg p-2"
                    value={sortOption}
                    onChange={handleSortChange}
                >
                    <option value="latest">Latest</option>
                    <option value="Popular">Popular</option>
                </select>
            </div>
            {/* Job List */}
            <div className='flex flex-col gap-3 items-start justify-start flex-grow h-full'>
                {paginatedJobs.map((job, index) => (
                    <div
                        key={index}
                        className="w-[1100px] h-[132px] p-8 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-4 transform transition-transform duration-300 hover:scale-105 hover:border-[#1877f2]"
                    >
                        <div className="justify-start items-start gap-5 flex">
                            <img src={"http://172.28.102.169:8080/api/v1" + logo[job.companyId]} alt="job_icon" className="w-16 h-16" />
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
                                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{remainingDays[index]}  Days Remaining</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="justify-start items-start gap-3 flex">
                            <>
                                {role === "APPLICANT" && (
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
                                )}
                            </>
                            <div className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex
                            hover:bg-[#0a65cc] hover:text-white group">
                                <button className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal"
                                    onClick={() => handleViewDetailJob(job)}
                                >
                                    Apply Now
                                </button>
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
            {/* Filter Modal */}
            {isFilterOpen && (
                <div className="w-full fixed inset-0 z-30 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="max-h-screen w-2/3 flex justify-center overflow-y-auto bg-white rounded-lg shadow-lg">
                        <FilterTable onFilterChange={handleFilterChange} isCloseChange={handleClose} filters={filters} />
                    </div>
                </div>

            )}
        </div>
    )
}

export default ListJob