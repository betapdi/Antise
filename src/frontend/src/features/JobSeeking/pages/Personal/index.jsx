import React from "react";

const PersonalPage = () => {
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
          <h1 className="text-3xl font-semibold">Setting</h1>
        </header>

        {/* Form Content */}
        <form className="bg-white p-6 rounded-lg shadow-md">
          {/* Basic Information */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Profile Picture */}
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-gray-700 mb-2">Profile Picture</label>
                <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center">
                  <p>Browse photo or drop here</p>
                  <p className="text-sm text-gray-500">Max photo size is 5 MB</p>
                </div>
              </div>
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="Your full name"
                />
              </div>
              {/* Major/Field */}
              <div>
                <label className="block text-gray-700 mb-2">Major/Field</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  placeholder="Your field of expertise"
                />
              </div>
              {/* Experience */}
              <div>
                <label className="block text-gray-700 mb-2">Experience</label>
                <select className="w-full border rounded-lg p-2">
                  <option>Select...</option>
                  <option>Less than 1 year</option>
                  <option>1-2 years</option>
                  <option>3-5 years</option>
                  <option>More than 5 years</option>
                </select>
              </div>
              {/* Education */}
              <div>
                <label className="block text-gray-700 mb-2">Education</label>
                <select className="w-full border rounded-lg p-2">
                  <option>Select...</option>
                  <option>Undergraduate</option>
                  <option>Graduate</option>
                  <option>Higher Education</option>
                </select>
              </div>
              {/* Nationality */}
              <div>
                <label className="block text-gray-700 mb-2">Nationality</label>
                <select className="w-full border rounded-lg p-2">
                  <option>Select...</option>
                  <option>Vietnam</option>
                  <option>USA</option>
                </select>
              </div>
              {/* Date of Birth */}
              <div>
                <label className="block text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-2"
                />
              </div>
              {/* Gender */}
              <div>
                <label className="block text-gray-700 mb-2">Gender</label>
                <select className="w-full border rounded-lg p-2">
                  <option>Select...</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
            </div>
          </section>

          {/* Contact Info */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <div className="flex items-center">
                  <select className="border rounded-l-lg p-2">
                    <option>+1</option>
                    <option>+84</option>
                  </select>
                  <input
                    type="text"
                    className="flex-1 border rounded-r-lg p-2"
                    placeholder="Phone number"
                  />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg p-2"
                  placeholder="Email address"
                />
              </div>
              {/* Biography */}
              <div className="col-span-2">
                <label className="block text-gray-700 mb-2">Biography</label>
                <textarea
                  rows="4"
                  className="w-full border rounded-lg p-2"
                  placeholder="Write down your biography here..."
                ></textarea>
              </div>
            </div>
          </section>

          {/* Resume and Actions */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your CV/Resume</h2>
            <div className="flex items-center space-x-4">
              <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center w-1/3">
                <p>Browse file or drop here</p>
                <p className="text-sm text-gray-500">Only PDF</p>
              </div>
              <div className="p-4 border rounded-lg w-2/3 flex justify-between items-center">
                <span>Product Designer (47 MB)</span>
                <div className="flex space-x-2">
                  <button className="text-blue-600">Edit</button>
                  <button className="text-red-600">Delete</button>
                </div>
              </div>
            </div>
          </section>

          {/* Save and Other Actions */}
          <div className="mt-8 flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">Save Changes</button>
            <button className="bg-gray-200 px-6 py-2 rounded-lg">Change Password</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PersonalPage;
