import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import jobApi from "../../../../../api/jobApi";

// lúc nào test fetch noti thì comment nguyên cái khúc notifications này (5-102) và bỏ dấu comment ở dòng 173
const notificationsList = [
  { companyName: "Company A", jobName: "Software Engineer", createdAt: "2024-12-01T08:00:00Z", isRead: false },
  { companyName: "Company B", jobName: "Data Scientist", createdAt: "2024-12-02T09:30:00Z", isRead: true },
  { companyName: "Company C", jobName: "UX Designer", createdAt: "2024-12-03T10:15:00Z", isRead: false },
  { companyName: "Company D", jobName: "Product Manager", createdAt: "2024-12-04T11:45:00Z", isRead: true },
  { companyName: "Company E", jobName: "Full Stack Developer", createdAt: "2024-12-05T12:00:00Z", isRead: false },
  { companyName: "Company F", jobName: "Backend Developer", createdAt: "2024-12-06T13:20:00Z", isRead: true },
  { companyName: "Company G", jobName: "Frontend Developer", createdAt: "2024-12-07T14:30:00Z", isRead: false },
  { companyName: "Company H", jobName: "Marketing Specialist", createdAt: "2024-12-08T15:40:00Z", isRead: true },
  { companyName: "Company I", jobName: "Quality Analyst", createdAt: "2024-12-09T16:50:00Z", isRead: false },
  { companyName: "Company J", jobName: "Sales Executive", createdAt: "2024-12-10T17:10:00Z", isRead: true },
];

const ListJob = ({ jobs, numberOfJobs }) => (
  <div>
    <span className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">
      Job Alerts
    </span>
    <span className="text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">
      ({numberOfJobs} new jobs)
    </span>
    <div className="flex flex-col gap-3 items-center justify-center w-full mt-5">
      {jobs.map((job, index) => (
        <div
          key={index}
          className={`w-full h-[132px] p-6 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-0 transform transition-transform duration-300 hover:border-[#1877f2] ${job.isRead ? 'bg-[#f0f0f0]' : 'bg-[#e7f0fa]'
            }`}
        >
          <div className="justify-start items-start gap-5 flex">
            <img
              src={`/image/logoCompany/${job.companyLogo || "default.png"}`}
              alt="job_icon"
              className="w-16 h-16 mt-4"
            />
            <div className="flex-col justify-start items-start gap-3.5 inline-flex">
              <div className="justify-start items-center gap-2 inline-flex">
                <div className="text-[#181f33] text-sm font-medium font-['Inter'] leading-loose">
                  {`New Job at ${job.companyName}`}
                </div>
              </div>
              <div className="justify-start items-center gap-4 inline-flex">
                <div className="text-[#181f33] text-sm font-normal font-['Inter'] leading-loose">
                  {`${job.companyName} posted a ${job.jobName} job at ${new Date(job.createdAt).toLocaleString()}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Notifications = ({ onJobCountChange }) => {
  const { notifications } = useContext(UserContext);
  const [enrichedNotifications, setEnrichedNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const calculateDaysRemaining = (expirationDate, postedDate) => {
    const expiryDate = new Date(expirationDate);
    const postDate = new Date(postedDate);

    const timeDiff = expiryDate - postDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysRemaining > 0 ? daysRemaining : 0;
  };


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const promises = notifications.map(async (notification) => {
          if (notification.jobId) {
            const response = await jobApi.getJob(notification.jobId);
            return { ...notification, ...response.data, daysRemaining: calculateDaysRemaining(response.data.expirationDate, response.data.postedDate), };
          }
          return notification;
        });
        const enrichedData = await Promise.all(promises);
        setEnrichedNotifications(enrichedData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (notifications?.length) {
      fetchNotifications();
    }
  }, [notifications]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedJobs = notificationsList.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(notificationsList.length / itemsPerPage);

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
      <div className="w-[90%] overflow-y-auto  ml-8 mb-5">
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
            className={`w-12 h-12 px-2 py-3 rounded-[50px] ${currentPage === index + 1 ? 'bg-[#0a65cc] text-white' : 'text-[#5e6670]'
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
    </div>
  );
};

export default Notifications;
