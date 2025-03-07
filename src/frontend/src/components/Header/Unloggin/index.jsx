import React from 'react';
import Nav from '../../Nav/Applicant';
import { Link, useLocation } from 'react-router-dom';

const HeaderUnloggin = () => {
  const location = useLocation();
  return (
    <div className="w-full flex flex-col justify-center bg-[#f1f2f4]">
      <div className="w-full flex items-center justify-center">
        <div className="w-[65rem] flex items-center justify-start">
          <div className="h-12 justify-start items-center inline-flex">
            <div className="justify-start gap-6 flex">
              <Link
                to="/job/homepage"
                className={`py-3.5 ${
                  location.pathname.toLowerCase() === '/job/homepage' ? 'text-blue' : 'text-[#5e6670]'
                } font-normal font-['Inter'] leading-tight`}
              >
                Home
              </Link>
              <Link
                to="/job/listjob"
                className={`py-3.5 ${
                  (location.pathname.toLowerCase() === '/job/listjob/search' || location.pathname.toLowerCase() === '/job/listjob') ? 'text-blue' : 'text-[#5e6670]'
                } font-normal font-['Inter'] leading-tight`}
              >
                Find Job
              </Link>
              <Link
                to="/job/findcompany"
                className={`py-3.5 ${
                  location.pathname.toLowerCase() === '/job/findcompany' ? 'text-blue' : 'text-[#5e6670]'
                } font-normal font-['Inter'] leading-tight`}
              >
                Find Company
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Nav isAuthen={0} /> 
    </div>
  );
};

export default HeaderUnloggin;
