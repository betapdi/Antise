import React, { useState } from "react";

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>
        <ul className="flex border-b mb-6">
          <li className="mr-6">
            <a href="#" className="text-blue-600 border-b-2 border-blue-600">
              Social Links
            </a>
          </li>
          <li className="mr-6">
            <a href="#" className="text-gray-500">Personal</a>
          </li>
          <li className="mr-6">
            <a href="#" className="text-gray-500">Profile</a>
          </li>
          <li>
            <a href="#" className="text-gray-500">Account Setting</a>
          </li>
        </ul>
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
                        l.id === link.id ? { ...l, platform: e.target.value } : l
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
  );
};

export default SocialLinks;
