import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavAdmin from '../../Nav/Admin';

const HeaderLogginAdmin = () => {
  const location = useLocation();
  return (
    <div className="w-full flex flex-col justify-center bg-[#f1f2f4] border-b border-[#e4e7eb]">
      <div className="w-full flex items-center justify-center">
        <div className="w-[65rem] flex items-center justify-start">
          <div className="h-12 justify-start items-center inline-flex">
            <div className="justify-start gap-6 flex">
              <a
                href="/admin/dashboard"
                className={`py-3.5 ${location.pathname.toLowerCase().startsWith('/company/dashboard') ? 'text-blue' : 'text-[#5e6670]'
                  } font-normal font-['Inter'] leading-tight`}
              >
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
      {location.pathname.toLowerCase() !== "/company/addcompany" && <NavAdmin />}
    </div>
  );
};

export default HeaderLogginAdmin;
