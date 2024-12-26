import React from "react";
import CandidateItem from "./CandidateItem";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jobApi from "../../../../../api/jobApi";

function CandidateList() {
  const params = useParams();
  const [jobID, setJobID] = useState(null);
  const [job, setJob] = useState(null);

  useEffect(() => {
    setJobID(params.id);
  }, [params]);

  useEffect(() => {
    const fetchJobById = async (jobID) => {
      try {
        const response = await jobApi.getJob(jobID);
        const data = response.data;
        setJob(data);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    if (jobID != null) {
      fetchJobById(jobID);
    }
  }, [jobID]);

  return (
    <>
      {job && (
        <div className="w-full flex flex-col gap-4">
          <div className="text-[#18191c] text-xl font-medium font-['Inter'] leading-tight">
            {job.title} Applications
          </div>
          {/* Application List */}
          {job.applications && job.applications.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {job.applications.map((item, index) => (
                <CandidateItem key={index} application={item} />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col mt-5">
              No applications yet
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CandidateList;
