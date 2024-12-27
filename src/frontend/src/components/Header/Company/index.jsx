import React from 'react';
import { useState } from 'react';
import NavCompany from '../../Nav/Company';
import { Link, useLocation } from 'react-router-dom';

const HeaderLogginComany = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  const toggleWelcome = () => setShowWelcome((prev) => !prev);
  const closeWelcome = () => setShowWelcome(false);
  const location = useLocation();
  
  return (
    <div className="w-full flex flex-col justify-center bg-[#f1f2f4] border-b border-[#e4e7eb]">
      <div className="w-full flex items-center justify-center">
        <div className="w-[90%] flex flex-row items-center justify-between">
          <div className="h-12 justify-start flex flex-row items-center">
            <div className="justify-start gap-6 flex">
              <a
                href="/company/dashboard"
                className={`py-3.5 ${location.pathname.toLowerCase().startsWith('/company/dashboard') ? 'text-blue' : 'text-[#5e6670]'
                  } font-normal font-['Inter'] leading-tight`}
              >
                Dashboard
              </a>
            </div>
          </div>
          <img src="/image/help.jpg"  alt="logo" className="items-center justify-center h-4" onClick={toggleWelcome} />
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
            Thank you for joining us! To get started, you’ll need to complete your Company Profile . Once that’s done, you’ll have full access to all the powerful tools we offer to help you find the best talent for your company. Here’s how to get started:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>Set Up Your Company Profile 🏢</li>
              <li>Post Your First Job 📝</li>
              <li>Create Entrance Questions 🎯</li>
              <li>Review Applications 📑</li>
              <li>View and Manage Your Posted Jobs 📃</li>
              <li>Save Candidates 🔖</li>
              <li>Stay Active & Visible 👀</li>
            </ul>
          </div>
        </div>
      )}
      </div>
      {location.pathname.toLowerCase() !== "/company/addcompany" && <NavCompany />}
    </div>
  );
};

export default HeaderLogginComany;
