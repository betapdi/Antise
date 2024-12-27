import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import jobApi from "../../../../../api/jobApi";
import { useNavigate } from "react-router-dom";

const ListJob = ({ jobs, numberOfJobs }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col gap-3 items-center justify-center w-full mt-5">
        {jobs.map((job, index) => (
          <div
            key={index}
            onClick={() => navigate(`/job/detailjob/${job.jobId}`, { replace: true })}
            className={`w-full h-[132px] p-6 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-0 transform transition-transform duration-300 hover:border-[#1877f2] ${job.isRead ? "bg-[#f0f0f0]" : "bg-[#e7f0fa]"
              }`}
          >
            <div className="justify-start items-start gap-5 flex">
              <div className="flex-col justify-start items-start gap-3.5 inline-flex">
                <div className="justify-start items-center gap-2 inline-flex">
                  <div className="text-[#181f33] text-sm font-medium font-['Inter'] leading-loose">
                    {`New Job at ${job.companyName}`}
                  </div>
                </div>
                <div className="justify-start items-center gap-4 inline-flex">
                  <div className="text-[#181f33] text-sm font-normal font-['Inter'] leading-loose">
                    {`${job.companyName} posted a ${job.jobName
                      } job on ${new Date(job.createdAt).toLocaleString()}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobAlerts = ({ onJobCountChange }) => {
  const { notifications } = useContext(UserContext);
  const [enrichedNotifications, setEnrichedNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const enrichedData = await Promise.all(
          notifications.map(async (notification) => {
            if (notification.jobId) {
              try {
                // console.log("Fetching job details for jobId:", notification.jobId);
                const response = await jobApi.getJob(notification.jobId);
                return {
                  ...notification,
                  jobId: notification.jobId,
                  jobName: response.data.title,
                  companyName: notification.companyName,
                  createdAt: notification.createdAt,
                  isRead: notification.isRead || false,
                };
              } catch (error) {
                console.error(
                  `Error fetching job for jobId: ${notification.jobId}`,
                  error
                );
                return { ...notification, jobName: "Job Not Found" };
              }
            }
            return notification;
          })
        );
        setEnrichedNotifications(enrichedData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (notifications?.length) {
      fetchNotifications();
    }
  }, [notifications]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = enrichedNotifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );
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

  useEffect(() => {
    if (onJobCountChange) {
      onJobCountChange(enrichedNotifications.length);
    }
  }, [enrichedNotifications, onJobCountChange]);

  return (
    <div>
      <div className="flex flex-row justify-between items-center ml-8">
        <div className="inline-block text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">
          Notification <span className="text-gray ml-2">({enrichedNotifications && enrichedNotifications.length})</span>
        </div>
      </div>

      {enrichedNotifications && enrichedNotifications.length > 0 ? (
        <>
          <div className="w-[90%] overflow-y-auto ml-8 mb-5">
            <ListJob
              jobs={paginatedJobs}
              numberOfJobs={enrichedNotifications.length}
            />
          </div>
          <div className="h-12 justify-center items-center gap-2 inline-flex w-full">
            {/* Previous Button */}
            <button
              className="p-3 bg-[#e7f0fa] rounded-[84px]"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <img
                src="/image/arrow_left.png"
                alt="Previous"
                className="w-6 h-6"
              />
            </button>

            {/* Page Numbers */}
            {totalPages > 0 &&
              Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 px-2 py-3 rounded-[50px] ${currentPage === index + 1
                    ? "bg-[#0a65cc] text-white"
                    : "text-[#5e6670]"
                    }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

            {/* Next Button */}
            <button
              className="p-3 bg-[#e7f0fa] rounded-[84px]"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <img
                src="/image/arrow_right.png"
                alt="Next"
                className="w-6 h-6"
              />
            </button>
          </div>
        </>
      ) : (
        <div className="w-full ml-10 flex flex-col mt-5">No notification yet</div>
      )}

    </div>
  );
};

export default JobAlerts;
