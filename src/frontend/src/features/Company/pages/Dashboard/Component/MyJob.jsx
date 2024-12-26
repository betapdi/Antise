import React from "react";
import { useContext, useMemo } from "react";
import ListJob from "./ListJob";
import { CompanyContext } from "../../../../../context/CompanyContext";

function MyJob() {
  const { companyName, jobList, setJobList} = useContext(CompanyContext);
  const totalApplicants = useMemo(() => {
    return jobList.reduce(
      (sum, job) => sum + (job.applications?.length || 0),
      0
    );
  }, [jobList]);
 
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div className="inline-block text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">
          My Jobs <span className="text-gray ml-2">({jobList.length})</span>
        </div>
        <div className="h-12 justify-center items-center gap-6 inline-flex">
          <div className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
            Job status
          </div>
          <select
            id="type"
            className="bg-white border border-gray/100 text-black rounded-lg p-2"
          >
            <option value="Employee">All Jobs</option>
            <option value="Employer">Active Jobs</option>
            <option value="Employer">Inactive Jobs</option>
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

      <ListJob jobList={jobList} />
    </div>
  );
}

export default MyJob;
