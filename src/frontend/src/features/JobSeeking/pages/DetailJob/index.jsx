import React from 'react'
import { useState } from 'react';
import ApplyForm from '../../../../components/Form/applyform';


const jobs = [
    {
        title: "Senior UX Designer",
        companyName: "Instagram",
        companyLogo: require("../../../../image/logoCompany/company_1.png"),
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
        jobType: "Full Time",
    },
    {
        title: "Software Engineer",
        companyName: "Facebook",
        companyLogo: require("../../../../image/logoCompany/company_2.png"),
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
        jobType: "Part Time",
    },
    {
        title: "Product Manager",
        companyName: "Facebook",
        companyLogo: require("../../../../image/logoCompany/company_3.png"),
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
        jobType: "Full Time",
    },

    {
        title: "Senior UX Designer",
        companyName: "Instagram",
        companyLogo: require("../../../../image/logoCompany/company_1.png"),
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
        jobType: "Full Time",
    },
    {
        title: "Software Engineer",
        companyName: "Facebook",
        companyLogo: require("../../../../image/logoCompany/company_2.png"),
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
        jobType: "Part Time",
    },
    {
        title: "Product Manager",
        companyName: "Facebook",
        companyLogo: require("../../../../image/logoCompany/company_4.png"),
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
        jobType: "Full Time",
    },

    {
        title: "Senior UX Designer",
        companyName: "Instagram",
        companyLogo: require("../../../../image/logoCompany/company_2.png"),
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
        jobType: "Full Time",
    },
    {
        title: "Software Engineer",
        companyName: "Facebook",
        companyLogo: require("../../../../image/logoCompany/company_2.png"),
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
        jobType: "Part Time",
    },
    {
        title: "Product Manager",
        companyName: "Facebook",
        companyLogo: require("../../../../image/logoCompany/company_4.png"),
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
        jobType: "Full Time",
    },
];

