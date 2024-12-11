import React from 'react'
import { useState } from 'react';
import FilterTable from './filter'; 
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
];


function ListJob({isSearch}) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({}); // State to hold filter criteria

    // Callback function to handle filter data
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters); // Update filters state
        setIsFilterOpen(false); // Close the filter modal
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
                <div className="h-12 px-6 py-3 bg-[#0a65cc] rounded-[3px] justify-center items-center gap-3 inline-flex">
                    <div className="w-6 h-6 justify-center items-center flex">
                        <img src={`/image/icon_filter.png`} alt="icon_filter" className="w-6 h-6" />
                    </div>
                    <button className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal"
                                    onClick={() =>{ setIsFilterOpen(!isFilterOpen); console.log(isFilterOpen);}}
                    >
                        Filter
                    </button>
                </div>
            ) : (
                <div className="text-center text-[#181f33] text-[40px] font-medium font-['Inter'] leading-[48px]">Featured job</div>
        )}
            <select id="sort" class="bg-white border border-gray/100 text-black rounded-lg p-2">
                <option value="latest">Latest</option>
                <option value="Popular">Popular</option>
            </select>
        </div>
            {/* Job List */}
        <div className='flex flex-col gap-3 items-center justify-center'>
                {jobs.map((job, index) => (
                    <div
                    key={index}
                    className="w-[1100px] h-[132px] p-8 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-4 transform transition-transform duration-300 hover:scale-105 hover:border-[#1877f2]"
                    >
                        <div className="justify-start items-start gap-5 flex">
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
                                    <div className="justify-start items-center gap-1.5 flex">
                                        <img src={`/image/icon_calander.png`} alt="calendar_icon" className="h-4" />
                                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.daysRemaining} Days Remaining</div>
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
                    <FilterTable onFilterChange={handleFilterChange} isCloseChange={handleClose}/>
                </div>
            </div>
                          
        )}
    </div>
  )
}

export default ListJob