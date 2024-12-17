import React from "react";
import CandidateItem from "./CandidateItem";
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
  // Add more candidate objects as needed
];

function CandidateList() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-[#18191c] text-xl font-medium font-['Inter'] leading-tight">
        Job Applications
      </div>
      {/* Candidate List */}

      <div className="grid grid-cols-2 gap-5">
        {candidates.map((item, index) => (
          <CandidateItem key={index} candidate={item} />
        ))}
      </div>
    </div>
  );
}

export default CandidateList;
