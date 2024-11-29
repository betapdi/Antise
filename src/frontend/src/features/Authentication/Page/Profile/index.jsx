import * as React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-lg">
        <div className="text-2xl font-bold mb-6">MyJob</div>
        <nav>
          <ul className="space-y-4">
            <li className="text-blue-600 font-medium">Overview</li>
            <li>Applied Jobs</li>
            <li>Favorite Jobs</li>
            <li className="flex justify-between items-center">
              <span>Job Alert</span>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">09</span>
            </li>
            <li>Settings</li>
          </ul>
        </nav>
        <button className="mt-8 text-gray-600 text-sm flex items-center">
          <span>Log-out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </header>

        {/* Tabs */}
        <div className="mb-6 border-b">
          <ul className="flex space-x-6">
            <li className="text-blue-600 border-b-2 border-blue-600 pb-2">Personal</li>
            <li className="text-gray-600">Profile</li>
            <li className="text-gray-600">Social Links</li>
            <li className="text-gray-600">Account Setting</li>
          </ul>
        </div>

        {/* Profile Form */}
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div>
              <label className="block text-gray-700 mb-2">Nationality</label>
              <select className="w-full border rounded-lg p-2">
                <option value="">Select...</option>
                <option value="vn">Vietnam</option>
                <option value="us">USA</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                className="w-full border rounded-lg p-2"
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Gender</label>
              <select className="w-full border rounded-lg p-2">
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Education</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                placeholder="Fill University"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Biography</label>
            <textarea
              rows="4"
              className="w-full border rounded-lg p-2"
              placeholder="Write down your biography here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
};

export default ProfilePage;
