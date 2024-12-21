import React from 'react'
import { useState, useEffect, useContext } from 'react';
import ApplyForm from '../../../../components/Form/applyform';
import companyApi from '../../../../api/companyApi';
import { useParams } from 'react-router-dom';
import jobApi from '../../../../api/jobApi';
import { UserContext } from '../../../../context/UserContext';
import RegisterDialog from '../../../Authentication/components/RegisterDialog.js';

function DetailJob() {
    const [isClicked, setIsClicked] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [company, setCompany] = useState(null);
    const [job, setJob] = useState(null);
    const [jobID, setJobID] = useState(null);
    const params = useParams();
    const { role } = useContext(UserContext);
    const itemsPerPage = 6;


    useEffect(() => {
        setJobID(params.id);
    }, []);

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

        if (jobID != null) fetchJobById(jobID);
    }, [jobID]);

    const handleClose = () => {
        setIsFormOpen(false);
    };

    const handlePageChange = (newPage) => {
        if (
            company &&
            newPage >= 0 &&
            newPage < Math.ceil(company.jobList.length / itemsPerPage)
        ) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        const fetchCompany = async (companyID) => {
            try {
                const response = await companyApi.getCompany(companyID);
                const company = response.data;
                setCompany(company);
            } catch (error) {
                console.log(error);
            }
        }
        if (job != null) {
            fetchCompany(job.companyId);
            console.log('companyID', job.companyId);
        }
    }, [job])

    return (
        <>
            {job != null && company != null &&
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-3/4 mx-auto flex flex-col justify-center items-center mt-20 mb-20">
                        {/* Job Title */}
                        <div className='flex flex-row justify-between items-start w-full max-w-7xl gap-10'>
                            <div className="flex-row justify-start items-center gap-10 flex">
                                <img className="w-24 h-24 rounded-[100px]" src={"http://172.28.102.169:8080/api/v1" + [company.logoUrl]} alt={company.name} />
                                <div className="flex-col justify-start items-start gap-[13px] inline-flex">
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className="text-[#18191c] text-2xl font-medium font-['Inter'] leading-loose">{job.title}</div>
                                        <div className="px-3 py-[3px] bg-[#e8f1ff] rounded-[52px] justify-start items-start gap-2.5 flex">
                                            <div className="text-[#0065ff] text-sm font-normal font-['Inter'] leading-tight">{job.jobType}</div>
                                        </div>
                                    </div>
                                    <div className="justify-start items-center gap-5 inline-flex">
                                        <div className="justify-start items-center gap-2 flex">
                                            <div className="w-5 h-5 relative">
                                                <img
                                                    src={`/image/icon_link.svg`}
                                                    alt="icon"
                                                    className="transition-opacity duration-300 group-hover:opacity-0">
                                                </img>
                                            </div>
                                            <div className="text-[#474c54] text-base font-normal font-['Inter'] leading-normal">{company.companyUrl}</div>
                                        </div>
                                        <div className="justify-start items-center gap-1.5 flex">
                                            <div className="w-6 h-6 relative">
                                                <img
                                                    src={`/image/icon_phone.svg`}
                                                    alt="icon"
                                                    className="transition-opacity duration-300 group-hover:opacity-0">
                                                </img>
                                            </div>
                                            <div className="text-[#474c54] text-base font-normal font-['Inter'] leading-normal">{company.companyPhoneNumber}</div>
                                        </div>
                                        <div className="justify-start items-center gap-1.5 flex">
                                            <div className="w-6 h-6 justify-center items-center flex">
                                                <div className="w-6 h-6 relative">
                                                    <img
                                                        src={`/image/icon_envelop.svg`}
                                                        alt="icon"
                                                        className="transition-opacity duration-300 group-hover:opacity-0">
                                                    </img>
                                                </div>
                                            </div>
                                            <div className="text-[#474c54] text-base font-normal font-['Inter'] leading-normal">{company.companyEmail}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {role === "APPLICANT" &&
                                <div className="flex-col justify-center items-end gap-3 inline-flex">
                                    <div className="justify-center items-center gap-3 inline-flex">
                                        <div
                                            className="p-4 bg-[#e7f0fa] rounded justify-start items-start gap-2.5 flex"
                                            onClick={() => setIsClicked(!isClicked)}
                                        >
                                            <div className="w-6 h-6 justify-center items-center flex">
                                                <div className="w-6 h-6 relative">
                                                    <img
                                                        src={`/image/${isClicked ? 'bookmark_click.png' : 'bookmark.png'}`}
                                                        alt="icon"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button className="h-14 px-8 py-4 bg-[#0a65cc] rounded justify-center items-center gap-3 flex"
                                            onClick={() => setIsFormOpen(true)}
                                        >
                                            <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">Apply now</div>
                                            <img
                                                src={`/image/arrow_right_hover.png`}
                                                alt="icon"
                                            />
                                        </button>
                                    </div>

                                    <div className="justify-start items-start inline-flex">
                                        <div className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">Job expire in: </div>
                                        <div className="text-[#e05050] text-sm font-medium font-['Inter'] leading-tight px-1">
                                            {new Date(job.expirationDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                </div>
                            }
                            {role != "APPLICANT" && role != "COMPANY" &&
                                <div className="flex-col justify-center items-end gap-3 inline-flex">
                                    <div className="justify-center items-center gap-3 inline-flex">
                                        <button className="h-14 px-8 py-4 bg-[#0a65cc] rounded justify-center items-center gap-3 flex"
                                            onClick={() => setIsFormOpen(false)}
                                        >
                                            <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">Apply now</div>
                                            <img
                                                src={`/image/arrow_right_hover.png`}
                                                alt="icon"
                                            />
                                        </button>
                                    </div>

                                    <div className="justify-start items-start inline-flex">
                                        <div className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">Job expire in: </div>
                                        <div className="text-[#e05050] text-sm font-medium font-['Inter'] leading-tight px-1">
                                            {new Date(job.expirationDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </div>
                                    </div>
                                </div>

                            }
                        </div>

                        {/* Job Details */}
                        <div className='flex flex-row mt-20 w-full max-w-7xl gap-10'>
                            {/* Job Description */}
                            <div className="w-3/5 flex-col justify-start items-start gap-8 inline-flex">
                                <div className="flex-col justify-start items-start gap-4 flex">
                                    <div className="text-black text-lg font-medium font-['Inter'] leading-7">Job Description</div>
                                    <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal text-justify">{job.description}</div>
                                </div>
                                <div className="flex-col justify-start items-start gap-4 flex">
                                    <div className="text-black text-lg font-medium font-['Inter'] leading-7">Responsibilities</div>
                                    <div className="flex-col justify-start items-start gap-3 flex">
                                        <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal space-y-2">
                                            {job.responsibility.split('\n').map((line, index) => (
                                                <div key={index} className="flex items-start">
                                                    <span className="mr-2 text-black">•</span>
                                                    <span>{line}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Job Overview */}
                            <div className="w-2/5 flex-col justify-start items-start gap-6 inline-flex">
                                <div className="w-full p-8 bg-white rounded-lg border-2 border-[#e7f0fa]">
                                    <div className="text-[#181f33] text-xl font-medium font-['Inter'] leading-loose mb-6">
                                        Job Overview
                                    </div>
                                    <div className="grid grid-cols-3 gap-x-16 gap-y-10">
                                        {/* Job Posted */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8 flex justify-center items-center">
                                                <img src={`/image/icon_calendar.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    Job Posted:
                                                </div>
                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    {new Date(job.postedDate).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Job Expire */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8 flex justify-center items-center">
                                                <img src={`/image/icon_timer.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    Job Expire In:
                                                </div>

                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    {new Date(job.expirationDate).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Education */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8">
                                                <img src={`/image/icon_briefcase.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    Education:
                                                </div>
                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    {job.education}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Salary */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8">
                                                <img src={`/image/icon_wallet.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    Salary (month):
                                                </div>
                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    {job.minSalary}$ - {job.maxSalary}$
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8">
                                                <img src={`/image/icon_location.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    Location:
                                                </div>
                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    {job.location}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Job Type */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8">
                                                <img src={`/image/icon_briefcase.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    Job Type:
                                                </div>
                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    {job.jobType}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Experience */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8">
                                                <img src={`/image/icon_briefcase.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    Experience:
                                                </div>
                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    {job.experience}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full p-8 rounded-xl border-2 border-[#e7f0fa] flex-col justify-start items-start gap-8 flex">
                                    <div className="justify-start items-center gap-4 inline-flex">
                                        <img className="rounded-md w-16 h-16" src={"http://172.28.102.169:8080/api/v1" + [company.logoUrl]} alt="job_icon" />
                                        <div className="flex-col justify-start items-start gap-2 inline-flex">
                                            <div className="text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">{company.name}</div>
                                        </div>
                                    </div>
                                    <div className="w-full flex-col justify-start items-start gap-y-5 flex">
                                        <div className="w-full justify-between items-center inline-flex">
                                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Founded in:</div>
                                            <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">
                                                {new Date(company.yearOfEstablishment).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })}
                                            </div>
                                        </div>
                                        <div className="w-full justify-between items-center inline-flex">
                                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Organization type:</div>
                                            <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">{company.organizationType}</div>
                                        </div>
                                        <div className="w-full justify-between items-center inline-flex">
                                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Phone:</div>
                                            <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">{company.companyPhoneNumber}</div>
                                        </div>
                                        <div className="w-full justify-between items-center inline-flex">
                                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Email:</div>
                                            <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">{company.companyEmail}</div>
                                        </div>
                                        <div className="w-full justify-between items-center inline-flex">
                                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Website:</div>
                                            <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">{company.companyUrl}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Jobs */}
                    <div className="w-full flex flex-col justify-center items-center bg-white shadow-inner gap-[10px]">
                        <div className="flex items-center mb-10 gap-[50rem]">
                            {/* Related Jobs Heading */}
                            <div className="text-[#181f33] text-[40px] font-medium font-['Inter'] leading-[48px] mt-10">
                                Related Jobs
                            </div>
                            {/* Navigation Arrows */}
                            <div className="justify-start items-start gap-4 flex mt-10">
                                <div className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start gap-2.5 flex hover:bg-[#0a65cc] group"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 0}
                                >
                                    <img
                                        src={"/image/arrow_left.png"}
                                        alt="arrow_right"
                                        className="w-6 h-6 group-hover:hidden"

                                    />
                                    <img
                                        src={"/image/arrow_left_hover.png"}
                                        alt="arrow_right_hover"
                                        className="w-6 h-6 hidden group-hover:block"
                                    />
                                </div>
                                <div className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start gap-2.5 flex hover:bg-[#0a65cc] group"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage * itemsPerPage + itemsPerPage >= company.jobList.length}
                                >
                                    <img
                                        src={"/image/arrow_right.png"}
                                        alt="arrow_right"
                                        className="w-6 h-6 group-hover:hidden"
                                    />
                                    <img
                                        src={"/image/arrow_right_hover.png"}
                                        alt="arrow_right_hover"
                                        className="w-6 h-6 hidden group-hover:block"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-20">
                            <div className="grid grid-cols-3 grid-rows-2 gap-10">
                                {company.jobList.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage).map((job, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-[#FBFBFF] rounded-lg border border-[#e4e5e8] flex-col justify-start items-start gap-6 flex"
                                    >
                                        <div className="justify-center items-center gap-4 inline-flex">
                                            <img className="rounded-md w-16 h-16" src={"http://172.28.102.169:8080/api/v1" + [company.logoUrl]} alt={`${company.name} logo`} />
                                            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                                                <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">
                                                    {job.companyName}
                                                </div>
                                                <div className="justify-start items-center gap-1.5 inline-flex">
                                                    <div className="w-[18px] h-[18px] relative">
                                                        <img src={`/image/icon_map.png`} alt="icon" />
                                                    </div>
                                                    <div className="text-[#9199a3] text-sm font-normal font-['Inter'] leading-tight">
                                                        {job.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-col justify-start items-start gap-2 flex">
                                            <div className="w-[360px] text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">
                                                {job.title}
                                            </div>
                                            <div className="justify-start items-center gap-2 inline-flex">
                                                <div className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">
                                                    {job.jobType}
                                                </div>
                                                <div className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">
                                                    {job.salary}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {isFormOpen && (
                        <div className="w-screen fixed inset-0 z-30 flex justify-center items-center bg-black bg-opacity-50">
                            <div className="max-h-screen w-full max-w-lg overflow-y-auto bg-white rounded-lg shadow-lg">
                                <ApplyForm isCloseChange={handleClose} />
                            </div>
                        </div>

                    )}

                </div>

            }
        </>
    )
}

export default DetailJob