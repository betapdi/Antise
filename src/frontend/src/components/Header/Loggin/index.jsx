import React from 'react';
import { useState } from 'react';
import Nav from '../../Nav/Applicant';
import { Link, useLocation } from 'react-router-dom';

const HeaderLoggin = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  const toggleWelcome = () => setShowWelcome((prev) => !prev);
  const closeWelcome = () => setShowWelcome(false);
  const location = useLocation();

  return (
    <div className="w-full flex flex-col justify-center bg-[#f1f2f4]">
      <div className="w-full flex items-center justify-center">
        <div className="w-[65rem] flex flex-row items-center justify-between">
          <div className="h-12 justify-start items-center inline-flex">
            <div className="justify-start gap-6 flex">
              <Link
                to="/job/homepage"
                className={`py-3.5 ${location.pathname.toLowerCase() === '/job/homepage' ? 'text-blue' : 'text-[#5e6670]'
                  } font-normal font-['Inter'] leading-tight`}
              >
                Home
              </Link>
              <Link
                to="/job/listjob"
                className={`py-3.5 ${(location.pathname.toLowerCase() === '/job/listjob/search' || location.pathname.toLowerCase() === '/job/listjob') ? 'text-blue' : 'text-[#5e6670]'
                  } font-normal font-['Inter'] leading-tight`}
              >
                Find Job
              </Link>
              <Link
                to="/job/findcompany"
                className={`py-3.5 ${location.pathname.toLowerCase() === '/job/findcompany' ? 'text-blue' : 'text-[#5e6670]'
                  } font-normal font-['Inter'] leading-tight`}
              >
                Find Company
              </Link>
              <Link
                to="/job/dashboard"
                className={`py-3.5 ${location.pathname.toLowerCase().startsWith('/job/dashboard') ? 'text-blue' : 'text-[#5e6670]'
                  } font-normal font-['Inter'] leading-tight`}
              >
                Dashboard
              </Link>
            </div>
          </div>
          <button onClick={toggleWelcome}>
          <img src="/image/help.jpg" alt="logo" className="items-center justify-center h-4" />
          </button>
        </div>
        {showWelcome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2 max-w-lg relative">
            <button
              onClick={closeWelcome}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-8 w-8 flex justify-center items-center font-bold"
            >
              <img src="/image/XIcon.png" alt="close" className="h-8" />
            </button>
            <h2 className="text-2xl font-bold mb-4">🎉 Welcome to Antise</h2>
            <p className="text-gray-700">
              We’re excited to have you on board. Here’s a quick guide to help you get started:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>Complete Your Profile 👤</li>
              <li>Explore Opportunities 🔍</li>
              <li>Job Alerts & Recommendations 🔔</li>
              <li>Apply for a Job 📝</li>
              <li>Track Your Applications 📈</li>
              <li>Favorite a Job ❤️</li>
              <li>Stay Active & Visible 👀</li>
            </ul>
          </div>
        </div>
      )}
      </div>
      <Nav isAuthen={1} />
    </div>
  );
};

export default HeaderLoggin;