function DetailJob() {
    const [isClicked, setIsClicked] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFormOpen, setIsFormOpen] = useState(false);


    const handleClose = () => {
        setIsFormOpen(false);
    };
    const itemsPerPage = 6;
    // Calculate the index range for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the jobs array based on current page
    const currentJobs = jobs.slice(startIndex, endIndex);

    // Handle page change (next and previous page)
    const handlePageChange = (newPage) => {
        // Ensure the new page is within valid bounds
        if (newPage >= 0 && newPage < Math.ceil(jobs.length / itemsPerPage)) {
            setCurrentPage(newPage);
        }
    };
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="w-3/4 mx-auto flex flex-col justify-center items-center mt-20 mb-20">
                {/* Job Title */}
                <div className='flex flex-row justify-between items-start w-full max-w-7xl gap-10'>
                    <div className="flex-row justify-start items-center gap-10 flex">
                        <img className="w-24 h-24 rounded-[100px]" src="https://via.placeholder.com/96x96" />
                        <div className="flex-col justify-start items-start gap-[13px] inline-flex">
                            <div className="justify-start items-center gap-2 inline-flex">
                                <div className="text-[#18191c] text-2xl font-medium font-['Inter'] leading-loose">Senior UX Designer</div>
                                <div className="px-3 py-[3px] bg-[#ffeded] rounded-[52px] justify-start items-start gap-2.5 flex">
                                    <div className="text-[#ff4e4e] text-sm font-normal font-['Inter'] leading-tight">Featured</div>
                                </div>
                                <div className="px-3 py-[3px] bg-[#e8f1ff] rounded-[52px] justify-start items-start gap-2.5 flex">
                                    <div className="text-[#0065ff] text-sm font-normal font-['Inter'] leading-tight">Full Time</div>
                                </div>
                            </div>
                            <div className="justify-start items-center gap-5 inline-flex">
                                <div className="justify-start items-center gap-2 flex">
                                    <div className="w-5 h-5 relative">
                                        <img
                                            src={require(`../../../../image/icon_link.svg`).default}
                                            alt="icon"
                                            className="transition-opacity duration-300 group-hover:opacity-0">
                                        </img>
                                    </div>
                                    <div className="text-[#474c54] text-base font-normal font-['Inter'] leading-normal">https://instagram.com</div>
                                </div>
                                <div className="justify-start items-center gap-1.5 flex">
                                    <div className="w-6 h-6 relative">
                                        <img
                                            src={require(`../../../../image/icon_phone.svg`).default}
                                            alt="icon"
                                            className="transition-opacity duration-300 group-hover:opacity-0">
                                        </img>
                                    </div>
                                    <div className="text-[#474c54] text-base font-normal font-['Inter'] leading-normal">(406) 555-0120</div>
                                </div>
                                <div className="justify-start items-center gap-1.5 flex">
                                    <div className="w-6 h-6 justify-center items-center flex">
                                        <div className="w-6 h-6 relative">
                                            <img
                                                src={require(`../../../../image/icon_envelop.svg`).default}
                                                alt="icon"
                                                className="transition-opacity duration-300 group-hover:opacity-0">
                                            </img>
                                        </div>
                                    </div>
                                    <div className="text-[#474c54] text-base font-normal font-['Inter'] leading-normal">career@instagram.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-center items-end gap-3 inline-flex">
                        <div className="justify-center items-center gap-3 inline-flex">
                            {/* <div className="p-4 bg-[#e7f0fa] rounded justify-start items-start gap-2.5 flex">
                                <div className="w-6 h-6 justify-center items-center flex">
                                    <div className="w-6 h-6 relative">
                                        <img
                                            src={require(`../../../../image/bookmark.png`)}
                                            alt="icon"
                                        />
                                    </div>
                                </div>
                            </div> */}

                            <div
                                className="p-4 bg-[#e7f0fa] rounded justify-start items-start gap-2.5 flex"
                                onClick={() => setIsClicked(!isClicked)}
                            >
                                <div className="w-6 h-6 justify-center items-center flex">
                                    <div className="w-6 h-6 relative">
                                        <img
                                            src={require(`../../../../image/${isClicked ? 'bookmark_click.png' : 'bookmark.png'}`)}
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
                                    src={require(`../../../../image/arrow_right_hover.png`)}
                                    alt="icon"
                                />
                            </button>
                        </div>
                        <div className="justify-start items-start inline-flex">
                            <div className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">Job expire in:</div>
                            <div className="text-[#e05050] text-sm font-medium font-['Inter'] leading-tight"> June 30, 2021</div>
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className='flex flex-row mt-20 w-full max-w-7xl gap-10'>
                    {/* Job Description */}
                    <div className="w-3/5 flex-col justify-start items-start gap-8 inline-flex">
                        <div className="flex-col justify-start items-start gap-4 flex">
                            <div className="text-black text-lg font-medium font-['Inter'] leading-7">Job Description</div>
                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet.</div>
                            <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Nam dapibus consectetur erat in euismod. Cras urna augue, mollis venenatis augue sed, porttitor aliquet nibh. Sed tristique dictum elementum. Nulla imperdiet sit amet quam eget lobortis. Etiam in neque sit amet orci interdum tincidunt.</div>
                        </div>
                        <div className="flex-col justify-start items-start gap-4 flex">
                            <div className="text-black text-lg font-medium font-['Inter'] leading-7">Responsibilities</div>
                            <div className="flex-col justify-start items-start gap-3 flex">
                                <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Quisque semper gravida est et consectetur.</div>
                                <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Curabitur blandit lorem velit, vitae pretium leo placerat eget.</div>
                                <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Morbi mattis in ipsum ac tempus.</div>
                                <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Curabitur eu vehicula libero. Vestibulum sed purus ullamcorper, lobortis lectus nec.</div>
                                <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.</div>
                                <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">lobortis vel lectus. Nulla at risus ut diam.</div>
                                <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">commodo feugiat. Nullam laoreet, diam placerat dapibus tincidunt.</div>
                                <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">odio metus posuere lorem, id condimentum erat velit nec neque.</div>
                                <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">dui sodales ut. Curabitur tempus augue.</div>
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
                                        <img src={require(`../../../../image/icon_calendar.png`)} alt="icon" />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                            Job Posted:
                                        </div>
                                        <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                            14 June, 2021
                                        </div>
                                    </div>
                                </div>

                                {/* Job Expire */}
                                <div className="flex flex-col items-start gap-4">
                                    <div className="w-8 h-8 flex justify-center items-center">
                                        <img src={require(`../../../../image/icon_timer.png`)} alt="icon" />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                            Job Expire In:
                                        </div>
                                        <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                            14 July, 2021
                                        </div>
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="flex flex-col items-start gap-4">
                                    <div className="w-8 h-8">
                                        <img src={require(`../../../../image/icon_briefcase.png`)} alt="icon" />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                            Education:
                                        </div>
                                        <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                            Graduation
                                        </div>
                                    </div>
                                </div>

                                {/* Salary */}
                                <div className="flex flex-col items-start gap-4">
                                    <div className="w-8 h-8">
                                        <img src={require(`../../../../image/icon_wallet.png`)} alt="icon" />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                            Salary:
                                        </div>
                                        <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                            $50k-80k/month
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex flex-col items-start gap-4">
                                    <div className="w-8 h-8">
                                        <img src={require(`../../../../image/icon_location.png`)} alt="icon" />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                            Location:
                                        </div>
                                        <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                            New York, USA
                                        </div>
                                    </div>
                                </div>

                                {/* Job Type */}
                                <div className="flex flex-col items-start gap-4">
                                    <div className="w-8 h-8">
                                        <img src={require(`../../../../image/icon_briefcase.png`)} alt="icon" />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                            Job Type:
                                        </div>
                                        <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                            Full Time
                                        </div>
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="flex flex-col items-start gap-4">
                                    <div className="w-8 h-8">
                                        <img src={require(`../../../../image/icon_briefcase.png`)} alt="icon" />
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                        <div className="w-36 text-[#767f8c] text-xs font-normal font-['Inter'] uppercase leading-[18px]">
                                            Experience:
                                        </div>
                                        <div className="w-36 text-[#18191c] text-sm font-medium font-['Inter'] leading-tight">
                                            10-15 Years
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full p-8 rounded-xl border-2 border-[#e7f0fa] flex-col justify-start items-start gap-8 flex">
                            <div className="justify-start items-center gap-4 inline-flex">
                                <img className="rounded-md" src="https://via.placeholder.com/64x64" />
                                <div className="flex-col justify-start items-start gap-2 inline-flex">
                                    <div className="text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">Instagram</div>
                                    <div className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">Social networking service</div>
                                </div>
                            </div>
                            <div className="w-full flex-col justify-start items-start gap-y-5 flex">
                                <div className="w-full justify-between items-center inline-flex">
                                    <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Founded in:</div>
                                    <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">March 21, 2006</div>
                                </div>
                                <div className="w-full justify-between items-center inline-flex">
                                    <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Organization type:</div>
                                    <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">Private Company</div>
                                </div>
                                <div className="w-full justify-between items-center inline-flex">
                                    <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Company size:</div>
                                    <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">120-300 Employers</div>
                                </div>
                                <div className="w-full justify-between items-center inline-flex">
                                    <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Phone:</div>
                                    <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">(406) 555-0120</div>
                                </div>
                                <div className="w-full justify-between items-center inline-flex">
                                    <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Email:</div>
                                    <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">twitter@gmail.com</div>
                                </div>
                                <div className="w-full justify-between items-center inline-flex">
                                    <div className="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Website:</div>
                                    <div className="text-[#18191c] text-base font-normal font-['Inter'] leading-normal">https://twitter.com</div>
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
                                src={require("../../../../image/arrow_left.png")}
                                alt="arrow_right"
                                className="w-6 h-6 group-hover:hidden"

                            />
                            <img
                                src={require("../../../../image/arrow_left_hover.png")}
                                alt="arrow_right_hover"
                                className="w-6 h-6 hidden group-hover:block"
                            />
                        </div>
                        <div className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start gap-2.5 flex hover:bg-[#0a65cc] group"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage * itemsPerPage + itemsPerPage >= jobs.length}
                        >
                            <img
                                src={require("../../../../image/arrow_right.png")}
                                alt="arrow_right"
                                className="w-6 h-6 group-hover:hidden"
                            />
                            <img
                                src={require("../../../../image/arrow_right_hover.png")}
                                alt="arrow_right_hover"
                                className="w-6 h-6 hidden group-hover:block"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-20">
                    <div className="grid grid-cols-3 grid-rows-2 gap-10">
                        {jobs.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage).map((job, index) => (
                            <div
                                key={index}
                                className="p-4 bg-[#FBFBFF] rounded-lg border border-[#e4e5e8] flex-col justify-start items-start gap-6 flex"
                            >
                                <div className="justify-center items-center gap-4 inline-flex">
                                    <img src={job.companyLogo} alt={`${job.companyName} logo`} className="w-16 h-16" />
                                    <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                                        <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">
                                            {job.companyName}
                                        </div>
                                        <div className="justify-start items-center gap-1.5 inline-flex">
                                            <div className="w-[18px] h-[18px] relative">
                                                <img src={require(`../../../../image/icon_map.png`)} alt="icon" />
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
    )
}

export default DetailJob