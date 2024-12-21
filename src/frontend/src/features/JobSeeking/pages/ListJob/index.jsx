import React from 'react'
import { useState, useEffect, useContext} from 'react';
import FilterTable from './filter'; 
import jobApi from '../../../../api/jobApi.js';
import companyApi from '../../../../api/companyApi.js';
import { useSearchParams } from "react-router-dom";




function ListJob({isSearch}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [remainingDays, setRemainingDays] = useState([]);
    const [companies, setcompanies] = useState([]);
    const [logo, setLogo] = useState({});
    const [title, setTitle] = useState(null);
    const [searchParams] = useSearchParams();
    const dropdownItems = searchParams.get("dropdownItems");
    const searchQuery = searchParams.get("searchQuery");
    const [filters, setFilters] = useState({
        Experience: null,
        Salary: null,
        JobType: null,
        Education: null,
    });
   
 
    useEffect(()  => {
        const search = async () => {
                let minSalary = null;
                let maxSalary = null;

                if (filters.Salary) {
                    const salaryRange = filters.Salary.split("-"); 
                    if (salaryRange.length === 2) {
                        minSalary = parseInt(salaryRange[0]);
                        maxSalary = parseInt(salaryRange[1]);
                    }else{
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
                    searchPattern: searchQuery,                  
                };
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
    }, [searchQuery,filters]);
    const calculateRemainingDays = () => {
        const updatedListJobs = [];
        const remainingDaysList = [];
        let check  = false;
        for (let i = 0; i < jobs.length; i++) {
            const targetDateString = jobs[i].expirationDate;
            const targetDate = new Date(targetDateString);
            const now = new Date();
            const diff = targetDate - now;
            const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
            if (daysLeft > 0) {
                updatedListJobs.push(jobs[i]);
                remainingDaysList.push(daysLeft);
            }else{
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
    },[]);
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
    },[companies]);
    // Callback function to handle filter data
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters); 
        setIsFilterOpen(false); 
    };

    const handleClose = () => {
        setIsFilterOpen(false);
    };

    return (
    <div className={`flex flex-col gap-12 justify-center items-center w-full py-16`}>    
        <div
            className={`flex flex-row h-12 mb-8 ${
            isSearch === 1 ? "gap-[55rem]" : "gap-[44rem]"
        }`}
        >
        {isSearch === 1 ? (
                <button className="h-12 px-6 py-3 bg-[#0a65cc] rounded-[3px] justify-center items-center gap-3 inline-flex"
                onClick={() =>{ setIsFilterOpen(!isFilterOpen);}}>
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
            <select id="sort" class="bg-white border border-gray/100 text-black rounded-lg p-2">
                <option value="latest">Latest</option>
                <option value="Popular">Popular</option>
            </select>
        </div>
            {/* Job List */}
        <div className='flex flex-col gap-3 items-start justify-start flex-grow h-full'>
                {jobs.map((job, index) => (
                    <div
                    key={index}
                    className="w-[1100px] h-[132px] p-8 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-4 transform transition-transform duration-300 hover:scale-105 hover:border-[#1877f2]"
                    >
                        <div className="justify-start items-start gap-5 flex">
                            <img src={"http://172.28.102.169:8080/api/v1"+ logo[job.companyId]} alt="job_icon" className="w-16 h-16" />
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
                            <div className="p-3 rounded-[5px] justify-start items-start gap-2.5 flex">
                                <img src={`/image/bookmark.png`} alt="icon_star" className="w-4 h-4" />
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
        <div className="h-12 justify-center items-center gap-2 inline-flex">
                <div className="p-3 bg-[#e7f0fa] rounded-[84px] justify-start items-start gap-2.5 flex">
                    <img src={`/image/arrow_left.png`} alt="icon_arrow" className="w-6 h-6" />
                </div>
                <div className="justify-start items-start flex">
                    <div className="w-12 h-12 px-2 py-3.5 bg-[#0a65cc] rounded-[50px] justify-center items-center flex ml-2">
                        <div className="text-center text-white text-sm font-medium font-['Inter'] leading-tight">01</div>
                    </div>
                    <div className="w-12 h-12 px-2 py-3.5 rounded-[50px] justify-center items-center flex">
                        <div className="text-center text-[#5e6670] text-sm font-medium font-['Inter'] leading-tight">02</div>
                    </div>
                    <div className="w-12 h-12 px-2 py-3.5 rounded-[50px] justify-center items-center flex">
                        <div className="text-center text-[#5e6670] text-sm font-medium font-['Inter'] leading-tight">03</div>
                    </div>
                    <div className="w-12 h-12 px-2 py-3.5 rounded-[50px] justify-center items-center flex">
                        <div className="text-center text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">04</div>
                    </div>
                    <div className="w-12 h-12 px-2 py-3.5 rounded-[50px] justify-center items-center flex mr-1">
                        <div className="text-center text-[#5e6670] text-sm font-medium font-['Inter'] leading-tight">05</div>
                    </div>
                </div>
                <div className="p-3 bg-[#e7f0fa] rounded-[84px] justify-start items-start gap-2.5 flex">
                    <img src={`/image/arrow_right.png`} alt="icon_arrow" className="w-6 h-6" />
                </div>
        </div>
        {/* Filter Modal */}
        {isFilterOpen && (
            <div className="w-full fixed inset-0 z-30 flex justify-center items-center bg-black bg-opacity-50">
                <div className="max-h-screen w-2/3 flex justify-center overflow-y-auto bg-white rounded-lg shadow-lg">
                    <FilterTable onFilterChange={handleFilterChange} isCloseChange={handleClose} filters={filters}/>
                </div>
            </div>
                          
        )}
    </div>
  )
}

export default ListJob