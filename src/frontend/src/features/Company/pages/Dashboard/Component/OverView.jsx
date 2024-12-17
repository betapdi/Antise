import React from "react";

import ListJob from "./ListJob";
const jobs = [
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        dateApplied: "Feb 2, 2019 19:28",
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        dateApplied: "Feb 2, 2019 19:28",
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        dateApplied: "Feb 2, 2019 19:28",
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        dateApplied: "Feb 2, 2019 19:28",
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        dateApplied: "Feb 3, 2019 19:28",
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        dateApplied: "Feb 4, 2019 19:28",
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        dateApplied: "Feb 5, 2019 19:28",
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        dateApplied: "Feb 6, 2019 19:28",
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        dateApplied: "Feb 7, 2019 19:28",
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        dateApplied: "Feb 8, 2019 19:28",
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        dateApplied: "Feb 9, 2019 19:28",
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        dateApplied: "Feb 10, 2019 19:28",
    },
];

function OverView() {
    return (
        <div classname="space-y-5 flex-col justify-start items-start gap-5 inline-flex border ">
            {/*Display how many job are there, for example, display Favorite Job (13) */}
            <div className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7 mb-2">Hello, Esther Howard</div>
            <div className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight mb-5">Here is your daily activities and applications</div>
            <div className="flex w-full gap-5 mb-5">
                <div className="w-1/3 pl-6 pr-5 bg-[#e7f0fa] rounded-lg justify-center items-center gap-20 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex mb-2">
                        <div className=" text-[#18191c] text-2xl font-semibold font-['Inter'] leading-loose">589</div>
                        <div className=" opacity-80 text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">Open Jobs</div>
                    </div>
                    <div className="p-4 bg-white rounded-[5px] justify-start items-start gap-2.5 flex">
                        <img src={`/image/briefcase-duotone (1) 1.png`} alt="icon_star" className="w-8 h-8" />
                    </div>
                </div>
                <div className="w-1/3 pl-6 pr-5 py-5 bg-[#fff6e6] rounded-lg justify-center items-center gap-20 inline-flex">
                    <div className="flex-col justify-start items-start inline-flex mb-2">
                        <div className="text-[#18191c] text-2xl font-semibold font-['Inter'] leading-loose">238</div>
                        <div className="opacity-80 text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">Candidates</div>
                    </div>
                    <div className="p-4 bg-white rounded-[5px] justify-start items-start gap-2.5 flex">
                        <div className="justify-center items-center flex">
                            <img src={`/image/BookmarkSimpleColored.png`} alt="icon_star" className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-6 justify-between items-center inline-flex">
                <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">Recently Posted Jobs</div>
                <div className="justify-center items-center gap-2 flex">
                    <div className="text-[#767f8c] text-base font-medium font-['Inter'] leading-normal">View all</div>
                    <img src={`/image/fi_arrow-right-grey.png`} alt="icon_star" className="w-6 h-6" />
                </div>
            </div>
            {/* Job List */}
            <div className='flex flex-col gap-3 items-center justify-center w-full mt-5'>
                <div className="w-full px-5 py-2.5 bg-[#f1f2f4] rounded gap-5 inline-flex">
                    <div className="w-1/2 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">JOBS</div>
                    <div className="w-1/6 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">DATE APPLIED</div>
                    <div className="w-1/12 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">STATUS</div>
                    <div className="w-1/6 text-[#474c54] text-xs font-normal font-['Inter'] leading-[18px]">ACTION</div>
                </div>
                <ListJob jobList={jobs} />
            </div>
        </div>
    )
}

export default OverView;