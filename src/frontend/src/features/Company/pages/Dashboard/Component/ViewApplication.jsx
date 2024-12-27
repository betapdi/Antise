import React from 'react';
import { useState, useEffect } from 'react';
import applicantApi from '../../../../../api/applicantApi';
import companyApi from '../../../../../api/companyApi';
import { useContext } from 'react';
import { CompanyContext } from '../../../../../context/CompanyContext';
import { use } from 'react';

function ViewApplication({ application }) {
    const [applicant, setApplicant] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const { addSavedApplications, removeSavedApplications, savedApplications } = useContext(CompanyContext);


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

        if (savedApplications.some((applications) => applications.id === application.id)) {
            setIsClicked(true);
        } else {
            setIsClicked(false);
        }

    }, []);

    if (!application) return null;

    const handleAddSavedApplication = async (app) => {
        try {
            const response = await companyApi.addSavedApplication(app.id);
            const data = response.data;
            addSavedApplications(app);
            setIsClicked(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveSavedApplication = async (app) => {
        try {
            const response = await companyApi.removeSavedApplication(application.id);
            const data = response.data;
            removeSavedApplications(app.id);
            setIsClicked(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {applicant && (
                <div className="w-full max-h-[85vh] relative bg-white pt-5 px-5 rounded-xl overflow-y-auto overflow-x-hidden m-2 -scroll-ml-1.5">
                    <div className="w-full justify-between items-center inline-flex mb-8">
                        <div className="justify-center items-center gap-6 flex">
                            <img
                                src={"http://172.28.102.169:8080/api/v1" + [applicant.profileImageUrl]}
                                alt="avatar"
                                className="w-20 h-20 rounded-full border"
                            />
                            <div className="flex-col justify-start items-start gap-2 inline-flex">
                                <div className="text-[#18191c] text-2xl font-medium font-['Inter'] leading-loose">{application.fullName}</div>
                                <div className="text-[#767f8c] text-base font-normal font-['Inter'] leading-normal">{applicant.major}</div>
                            </div>
                        </div>
                        <div className="h-12 justify-start items-start gap-6 inline-flex mr-4">
                            <button className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start flex"
                                onClick={() => {
                                    // setIsClicked(!isClicked);
                                    if (isClicked) {
                                        handleRemoveSavedApplication(application); // Call remove when it's already bookmarked
                                    } else {
                                        handleAddSavedApplication(application); // Call add when it's not bookmarked
                                    }
                                }}
                            >
                                <div className="w-6 h-6 justify-center items-center flex">
                                    <img
                                        src={`/image/${isClicked ? 'Star_click.png' : 'Star.png'}`}
                                        alt="star"
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="w-full flex gap-9">
                        <div className="flex-col justify-start items-start gap-8 inline-flex w-2/3">
                            <div className="flex-col justify-start items-start gap-6 flex">
                                <div className="text-[#18191c] text-lg font-medium font-['Inter'] leading-[18px]">BIOGRAPHY</div>
                                <div className="flex-col justify-start items-start gap-3 flex">
                                    <div className=" text-[#5e6670] text-base font-normal font-['Inter'] leading-normal text-justify">{applicant.biography}</div>
                                </div>
                            </div>
                            <div className="w-full h-0 border border-[#e4e5e8]"></div>
                            <div className="flex-col justify-start items-start gap-6 flex">
                                <div className=" text-[#18191c] text-lg font-medium font-['Inter'] leading-4">COVER LETTER</div>
                                <div className="flex-col justify-start items-start gap-3 flex">
                                    <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">
                                        {application.coverLetter.split('\n').map((line, index) => (
                                            <div key={index} className="flex items-start">
                                                <span className="mr-2 text-black"></span>
                                                <span>{line}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mr-4 flex-col justify-start items-end gap-6 inline-flex">
                            <div className="w-full p-6 bg-white rounded-lg border border-[#e7f0fa] flex-col justify-end items-start gap-6 inline-flex">
                                <div className="w-full justify-start gap-20 items-start inline-flex">
                                    <div className="justify-start items-start gap-4 flex">
                                        <div className="flex-col justify-start items-start gap-3 inline-flex">
                                            <div className="w-6 h-6 justify-center items-center inline-flex">
                                                <img
                                                    src={`/image/UserCircle.png`}
                                                    alt="star"
                                                />
                                            </div>
                                            <div className="rem flex-col justify-start items-start gap-1 flex">
                                                <div className="self-stretch text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-4">Gender</div>
                                                <div className="self-stretch text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">{applicant.gender === 1 ? 'Male' : 'Female'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-3 inline-flex">
                                        <div className="w-6 h-6 justify-center items-center inline-flex">
                                            <img
                                                src={`/image/MapTrifold.png`}
                                                alt="star"
                                            />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-1 flex">
                                            <div className="self-stretch text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Nationality</div>
                                            <div className="self-stretch text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">{applicant.nationality}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full justify-start items-start gap-14 inline-flex">
                                    <div className="flex-col justify-start items-start gap-3 inline-flex">
                                        <div className="w-6 h-6 justify-center items-center inline-flex">
                                            <img
                                                src={`/image/BlueStack.png`}
                                                alt="star"
                                            />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-1 flex">
                                            <div className="self-stretch text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-4">Experience</div>
                                            <div className="self-stretch text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">{applicant.experience}</div>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-3 inline-flex">
                                        <div className="w-6 h-6 justify-center items-center inline-flex">
                                            <img
                                                src={`/image/GraduationCap.png`}
                                                alt="star"
                                            />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-1 flex">
                                            <div className="self-stretch text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Educations</div>
                                            <div className="self-stretch text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">{applicant.education}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full p-6 bg-white rounded-lg border border-[#cee0f5]/70 flex-col justify-start items-start gap-4 flex">
                                <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">Download My Resume</div>
                                <div className="w-full rounded-lg flex items-center justify-between">
                                    <div className="flex-row justify-start items-center gap-3 flex">
                                        <img
                                            src={`/image/fi_file-text.png`}
                                            alt="file icon"
                                        />
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="w-2/3 text-[#767f8c] text-xs font-normal font-['Inter'] leading-[18px]">
                                                {application.fullName}.pdf
                                            </div>
                                            <div className="text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">PDF</div>
                                        </div>
                                    </div>
                                    <div className=" rounded-sm flex justify-center items-center">
                                        <div className="w-6 h-6 flex justify-center items-center">
                                            <img
                                                src={`/image/DownloadSimple.png`}
                                                alt="download icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full p-6 bg-white rounded-lg border border-[#cee0f5]/70 flex-col justify-start items-start gap-6 flex">
                                <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">Contact Information</div>
                                <div className="flex-col justify-start items-start gap-5 flex">
                                    <div className="flex-col justify-start items-start gap-3 flex">
                                        <div className="justify-start items-start gap-4 inline-flex">
                                            <img
                                                src={`/image/map-pin-line-duotone (1) 1.png`}
                                                alt="star"
                                            />
                                            <div className="flex-col justify-start items-start gap-1 inline-flex">
                                                <div className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Location</div>
                                                <div className="text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">{applicant.address}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-0 border border-[#e4e5e8]"></div>
                                    <div className="justify-start items-start gap-4 inline-flex">
                                        <img
                                            src={`/image/phone-call-duotone 1.png`}
                                            alt="star"
                                        />
                                        <div className="flex-col justify-start items-start gap-3 inline-flex">
                                            <div className="flex-col justify-start items-start gap-1 flex">
                                                <div className="w-[216px] text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Phone</div>
                                                <div className="w-[216px] text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">{applicant.phoneNumber}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-[0px] border border-[#e4e5e8]"></div>
                                    <div className="justify-start items-start gap-4 inline-flex">
                                        <img
                                            src={`/image/Envelope.png`}
                                            alt="star"
                                        />
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="w-[216px] text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Email address</div>
                                            <div className="w-[216px] text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">{applicant.workEmail}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>)
            }
        </>
    );
};

export default ViewApplication;
