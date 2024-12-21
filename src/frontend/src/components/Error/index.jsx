import React from "react";

function Error() {
    const handleLoginClick = () => {
    window.location.href = "auth/login";
    };
    return (
        <div className="w-full h-screen justify-center items-center flex flex-row m-7">
        <div className="h-52 flex-col justify-center items-start gap-8 flex">
            <div className="flex-col justify-start items-start gap-6 flex">
            <div className="text-[#18191c] text-[40px] font-medium font-['Inter'] leading-[48px]">
                Opps! Page not found
            </div>
            <div className="w-full text-[#474c54] text-lg font-normal font-['Inter'] leading-7">
                Something went wrong. You cannot access to this page.
            </div>
            </div>
            <div className="justify-start items-start gap-4 inline-flex">
            <button className="px-6 py-3 bg-[#0a65cc] rounded-sm justify-center items-center gap-3 flex">
                <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                Home
                </div>
                <img
                src={"/image/arrow_right_hover.png"}
                alt="arrow_right"
                className="h-4"
                />
            </button>
            <button className="px-6 py-3 rounded-sm border-2 border-[#e7f0fa] justify-center items-center gap-3 flex">
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
            src="image/illustration.png"
            alt="illustration"
            className="max-w-screen-lg"
        />
        </div>
    );
}

export default Error;
