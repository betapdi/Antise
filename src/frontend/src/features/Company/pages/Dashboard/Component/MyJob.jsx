import React from 'react';

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
        
        <div className="w-full flex flex-col mt-4 gap-4">
            {jobList.map((job, index) => (
                <div key={index} className='flex flex-row bg-white shadow-md p-5 rounded-lg'>
                    {/* Job Title and Info */}
                    <div className='flex flex-col w-5/12 gap-2'>
                        <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">{job.title}</div>
                        <div className="inline-flex items-center gap-4">
                            <span className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">{job.jobType}</span>
                            <span className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">{job.daysRemaining}</span>
                        </div>
                    </div>

                    {/* Job Status */}
                    <div className='inline-flex gap-1 items-center w-2/12'>
                        <img 
                            src={`/image/CheckCircle.svg`} 
                            className='h-6 w-6' 
                            alt="status"
                        />
                        <div className={`text-[#0ba02c] text-sm font-medium font-['Inter'] leading-tight`}>
                            {job.status}
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
                            {job.applicationsCount} Applications
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
        </div>
    </div>
  );
};

export default MyJob;
