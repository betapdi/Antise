import React, {useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";

const NotificationDropdown = () => {
  const { notifications, setNotifications } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // console.log("Noti", notifications);

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

  const toggleNotificationReadStatus = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, unread: false } : notification
    );
    setNotifications(updatedNotifications);
  };

  if (!notifications || notifications.length === 0) {
    return (
      <div className="w-96 bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h2>
        <p className="text-sm text-gray-600">No notifications available.</p>
      </div>
    );
  }


  // const notifications = [
  //   {
  //     id: 1,
  //     title: "John Doe has applied for the Software Engineer position.",
  //     time: "Last Wednesday at 9:42 AM",
  //     unread: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Your job posting for Marketing Specialist has received 5 new applications.",
  //     time: "Last Wednesday at 9:42 AM",
  //     unread: false,
  //   },
  //   {
  //     id: 3,
  //     title: "The application period for your UI/UX Designer job posting has ended.",
  //     time: "Last Wednesday at 9:42 AM",
  //     unread: false,
  //   },
  // ];

  return (
    <div className="w-96 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Notification</h2>
        <button onClick={markAllAsRead} className="text-sm text-blue-600 hover:underline">
          Mark all as read
        </button>
      </div>
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            onClick={() => toggleNotificationReadStatus(notification.id)}
            className={`flex flex-col ${
              notification.unread ? "bg-blue-50" : "bg-white"
            } p-4 rounded-lg shadow-sm hover:bg-gray hover:bg-opacity-50 cursor-pointer transition`}
          >
            <p
              className={`text-sm font-medium ${
                notification.unread ? "text-gray-900" : "text-gray-700"
              }`}
            >
              {notification.title}
            </p>
            <span className="text-xs text-gray-500 mt-1">
              {notification.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
