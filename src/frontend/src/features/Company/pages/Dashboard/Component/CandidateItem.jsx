import React, { useEffect, useState } from "react";
import applicantApi from "../../../../../api/applicantApi";
import { useParams, useNavigate } from "react-router-dom";

function CandidateItem({ application, onClick }) {
    const [applicant, setApplicant] = useState(null);

    useEffect(() => {
        const fetchApplicantById = async (applicantId) => {
            try {
                const response = await applicantApi.getApplicant(applicantId);
                const data = response.data;
                setApplicant(data);
            } catch (error) {
                console.error("Error fetching applicant data:", error);
            }
        };

        if (application.applicantId) {
            fetchApplicantById(application.applicantId);
        }
    }, [application.id]);

    return (
        <>
            {applicant && (
                <div className="bg-white p-7 mx-auto rounded-md shadow border border-[#e4e5e8] w-full"
                    onClick={onClick}
                >
                    <div className="flex flex-row items-center mb-4 gap-4">
                        <img
                            src={"http://172.28.102.169:8080/api/v1" + [applicant.profileImageUrl]}
                            alt="avatar"
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col">
                            <div className="self-stretch text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                {application.fullName}
                            </div>
                            <div className="self-stretch text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">
                                {applicant.major}
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <ul className="flex flex-col gap-2">
                            <li className="self-stretch text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight">
                                Experience: {applicant.experience}
                            </li>
                            <li className="self-stretch text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight">
                                Education: {applicant.education}
                            </li>
                            <li className="self-stretch text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight">
                                Applied: {new Date(application.submittedDate).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}
                            </li>
                        </ul>
                    </div>
                    {/* <button className="bg-blue-500 text-blue py-2 rounded-md w-full flex items-center justify-start space-x-2">
                        <img
                            src="/image/download.png"
                            alt="Download Icon"
                            className="w-5 h-5"
                        />
                        <span>Download CV</span>
                    </button> */}
                </div>)
            }
        </>
    );
}

export default CandidateItem;
