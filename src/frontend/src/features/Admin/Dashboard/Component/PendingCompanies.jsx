import React, { useState, useEffect } from "react";

const companies = [
    {
        name: "Tech Innovators",
        logo: "company_1.png",
        location: "Australia",
        industry: "Technology",
        daysPending: 4,
    },
    {
        name: "Apple Inc.",
        logo: "company_2.png",
        location: "USA",
        industry: "Technology",
        daysPending: 7,
    },
    {
        name: "Green Solutions",
        logo: "company_3.png",
        location: "UK",
        industry: "Environment",
        daysPending: 10,
    },
    // Add more companies as needed
];

function ListCompany({ companies, totalCompanies }) {
    const handleApprove = (companyName) => {
        console.log(`Approved: ${companyName}`);
        // Add your approval logic here
    };

    const handleDeny = (companyName) => {
        console.log(`Denied: ${companyName}`);
        // Add your denial logic here
    };

    return (
        <div>
            <span className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">Pending Companies </span>
            <span className="text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">({totalCompanies} pending)</span>
            <div className="flex flex-col gap-3 items-center justify-center w-full mt-5">
                {companies.map((company, index) => (
                    <div
                        key={index}
                        className="w-full h-[132px] p-6 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-0 transform transition-transform duration-300 hover:border-[#1877f2]"
                    >
                        <div className="w-1/3 justify-start items-start gap-5 flex">
                            <img src={`/image/logoCompany/${company.logo}`} alt="company_logo" className="w-16 h-16 mt-4" />
                            <div className="flex-col justify-start items-start gap-2 inline-flex">
                                <div className="text-[#181f33] text-xl font-medium font-['Inter'] leading-loose">{company.name}</div>
                                <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{company.industry}</div>
                                <div className="justify-start items-center gap-1.5 flex">
                                    <img src={`/image/icon_map.png`} alt="location_icon" className="h-4" />
                                    <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{company.location}</div>
                                </div>
                            </div>
                        </div>
                        <div className="justify-start items-start gap-1.5 flex">
                            <img src={`/image/icon_calander.png`} alt="calendar_icon" className="h-4" />
                            <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">
                                {company.daysPending} Days Pending
                            </div>
                        </div>
                        <div className="flex">
                            <button className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex
                                hover:bg-[#0a65cc] hover:text-white group mr-3"
                            >
                                <div className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                                    Approve
                                </div>
                            </button>
                            <button className="px-6 py-3 bg-[#fae7e7] rounded-[3px] justify-center items-center gap-3 flex
                                hover:bg-[#0a65cc] hover:text-white group mr-0"
                            >
                                <div className="text-[#cc0a0a] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                                    Reject
                                </div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


const PendingCompanies = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(companies.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCompanies = companies.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <div className={`w-100 overflow-y-auto ml-8 mb-5`}>
                <ListCompany companies={paginatedCompanies} totalCompanies={companies.length} />
            </div>
            <div className="h-12 justify-center items-center gap-2 inline-flex w-full">
                <button
                    className="p-3 bg-[#e7f0fa] rounded-[84px]"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <img src={`/image/arrow_left.png`} alt="icon_arrow" className="w-6 h-6" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                    const displayPage = index + 1;
                    return (
                        <button
                            key={displayPage}
                            className={`w-12 h-12 px-2 py-3 rounded-[50px] ${currentPage === displayPage ? "bg-[#0a65cc] text-white" : "text-[#5e6670]"
                                }`}
                            onClick={() => setCurrentPage(displayPage)}
                        >
                            {displayPage}
                        </button>
                    );
                })}
                <button
                    className="p-3 bg-[#e7f0fa] rounded-[84px]"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <img src={`/image/arrow_right.png`} alt="icon_arrow" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default PendingCompanies;
