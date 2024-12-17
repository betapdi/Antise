import React from 'react';
import ListJob from './ListJob';
const jobList = [
    {
        title: 'UI/UX Designer',
        jobType: 'Full Time',
        daysRemaining: '27 days remaining',
        status: 'Active',
        applicationsCount: 798
    },
    {
        title: 'Frontend Developer',
        jobType: 'Part Time',
        daysRemaining: '15 days remaining',
        status: 'Inactive',
        applicationsCount: 123
    },
    // You can add more jobs here
];

function MyJob() {
  return (
    <div className='w-full flex flex-col p-4'>
        <div className='flex flex-row justify-between items-center'>
            <div className="inline-block text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">
              My Jobs <span className="text-gray ml-2">(100)</span>
            </div>
            <div className="h-12 justify-center items-center gap-6 inline-flex">
                <div className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">Job status</div>
                <select id="type" className="bg-white border border-gray/100 text-black rounded-lg p-2">
                    <option value="Employee">All Jobs</option>
                    <option value="Employer">Active Jobs</option>
                    <option value="Employer">Inactive Jobs</option>
                </select>
            </div>
        </div>
        <div className="w-full px-5 py-3 mt-4 bg-[#f1f2f4] rounded gap-5 inline-flex">
            <div className="w-5/12 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">JOBS</div>
            <div className="w-2/12 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">STATUS</div>
            <div className="w-3/12 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">APPLICATIONS</div>
            <div className=" text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">ACTION</div>
        </div>
        
        <ListJob jobList={jobList} />
    </div>
  );
};

export default MyJob;
