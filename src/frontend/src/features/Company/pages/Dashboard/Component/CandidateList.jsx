import React from "react";
import CandidateItem from "./CandidateItem";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import jobApi from "../../../../../api/jobApi";

const candidates = [
  {
    image: "/image/Avatar.png",
    name: "Ronald Richards",
    job: "UI/UX Designer",
    experience: "7 Years",
    education: "Master Degree",
    applied: "Jan 23, 2022",
  },
  {
    image: "/image/Avatar.png",
    name: "Jessica Bell",
    job: "Front-End Developer",
    experience: "5 Years",
    education: "Bachelor's Degree",
    applied: "Feb 10, 2023",
  },
  {
    image: "/image/Avatar.png",
    name: "Jessica Bell",
    job: "Front-End Developer",
    experience: "5 Years",
    education: "Bachelor's Degree",
    applied: "Feb 10, 2023",
  },
  {
    image: "/image/Avatar.png",
    name: "Jessica Bell",
    job: "Front-End Developer",
    experience: "5 Years",
    education: "Bachelor's Degree",
    applied: "Feb 10, 2023",
  },
  {
    image: "/image/Avatar.png",
    name: "Jessica Bell",
    job: "Front-End Developer",
    experience: "5 Years",
    education: "Bachelor's Degree",
    applied: "Feb 10, 2023",
  }

];

function CandidateList() {
  const params = useParams();
  const [jobID, setJobID] = useState(null);
  const [job, setJob] = useState(null);

  useEffect(() => {
    setJobID(params.id);
  }, [params]);

  useEffect(() => {
    const fetchJobById = async (jobID) => {
      // console.log('haa', jobID);
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
      console.log(job.applications);
    }
  }, [jobID]);

  return (
    <> {job && (
      <div className="w-full flex flex-col gap-4">
        <div className="text-[#18191c] text-xl font-medium font-['Inter'] leading-tight">
          {job.title} Applications
        </div>
        {/* Candidate List */}

        <>
          {job.applications == [] && (
            <div className="grid grid-cols-2 gap-5">
              {job.applications.map((item, index) => (
                <CandidateItem key={index} candidate={item} />
              ))}
            </div>)
          }
        </>
      </div >)
    }
    </>
  );
}

export default CandidateList;
