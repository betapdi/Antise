import React, { useContext, useMemo, useState } from "react";
import ListJob from "./ListJob";
import { CompanyContext } from "../../../../../context/CompanyContext";

function MyJob() {
  const { companyName, jobList, setJobList } = useContext(CompanyContext);
  const [filter, setFilter] = useState("All");

  const totalApplicants = useMemo(() => {
    return jobList.reduce(
      (sum, job) => sum + (job.applications?.length || 0),
      0
    );
  }, [jobList]);
  

  const filteredJobs = useMemo(() => {
    // If filter is "Latest", sort jobs by posted date (descending order)
    if (filter === "Latest") {
      return [...jobList].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }
    return jobList; // If no filter or "All", return all jobs
  }, [filter, jobList]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value); // Update the filter state based on the dropdown selection
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div className="inline-block text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">
          My Jobs <span className="text-gray ml-2">({filteredJobs.length})</span>
        </div>
        <div className="h-12 justify-center items-center gap-6 inline-flex">
          <div className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
            Job status
          </div>
          <select
            id="type"
            className="bg-white border border-gray/100 text-black rounded-lg p-2"
            onChange={handleFilterChange} // Attach the change handler
            value={filter} // Bind the filter state to the dropdown
          >
            <option value="All">All Jobs</option>
            <option value="Latest">Latest Jobs</option>
          </select>
        </div>
      </div>
      <div className="w-full px-5 py-3 mt-4 bg-[#f1f2f4] rounded gap-5 inline-flex">
        <div className="w-5/12 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">
          JOBS
        </div>
        <div className="w-2/12 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">
          STATUS
        </div>
        <div className="w-3/12 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">
          APPLICATIONS
        </div>
        <div className=" text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">
          ACTION
        </div>
      </div>

      <ListJob jobList={filteredJobs} />
    </div>
  );
}

export default MyJob;
