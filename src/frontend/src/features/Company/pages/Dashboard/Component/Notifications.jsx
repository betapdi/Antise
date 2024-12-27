import React, { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../../../../../context/CompanyContext";
import { UserContext } from "../../../../../context/UserContext";
import jobApi from "../../../../../api/jobApi";
import applicationApi from "../../../../../api/applicationApi";
import { useNavigate } from "react-router-dom";

const ListJob = ({ jobs, numberOfJobs }) => {
  const navigate = useNavigate();
  return (<div>
    <div className="flex flex-col gap-3 items-center justify-center w-full mt-5">
      {jobs.map((job, index) => (
        <div
          key={index}
          onClick={() => navigate(`/company/dashboard/my-job/list-candidate/${job.jobId}`, { replace: true })}
          className={`w-full h-[132px] p-6 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-0 transform transition-transform duration-300 hover:border-[#1877f2] ${job.isRead ? "bg-[#f0f0f0]" : "bg-[#e7f0fa]"
            }`}
        >
          <div className="justify-start items-start gap-5 flex">
            <img
              src={job.companyLogo || "/image/logoCompany/default.png"}
              alt="job_icon"
              className="w-16 h-16 mt-4"
            />
            <div className="flex-col justify-start items-start gap-3.5 inline-flex">
              <div className="justify-start items-center gap-2 inline-flex">
                <div className="text-[#181f33] text-sm font-medium font-['Inter'] leading-loose">
                  {`${job.applicantName || "An applicant"} has applied for job ${job.jobName || "Unknown Job"
                    }`}
                </div>
              </div>
              <div className="justify-start items-center gap-4 inline-flex">
                <div className="text-[#181f33] text-sm font-normal font-['Inter'] leading-loose">
                  {`At ${new Date(job.createdAt).toLocaleString()}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

const Notifications = ({ onJobCountChange }) => {
  const { notifications } = useContext(UserContext);
  const { logoUrl } = useContext(CompanyContext);
  const [enrichedNotifications, setEnrichedNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const enrichNotifications = async () => {
    try {
      const enrichedData = await Promise.all(
        notifications.map(async (notification) => {
          let jobName = "Unknown Job";
          let applicantName = notification.applicantName || "An applicant";
          let companyLogo = logoUrl
            ? `http://172.28.102.169:8080/api/v1${logoUrl}`
            : "/image/logoCompany/default.png";

          try {
            if (notification.applicationId) {
              const applicationResponse = await applicationApi.getApplication(notification.applicationId);
              const jobId = applicationResponse.data.jobId;
              const jobResponse = await jobApi.getJob(jobId);
              jobName = jobResponse.data.title || "Unknown Job";
              applicantName = applicationResponse.data.applicantName || "An applicant";
              return {
                ...notification,
                jobId,
                jobName,
                applicantName,
                companyLogo,
              }
            } else if (notification.jobId) {
              const jobResponse = await jobApi.getJob(notification.jobId);
              jobName = jobResponse.data.title || "Unknown Job";
            }
          } catch (error) {
            console.error(`Error fetching job details for notification:`, error);
          }
        })
      );

      setEnrichedNotifications(enrichedData);

      if (onJobCountChange) {
        onJobCountChange(enrichedData.length);
      }
    } catch (error) {
      console.error("Error enriching notifications:", error);
    }
  };

  useEffect(() => {
    if (notifications?.length) {
      enrichNotifications();
    }
  }, [notifications]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = enrichedNotifications.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(enrichedNotifications.length / itemsPerPage);

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

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="inline-block text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">
          Notification <span className="text-gray ml-2">({enrichedNotifications && enrichedNotifications.length})</span>
        </div>
      </div>

      {enrichedNotifications && enrichedNotifications.length > 0 ? (
        <>
          <div className="w-[90%] overflow-y-auto ml-8 mb-5">
            <ListJob jobs={paginatedJobs} numberOfJobs={enrichedNotifications.length} />
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
                className={`w-12 h-12 px-2 py-3 rounded-[50px] ${currentPage === index + 1 ? "bg-[#0a65cc] text-white" : "text-[#5e6670]"
                  }`}
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
        </>) : (
        <div className="w-full flex flex-col mt-5">
          No notification yet
        </div>
      )}
    </div>
  );
};

export default Notifications;
