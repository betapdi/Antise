import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import applicationApi from "../../api/applicationApi";
import jobApi from "../../api/jobApi";

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  } catch (error) {
    return dateString;
  }
};

const NotificationDropdown = () => {
  const { notifications, setNotifications } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [jobInfos, setJobInfos] = useState({});

  const getJob = async (jobId) => {
    try {
      const response = await jobApi.getJob(jobId);
      // console.log("Fetched job:", response.data);
      return response.data.title || null;
    } catch (error) {
      console.error("Error fetching job title for jobId:", jobId, error);
      return null;
    }
  };

  const fetchJobInfos = async () => {
    const updatedJobInfos = {};

    for (const notification of notifications) {
      if (notification.jobId) {
        updatedJobInfos[notification.applicationId] = {
          jobId: notification.jobId,
          title: null,
        };
      } else if (notification.applicationId) {
        try {
          const applicationResponse = await applicationApi.getApplication(
            notification.applicationId
          );
          const jobId = applicationResponse.data.jobId;
          const title = await getJob(jobId);

          updatedJobInfos[notification.applicationId] = {
            jobId,
            title,
          };
        } catch (error) {
          console.error(
            "Error fetching job info for applicationId:",
            notification.applicationId,
            error
          );
        }
      }
    }

    setJobInfos(updatedJobInfos);
  };

  useEffect(() => {
    if (notifications?.length) {
      fetchJobInfos();
    }
  }, [notifications]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      unread: false,
    }));
    setNotifications(updatedNotifications);
  };

  const handleNotificationClick = (notification) => {
    toggleNotificationReadStatus(notification.id);
    setIsDropdownOpen(false);

    if (notification.jobId) {
      window.location.href = `/job/detailjob/${notification.jobId}`;
    } else if (notification.applicationId && jobInfos[notification.applicationId]) {
      window.location.href = `/job/detailjob/${jobInfos[notification.applicationId].jobId}`;
    }
  };

  const toggleNotificationReadStatus = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, unread: false } : notification
    );
    setNotifications(updatedNotifications);
  };

  if (!notifications || notifications.length === 0) {
    return (
      <div className="w-96 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Notifications
        </h2>
        <p className="text-sm text-gray">No notifications available.</p>
      </div>
    );
  }

  const latestNotifications = notifications
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="w-96 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Notification</h2>
      </div>
      <ul className="space-y-4">
        {latestNotifications.map((notification) => {
          {/* console.log("Notification details:", notification);  */}
          return (
            <li
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`flex flex-col ${notification.unread ? "bg-blue-50" : "bg-white"} p-4 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer transition`}
            >
              <p
                className={`text-sm font-medium ${notification.unread ? "text-black" : "text-gray-700"}`}
              >
                {notification.jobId ? (
                  `New Job from ${notification.companyName || "No name"}`
                ) : (
                  `${notification.applicantName} has applied for ${
                    jobInfos[notification.applicationId]?.title || "loading..."
                  }`
                )}
              </p>
              <span className="text-xs text-gray-500 mt-1">
                {formatDate(notification.createdAt)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
