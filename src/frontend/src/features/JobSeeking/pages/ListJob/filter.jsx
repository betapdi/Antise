import React from 'react'
import { useState,useEffect } from 'react';

const experienceLevels = [
    { id: "freshers", value: "freshers", label: "Freshers" },
    { id: "1-2", value: "1 - 2 Years", label: "1 - 2 Years" },
    { id: "2-4", value: "2 - 4 Years", label: "2 - 4 Years" },
    { id: "4-6", value: "4 - 6 Years", label: "4 - 6 Years" },
    { id: "6-8", value: "6 - 8 Years", label: "6 - 8 Years" },
    { id: "8-10", value: "8 - 10 Years", label: "8 - 10 Years" },
    { id: "10-15", value: "10 - 15 Years", label: "10 - 15 Years" },
    { id: "15+", value: "15+ Years", label: "15+ Years" },
];
const salary = [
    { id: "freshers", value: "50 - 1000", label: "$50 - $1000" },
    { id: "1-2", value: "1000-2000", label: "$1000 - $2000" },
    { id: "2-4", value: "3000-4000", label: "$3000 - $4000" },
    { id: "4-6", value: "4-6", label: "$4000 - $6000" },
    { id: "6-10", value: "6-10", label: "$6000 - $8000" },
    { id: "8-10", value: "8-10", label: "$8000 - $10000" },
    { id: "10-15", value: "10-15", label: "$10000 - $15000" },
    { id: "15+", value: "15000+", label: "$15000+" },
];
const type = [
    { id: "All", value: "All", label: "All" },
    { id: "Full Time", value: "Full Time", label: "Full Time" },
    { id: "Part Time", value: "Part Time", label: "Part Time" },
    { id: "Internship", value: "Internship", label: "Internship" },
    { id: "Remote", value: "Remote", label: "Remote" },
    { id: "Temporary", value: "Temporary", label: "Temporary" },
    { id: "Contract Base", value: "Contract Base", label: "Contract Base" },
];
const level = [
    { id: "Entry Level", value: "Entry Level", label: "Entry Level" },
    { id: "Mid Level", value: "Mid Level", label: "Mid Level" },
    { id: "Expert Level", value: "Expert Level", label: "Expert Level" },
];


const education = [
    { id: "All", value: "All", label: "All" },
    { id: "High School", value: "High School", label: "High School" },
    { id: "Intermediate", value: "Intermediate", label: "Intermediate" },
    { id: "Graduation", value: "Graduation", label: "Graduation" },
    { id: "Master Degree", value: "Master Degree", label: "Master Degree" },
    { id: "Bachelor Degree", value: "Bachelor Degree", label: "Bachelor Degree" },
];

function FilterTable({ onFilterChange , isCloseChange,filters}) {
    const [localFilters, setLocalFilters] = useState({ ...filters });
    
    useEffect(() => {
        // Initialize local state with the passed filters when the component mounts
        setLocalFilters({ ...filters });
    }, [filters]);

    const handleRadioChange = (e, category) => {
        setLocalFilters((prev) => ({
            ...prev,
            [category]: e.target.value,
        }));
    };
    const applyFilters = () => {
        onFilterChange(localFilters); // Send the updated filters back to the parent
    };
    const clearFilters = () => {
        setLocalFilters({
            Experience: null,
            Salary: null,
            JobType: null,
            Education: null
        });
    };
    
    return (
    <div className="w-full bg-white flex flex-col justify-center items-center rounded-lg shadow-xl">
        <div className="h-16 w-full flex flex-row items-center justify-end border border-[#EDEFF5]">
            <button className="h-10 w-full max-w-[150px] px-4 py-4 bg-[#0a65cc] rounded justify-center items-center gap-3 inline-flex border-b-2 border-gray/100 my-2 me-4"
            onClick={applyFilters}>
                <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                    Apply Filter
                </div>
            </button>
            <button className="h-10 w-full max-w-[150px] px-4 py-4 bg-[#0a65cc] rounded justify-center items-center gap-3 inline-flex border-b-2 border-gray/100 my-2 me-4"
            onClick={clearFilters}>
                <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                    Clear Filters
                </div>
            </button>
            <button className="h-10 w-full max-w-[150px] px-4 py-4 bg-[#0a65cc] rounded justify-center items-center gap-3 inline-flex border-b-2 border-gray/100 my-2 me-4"
                                onClick={() => isCloseChange(true)}
            >
                <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                    Close
                </div>
            </button>
        </div>
        <div className='flex flex-row justify-start sm:gap-4 md:gap-8 lg:gap-12 mb-4 mt-2'>
                <div className='flex flex-col gap-2'>
                    <h1 className=' text-[#181f33] text-lg font-medium font-inter leading-7'>Experience</h1>
                    <div className="flex flex-col gap-1">
                    {experienceLevels.map((item) => (
                        <div key={item.id} className="flex flex-row gap-2">
                            <input type="radio" id={item.id} class="accent-blue" name="experience" value={item.value} 
                            onChange={(e) => handleRadioChange(e, 'Experience')}
                            checked={localFilters.Experience === item.value}/>
                            <label htmlFor={item.id} className="text-[#181f33] text-sm font-normal font-['Inter'] checked:bg-blue cursor-pointer form-radio">{item.label}</label>
                        </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className=' text-[#181f33] text-lg font-medium font-inter leading-7'>Salary</h1>
                    <div className="flex flex-col gap-1">
                    {salary.map((item) => (
                        <div key={item.id} className="flex flex-row gap-2">
                            <input type="radio" id={item.id} class="accent-blue" name="salary" value={item.value} 
                            onChange={(e) => handleRadioChange(e, 'Salary')}
                            checked={localFilters.Salary === item.value}/>
                            <label htmlFor={item.id} className="text-[#181f33] text-sm font-normal font-['Inter']">{item.label}</label>
                        </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className=' text-[#181f33] text-lg font-medium font-inter leading-7'>Job Type</h1>
                    <div className="flex flex-col gap-1">
                    {type.map((item) => (
                        <div key={item.id} className="flex flex-row gap-2">
                            <input type="radio" id={item.id} class="accent-blue" name="type" value={item.value} 
                             onChange={(e) => handleRadioChange(e, 'JobType')}
                             checked={localFilters.JobType === item.value}/>
                            <label htmlFor={item.id} className="text-[#181f33] text-sm font-normal font-['Inter'] peer-checked:text-blue cursor-pointer">{item.label}</label>
                        </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className=' text-[#181f33] text-lg font-medium font-inter leading-7'>Education</h1>
                    <div className="flex flex-col gap-1">
                    {education.map((item) => (
                        <div key={item.id} className="flex flex-row gap-2">
                            <input type="radio" id={item.id} class="accent-blue" name="type" value={item.value} 
                             onChange={(e) => handleRadioChange(e, 'Education')}
                             checked={localFilters.Education === item.value}/>
                            <label htmlFor={item.id} className="text-[#181f33] text-sm font-normal font-['Inter']">{item.label}</label>
                        </div>
                        ))}
                    </div>
                </div>
        </div>

    </div>
    
  )
}

export default FilterTable