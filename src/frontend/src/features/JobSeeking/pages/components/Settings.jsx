import React from "react";

const Settings = () => {
  return (
    <div className="w-3/4 overflow-y-auto ml-8">
            <div className="flex-col justify-start items-start gap-4 flex">
                <h1 className="text-[#18191c] text-2xl font-medium leading-loose">
                Settings
                </h1>
                <h2 className="text-[#18191c] text-lg font-medium leading-7">
                    Basic Information
                </h2>
                

                <div className="flex-row justify-start items-start gap-[18px] flex">
                    <div className="flex flex-row justify-start items-start gap-12">
                    {/* Profile Picture */}
                    <div className="flex-col justify-start items-start gap-2 inline-flex">
                        <div className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                        Profile Picture
                        </div>
                        <div className="w-60 h-60 bg-[#f1f2f4]/40 rounded-md border-2 border-[#c8ccd1]/70 flex flex-col justify-center items-center gap-2">
                        <img
                            src={require("../../../../image/fi_upload-cloud.png").default}
                            alt="logo"
                            className="h-auto"
                        />
                        <div className="text-center">
                            <span className="text-[#18191c] text-sm font-medium">
                            Browse photo
                            </span>
                            <span className="text-[#474c54] text-sm font-normal">
                            {" "}or drop here
                            </span>
                        </div>
                        <div className="text-center text-[#767f8c] text-xs leading-[18px]">
                            A photo larger than 400 pixels works best. Max photo size 5 MB.
                        </div>
                        </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="grid grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                            <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Full Name
                            </label>
                            <input
                            type="text"
                            className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                            placeholder="Enter full name"
                            />
                        </div>

                        {/* Major/Field */}
                        <div>
                            <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Major/Field
                            </label>
                            <input
                            type="text"
                            className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                            placeholder="Enter your field of study"
                            />
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Experience
                            </label>
                            <select className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md">
                            <option value="">Select...</option>
                            <option value="1">1-2 years</option>
                            <option value="2">3-5 years</option>
                            <option value="3">5+ years</option>
                            </select>
                        </div>

                        {/* Education */}
                        <div>
                            <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Education
                            </label>
                            <input
                            type="text"
                            className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                            placeholder="Enter education details"
                            />
                        </div>

                        {/* Nationality */}
                        <div>
                            <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Nationality
                            </label>
                            <select className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md">
                            <option value="">Select...</option>
                            <option value="vn">Vietnam</option>
                            <option value="us">USA</option>
                            </select>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Date of Birth
                            </label>
                            <input
                            type="date"
                            className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Gender
                            </label>
                            <select className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md">
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            </select>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
};

export default Settings;
