import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";

// lúc nào test fetch noti thì comment nguyên cái khúc notifications này (5-102) và bỏ dấu comment ở dòng 173
const notifications = [
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
    },
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
    },
];

const ListJob = ({ jobs, numberOfJobs }) => (
  <div>
    <span className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">Job Alerts </span>
    <span className="text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">({numberOfJobs} new jobs)</span>
    <div className="flex flex-col gap-3 items-center justify-center w-full mt-5">
      {jobs.map((job, index) => (
        <div
          key={index}
          className="w-full h-[132px] p-6 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-0 transform transition-transform duration-300 hover:border-[#1877f2]"
        >
          <div className="justify-start items-start gap-5 flex">
            <img
              src={`/image/logoCompany/${job.companyLogo || "default.png"}`}
              alt="job_icon"
              className="w-16 h-16"
            />
            <div className="flex-col justify-start items-start gap-3.5 inline-flex">
              <div className="justify-start items-center gap-2 inline-flex">
                <div className="text-[#181f33] text-xl font-medium font-['Inter'] leading-loose">{job.title}</div>
                <div className="px-3 py-[3px] bg-[#e8f1ff] rounded-[52px] justify-start items-start gap-2.5 flex">
                  <div className="text-[#0a65cc] text-sm font-normal font-['Inter'] leading-tight">{job.contractType}</div>
                </div>
              </div>
              <div className="justify-start items-center gap-4 inline-flex">
                <div className="justify-start items-center gap-1.5 flex">
                  <img src={`/image/icon_map.png`} alt="location_icon" className="h-4" />
                  <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.location}</div>
                </div>
                <div className="justify-start items-center gap-1 flex">
                  <img src={`/image/icon_salary.png`} alt="salary_icon" className="h-4" />
                  <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.salary}</div>
                </div>
                <div className="justify-start items-center gap-1.5 flex">
                  <img src={`/image/icon_calander.png`} alt="calendar_icon" className="h-4" />
                  <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.daysRemaining} Days Remaining</div>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-start items-start gap-3 flex">
            <div className="p-3 rounded-[5px] justify-start items-start gap-2.5 flex">
              <img src={`/image/bookmark.png`} alt="icon_star" className="w-4 h-4" />
            </div>
            <div className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex hover:bg-[#0a65cc] hover:text-white group">
              <div className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                Apply Now
              </div>
              <img
                src={`/image/arrow_right.png`}
                alt="arrow_right"
                className="h-4 group-hover:hidden"
              />
              <img
                src={`/image/arrow_right_hover.png`}
                alt="arrow_right_hover"
                className="h-4 hidden group-hover:block"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const JobAlerts = ({ onJobCountChange }) => {
  // lúc nào test ui page này mà khong fetch noti thì comment dòng 173 và bỏ dấu comment ở 5-102
  // const { notifications } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = (notifications || []).slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil((notifications || []).length / itemsPerPage);

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

  useEffect(() => {
    if (onJobCountChange) {
      onJobCountChange(notifications?.length || 0);
    }
  }, [notifications, onJobCountChange]);

  return (
    <div>
      <div className="w-100 overflow-y-auto ml-8 mb-5">
        <ListJob jobs={paginatedJobs} numberOfJobs={notifications?.length || 0} />
      </div>
      <div className="h-12 justify-center items-center gap-2 inline-flex w-full">
        <button
          className="p-3 bg-[#e7f0fa] rounded-[84px]"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <img src={`/image/arrow_left.png`} alt="icon_arrow" className="w-6 h-6" />
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`w-12 h-12 px-2 py-3 rounded-[50px] ${currentPage === index + 1 ? "bg-[#0a65cc] text-white" : "text-[#5e6670]"}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

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

export default JobAlerts;
