import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import companyApi from '../../../../api/companyApi';


function DetailCompany() {
    // const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [company, setCompany] = useState(null);
    const [companyID, setCompanyID] = useState(null);
    const params = useParams();
    const itemsPerPage = 6;

    console.log('params', params);

    const handleViewDetailJob = (job) => {
        navigate(`/job/detailjob/${job.id}`);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < Math.ceil(company.jobList.length / itemsPerPage)) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        setCompanyID(params.id);
    }, []);

    useEffect(() => {
        const fetchCompany = async (companyID) => {
            try {
                const response = await companyApi.getCompany(companyID);
                const company = response.data;
                setCompany(company);
                console.log('hh', company);
            } catch (error) {
                console.log(error);
            }
        }
        if (companyID != null) {
            fetchCompany(companyID);
        }
    }, [companyID])

    return (
        <>
            {company &&
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-3/4 flex flex-col justify-center items-center mt-10 mb-20">
                        {/*  Company Title */}
                        <div className='flex flex-row justify-between items-start w-full max-w-7xl gap-10'>
                            <div className="w-full h-40 p-10 bg-white rounded-xl border border-[#e4e5e8] justify-between items-center inline-flex">
                                <div className="justify-start items-center gap-6 flex">
                                    <img className="w-20 h-20 rounded-md" src="https://via.placeholder.com/80x80" />
                                    <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                                        <div className="text-[#18191c] text-2xl font-medium font-['Inter'] leading-loose">{company.name}</div>
                                        <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Information Technology (IT)</div>
                                    </div>
                                </div>
                                <div className="px-8 py-4 bg-[#0a65cc] rounded justify-center items-center gap-3 flex">
                                    <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">View Open Position</div>
                                    <div className="w-6 h-6 relative">
                                        <img src={`/image/arrow_right_hover.png`} alt="icon" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Job Details */}
                        <div className='flex flex-row mt-20 w-full max-w-7xl gap-10'>
                            {/* Job Description */}
                            <div className="w-3/5 flex-col justify-start items-start gap-8 inline-flex">
                                <div className="flex-col justify-start items-start gap-4 flex">
                                    <div className="text-black text-lg font-medium font-['Inter'] leading-7">Description</div>
                                    <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.</div>

                                </div>
                                <div className="flex-col justify-start items-start gap-4 flex">
                                    <div className="text-black text-lg font-medium font-['Inter'] leading-7">Company Benefits</div>
                                    <div className="flex-col justify-start items-start gap-3 flex">
                                        <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Quisque semper gravida est et consectetur.</div>

                                    </div>
                                </div>
                            </div>

                            {/* Company Overview */}
                            <div className="w-2/5 flex-col justify-start items-start gap-6 inline-flex">
                                <div className="w-full p-8 bg-white rounded-lg border-2 border-[#e7f0fa]">
                                    {/* Company Overview */}
                                    <div className="grid grid-cols-2 gap-x-16 gap-y-10">
                                        {/* Founded in */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8 flex justify-center items-center">
                                                <img src={`/image/icon_calendar.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    FOUNDED IN:
                                                </div>
                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    {new Date(company.yearOfEstablishment).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Organization type */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8 flex justify-center items-center">
                                                <img src={`/image/icon_timer.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    ORGANIZATION TYPE:
                                                </div>
                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    {company.organizationType}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Team size */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8">
                                                <img src={`/image/icon_wallet.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    TEAM SIZE:
                                                </div>
                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    120-300 Candidates
                                                </div>
                                            </div>
                                        </div>

                                        {/* Industry types */}
                                        <div className="flex flex-col items-start gap-4">
                                            <div className="w-8 h-8">
                                                <img src={`/image/icon_briefcase.png`} alt="icon" />
                                            </div>
                                            <div className="flex flex-col items-start gap-1">
                                                <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                                    INDUSTRY TYPES:
                                                </div>
                                                <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                                    Technology
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="w-full flex flex-col p-5 rounded-xl border-2 border-[#e7f0fa] justify-start items-start gap-4">
                                    <div className="text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">Contact Information</div>
                                    <div className="justify-start items-start gap-4 inline-flex">
                                        <div className="w-8 h-8 justify-center items-center flex">
                                            <div className="w-8 h-8 relative">
                                                <img src={`/image/icon_globe.svg`} alt="icon" />
                                            </div>
                                        </div>
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Website</div>
                                            <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">{company.companyUrl}</div>
                                        </div>
                                    </div>
                                    <div className="w-full h-[0px] border border-[#e4e5e8]"></div>
                                    <div className="justify-start items-start gap-4 inline-flex">
                                        <div className="w-8 h-8 relative">
                                            <img src={`/image/icon_phone_blue.svg`} alt="icon" />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Phone</div>
                                            <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">{company.companyPhoneNumber}</div>
                                        </div>
                                    </div>
                                    <div className="w-full h-[0px] border border-[#e4e5e8]"></div>
                                    <div className="justify-start items-start gap-4 inline-flex">
                                        <div className="w-8 h-8 relative">
                                            <img src={`/image/icon_envelope_blue.svg`} alt="icon" />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">Email address</div>
                                            <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">{company.companyEmail}</div>
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
                                Open Positions
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
                                        onClick={() => handleViewDetailJob(job)}
                                    >
                                        <div className="justify-center items-center gap-4 inline-flex">
                                            <img src={"http://172.28.102.169:8080/api/v1" + [company.logoUrl]} alt={`${job.companyName} logo`} className="w-16 h-16" />
                                            <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                                                <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">
                                                    {company.name}
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
                                                    {job.minSalary}$ - {job.maxSalary}$
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DetailCompany