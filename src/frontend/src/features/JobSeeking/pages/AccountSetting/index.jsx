import React, { useState } from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountSetting = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    location: "",
  });

  const [notifications, setNotifications] = useState({
    shortlisted: true,
    savedProfile: false,
    expiredJobs: true,
    rejected: true,
    jobAlerts: true,
  });

  const [jobAlerts, setJobAlerts] = useState({
    role: "",
    location: "",
  });

  const [profilePrivacy, setProfilePrivacy] = useState(true); // true = Public, false = Private
  const [resumePrivacy, setResumePrivacy] = useState(false); // true = Public, false = Private

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (name) => {
    setNotifications((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handlePrivacyChange = (type, value) => {
    if (type === "profile") setProfilePrivacy(value);
    if (type === "resume") setResumePrivacy(value);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log("Changes saved", {
      contactInfo,
      notifications,
      jobAlerts,
      profilePrivacy,
      resumePrivacy,
      passwords,
    });
    // Add save logic here
  };

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Account deleted");
    setIsModalOpen(false);
    // Add account deletion logic here
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Account Setting</h1>
        <form onSubmit={handleSaveChanges}>
          {/* Contact Info */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Contact Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="location"
                placeholder="Map Location"
                className="border rounded-lg p-2"
                value={contactInfo.location}
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="border rounded-lg p-2"
                value={contactInfo.phone}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="border rounded-lg p-2"
                value={contactInfo.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Notification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(notifications).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleNotificationChange(key)}
                  />
                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Alerts */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Job Alerts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="role"
                placeholder="Job Role"
                className="border rounded-lg p-2"
                value={jobAlerts.role}
                onChange={(e) =>
                  setJobAlerts((prev) => ({ ...prev, role: e.target.value }))
                }
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="border rounded-lg p-2"
                value={jobAlerts.location}
                onChange={(e) =>
                  setJobAlerts((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Privacy Settings</h2>
            <div className="flex items-center space-x-8">
              <label>
                <span>Profile Privacy:</span>
                <input
                  type="radio"
                  name="profilePrivacy"
                  value={true}
                  checked={profilePrivacy}
                  onChange={() => handlePrivacyChange("profile", true)}
                />
                Public
              </label>
              <label>
                <input
                  type="radio"
                  name="profilePrivacy"
                  value={false}
                  checked={!profilePrivacy}
                  onChange={() => handlePrivacyChange("profile", false)}
                />
                Private
              </label>
            </div>
            <div className="flex items-center space-x-8">
              <label>
                <span>Resume Privacy:</span>
                <input
                  type="radio"
                  name="resumePrivacy"
                  value={true}
                  checked={resumePrivacy}
                  onChange={() => handlePrivacyChange("resume", true)}
                />
                Public
              </label>
              <label>
                <input
                  type="radio"
                  name="resumePrivacy"
                  value={false}
                  checked={!resumePrivacy}
                  onChange={() => handlePrivacyChange("resume", false)}
                />
                Private
              </label>
            </div>
          </div>

          {/* Change Password */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                className="border rounded-lg p-2"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="border rounded-lg p-2"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="border rounded-lg p-2"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          {/* Save Changes */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="text-red-600 underline"
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </div>
  );
};

export default AccountSetting;
