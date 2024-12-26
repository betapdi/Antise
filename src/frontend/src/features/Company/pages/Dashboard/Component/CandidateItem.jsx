import React, { useEffect } from "react";
import applicantApi from "../../../../../api/applicantApi";

function CandidateItem({ candidate }) {
    // const [applicant, setApplicant] = useState(null);
    // useEffect(() => {
    //     const fetchApplicantById = async (id) => {
    //       try {
    //         const response = await applicantApi.getApplicant(id);
    //         const data = response.data;
    //         setApplicant(data);
    //       } catch (error) {
    //         console.error('Error fetching job data:', error);
    //       }
    //     };

    //     if (jobID != null) {
    //       fetchJobById(jobID);
    //     }
    //   }, [candidate]);
    console.log(candidate);

    return (
        <div className="bg-white p-7 mx-auto rounded-md shadow border border-[#e4e5e8] w-full">
            <div className="flex flex-row items-center mb-4 gap-4">
                <img
                    src={candidate.image}
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col">
                    <div className="self-stretch text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                        {candidate.name}
                    </div>
                    <div className="self-stretch text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">
                        {candidate.job}
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <ul className="flex flex-col gap-2">
                    <li className="self-stretch text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight">
                        {candidate.experience} Experience
                    </li>
                    <li className="self-stretch text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight">
                        Education: {candidate.education}
                    </li>
                    <li className="self-stretch text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight">
                        Applied: {candidate.applied}
                    </li>
                </ul>
            </div>
            <button className="bg-blue-500 text-blue py-2 rounded-md w-full flex items-center justify-start space-x-2">
                <img
                    src="/image/download.png"
                    alt="Download Icon"
                    className="w-5 h-5"
                />
                <span>Download CV</span>
            </button>
        </div>
    );
}

export default CandidateItem;
