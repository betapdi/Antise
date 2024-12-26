import React from 'react';
import { useState, useEffect } from 'react';
import applicantApi from '../../../../../api/applicantApi';

function ViewCandidate({ application }) {
    const [applicant, setApplicant] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const fetchApplicantById = async (applicantId) => {
            try {
                const response = await applicantApi.getApplicant(applicantId);
                const data = response.data;
                setApplicant(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching applicant data:", error);
            }
        };

        if (application.applicantId) {
            fetchApplicantById(application.applicantId);
        }
    }, [application.id]);
    if (!application) return null;
    const getFileNameFromUrl = (url, removeExtension = true) => {
        if (!url) return "";
        const fileName = url.split("/").pop();
        if (removeExtension) {
            return fileName.split('.').slice(0, -1).join('.');
        }
        return fileName;
    };

    // const handleAddFavoriteApplicant = async (id) => {
    //     console.log(id);
    //     try {
    //         const response = await companyApi.addFavoriteApplicant(id);
    //         const applicant = response.data;
    //         console.log(applicant);
    //         addFavoriteApplicant(applicant);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const handleRemoveFavoriteApplicant = async (id) => {
    //     try {
    //         const response = await companyApi.removeFavoriteApplicant(id);
    //         const applicant = response.data;
    //         console.log('REMOVE', applicant);
    //         removeFavoriteApplicant(id);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };



    return (
        <>
            {applicant && (
                <div className="w-full relative bg-white rounded-xl">
                    <div className="w-full justify-between items-center inline-flex mb-8">
                        <div className="justify-center items-center gap-6 flex">
                            <img
                                src={"http://172.28.102.169:8080/api/v1" + [applicant.profileImageUrl]}
                                alt="avatar"
                                className="w-20 h-20 rounded-full border"
                            />
                            <div className="flex-col justify-start items-start gap-2 inline-flex">
                                <div className="text-[#18191c] text-2xl font-medium font-['Inter'] leading-loose">{applicant.fullName}</div>
                                <div className="text-[#767f8c] text-base font-normal font-['Inter'] leading-normal">{applicant.major}</div>
                            </div>
                        </div>
                        <div className="h-12 justify-start items-start gap-6 inline-flex mr-4">
                            <button className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start flex"
                                onClick={() => {
                                    setIsClicked(!isClicked);
                                    // if (isClicked) {
                                    //     handleRemoveFavoriteApplication(application.id); // Call remove when it's already bookmarked
                                    // } else {
                                    //     handleAddFavoriteApplication(application.id); // Call add when it's not bookmarked
                                    // }
                                }}
                            >
                                <div className="w-6 h-6 justify-center items-center flex">
                                    <img
                                        src={`/image/${isClicked ? 'Star_click.png' : 'Star.png'}`}
                                        alt="star"
                                    />
                                </div>
                            </button>
                            {/* <div className="px-6 py-3 rounded-[3px] border-2 border-[#0a65cc] justify-center items-center gap-3 flex">
                                <div className="w-6 h-6 justify-center items-center flex">
                                    <img
                                        src={`/image/Envelope.png`}
                                        alt="Envelope"
                                    />
                                </div>
                                <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">Send Mail</div>
                            </div>
                            <div className="px-6 py-3 rounded-[3px]  bg-[#0a65cc] border-2 border-[#0a65cc] justify-center items-center gap-3 flex">
                                <img
                                    src={`/image/fi_arrow-right-circle.png`}
                                    alt="Envelope"
                                />
                                <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">Hire Candidates</div>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-full flex gap-[72px]">
                        <div className="flex-col justify-start items-start gap-8 inline-flex w-2/3">
                            <div className="flex-col justify-start items-start gap-6 flex">
                                <div className="text-[#18191c] text-lg font-medium font-['Inter'] leading-[18px]">BIOGRAPHY</div>
                                <div className="flex-col justify-start items-start gap-3 flex">
                                    <div className=" text-[#5e6670] text-base font-normal font-['Inter'] leading-normal text-justify">{applicant.biography}</div>
                                </div>
                            </div>
                            <div className="w-full h-[0px] border border-[#e4e5e8]"></div>
                            <div className="flex-col justify-start items-start gap-6 flex">
                                <div className=" text-[#18191c] text-lg font-medium font-['Inter'] leading-[18px]">COVER LETTER</div>
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

                        <div className="mr-4 flex-col justify-start items-end gap-6 inline-flex w-1/3">
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
                                                <div className="self-stretch text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Gender</div>
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
                                            <div className="self-stretch text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Experience</div>
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
                                <div className="rounded-lg justify-between items-center inline-flex gap-10">
                                    <div className="justify-start items-center gap-3 flex">
                                        <img
                                            src={`/image/fi_file-text.png`}
                                            alt="star"
                                        />
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="text-[#767f8c] text-xs font-normal font-['Inter'] leading-[18px]">{getFileNameFromUrl(applicant.resumeUrl)}</div>
                                            <div className="text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">PDF</div>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-[5px] justify-start items-start gap-2.5 flex">
                                        <div className="w-6 h-6 justify-center items-center flex">
                                            <img
                                                src={`/image/DownloadSimple.png`}
                                                alt="star"
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
                                    <div className="h-[0px] border border-[#e4e5e8]"></div>
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

export default ViewCandidate;
