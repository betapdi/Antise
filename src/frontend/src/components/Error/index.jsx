import React from "react";

function Error() {
  const handleLoginClick = () => {
    window.location.href = "auth/login";
  };
  const handleHomeClick = () => {
    window.location.href = "/job/homePage";
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[72rem] flex flex-row justify-center items-center">
        <div className="w-full flex flex-col justify-center items-start gap-8 ml-24">
          <div className="flex flex-col justify-start items-start gap-6">
            <div className="text-[#18191c] text-[40px] font-medium font-['Inter'] leading-[48px]">
              Opps! Page not found-+
            </div>
            <div className="w-full text-[#474c54] text-lg font-normal font-['Inter'] leading-7">
              Something went wrong. You cannot access this page.
            </div>
          </div>
          <div className="flex justify-start items-start gap-4">
            <button
              className="px-6 py-3 bg-[#0a65cc] rounded-sm flex justify-center items-center gap-3"
              onClick={() => {
                handleHomeClick();
              }}
            >
              <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                Home
              </div>
              <img
                src={"/image/arrow_right_hover.png"}
                alt="arrow_right"
                className="h-4"
              />
            </button>
            <button className="px-6 py-3 rounded-sm border-2 border-[#e7f0fa] flex justify-center items-center gap-3">
              <div
                className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal"
                onClick={() => {
                  handleLoginClick();
                }}
              >
                Login
              </div>
            </button>
          </div>
        </div>
        <img
          src="/image/error.png"
          alt="illustration"
          className="w-[60%] h-[60%] object-cover"
        />
      </div>
    </div>
  );
}

export default Error;
