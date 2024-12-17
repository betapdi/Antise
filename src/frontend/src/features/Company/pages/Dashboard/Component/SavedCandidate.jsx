import React from 'react';
import ListSavedCandidate from './ListSavedCandidate';
const savedCandidateList = [
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

function SavedCandidate() {
    return (
        <div className='w-full flex flex-col p-4'>
            <div className='flex flex-row justify-between items-center'>
                <div className="inline-block text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">
                    My Applicants <span className="text-gray ml-2">({savedCandidateList.length})</span>
                </div>
            </div>

            <ListSavedCandidate savedCandidateList={savedCandidateList} />
        </div>
    );
};

export default SavedCandidate;
