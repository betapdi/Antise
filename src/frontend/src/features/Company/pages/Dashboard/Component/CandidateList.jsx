import React from "react";
import CandidateItem from "./CandidateItem";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jobApi from "../../../../../api/jobApi";
import ViewCandidate from "./ViewCandidate";
import { useContext } from "react";
import { CompanyContext } from "../../../../../context/CompanyContext";

function CandidateList() {
  const params = useParams();
  const [jobID, setJobID] = useState(null);
  const [job, setJob] = useState(null);
  const { savedApplications } = useContext(CompanyContext);
  console.log(savedApplications);

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

  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleCandidateClick = (application) => {
    setSelectedApplication(application);
  };

  const closeViewCandidate = () => {
    setSelectedApplication(null);
  };

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
                <CandidateItem
                  key={item.id}
                  application={item}
                  onClick={() => handleCandidateClick(item)}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col mt-5">
              No applications yet
            </div>
          )}
          {selectedApplication && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div
                className="relative bg-white p-4 rounded-md w-3/5 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Application Details</h2>
                  <button
                    onClick={closeViewCandidate}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <ViewCandidate application={selectedApplication} />
              </div>
            </div>
          )}


        </div>
      )}
    </>
  );
}

export default CandidateList;
