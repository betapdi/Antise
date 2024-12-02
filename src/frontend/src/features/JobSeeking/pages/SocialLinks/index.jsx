import React, { useState } from "react";
import { Link } from "react-router-dom";

const SocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: "Facebook", url: "" },
    { id: 2, platform: "Instagram", url: "" },
    { id: 3, platform: "Youtube", url: "" },
  ]);

  // Handle URL change
  const handleUrlChange = (id, value) => {
    setSocialLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, url: value } : link
      )
    );
  };

  // Add a new social link
  const handleAddLink = () => {
    setSocialLinks((prevLinks) => [
      ...prevLinks,
      { id: Date.now(), platform: "Facebook", url: "" },
    ]);
  };

  // Remove a social link
  const handleRemoveLink = (id) => {
    setSocialLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="flex w-full max-w-screen-xl">
        {/* Left Column (Sidebar) */}
        <div className="w-1/3 bg-white p-6 shadow-lg h-full border-r border-gray-500">
          <div className="text-2xl font-bold mb-6">MyJob</div>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/job/profile" className="text-blue-600 font-medium">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/job/personal" className="text-gray-600">
                  Personal
                </Link>
              </li>
              <li>
                <Link to="/job/profile" className="text-gray-600">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/job/account-setting" className="text-gray-600">
                  Account Setting
                </Link>
              </li>
              <li className="text-blue-600 font-medium">Social Links</li>
            </ul>
          </nav>
          <button className="mt-8 text-gray-600 text-sm flex items-center">
            <span>Log-out</span>
          </button>
        </div>

        {/* Main Content (Social Links Form) */}
        <div className="w-2/3 overflow-y-auto">
          <div className="mx-auto p-4 bg-white shadow-md rounded-lg h-full ">
            <h1 className="text-2xl font-semibold mb-6">Social Links</h1>

            <form>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <div key={link.id} className="flex items-center space-x-4">
                    {/* Dropdown for social platforms */}
                    <select
                      className="border rounded-lg p-2 flex-1"
                      value={link.platform}
                      onChange={(e) =>
                        setSocialLinks((prevLinks) =>
                          prevLinks.map((l) =>
                            l.id === link.id
                              ? { ...l, platform: e.target.value }
                              : l
                          )
                        )
                      }
                    >
                      <option value="Facebook">Facebook</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                    </select>

                    {/* Input for the profile URL */}
                    <input
                      type="url"
                      placeholder="Profile link/url..."
                      className="flex-1 border rounded-lg p-2"
                      value={link.url}
                      onChange={(e) => handleUrlChange(link.id, e.target.value)}
                    />

                    {/* Remove button */}
                    <button
                      type="button"
                      className="text-red-600"
                      onClick={() => handleRemoveLink(link.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Add new social link */}
              <button
                type="button"
                className="flex items-center space-x-2 text-blue-600 mt-4"
                onClick={handleAddLink}
              >
                <span>➕</span>
                <span>Add New Social Link</span>
              </button>

              {/* Save changes button */}
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-6"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
