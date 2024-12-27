import React from "react";

const WelcomeEmployee = () => {
    return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
        <div className='w-2/3 flex justify-center items-center flex-col gap-3'>`
            <div className="flex-col justify-center items-center gap-4 flex">
                <div className="text-center">
                    <div className=" text-center text-[#18191c] text-5xl font-medium font-['Inter'] leading-loose">🎉 Welcome to Antise</div>
                    <div className="">
                        <span className="text-[#5e6670] text-[32px] font-bold font-['Inter'] leading-10">We’re excited to have you on board. Here’s a quick guide to help you get started and make the most of your experiences:<br /></span>
                        <span className="text-[#5e6670] text-2xl font-normal font-['Inter'] leading-10">Complete Your Profile 👤<br />Explore Opportunities Jobs 🔍<br />Job Alerts & Recommendations 🔔<br />Apply For A Job 📝<br />Track Your Applications 📈<br />Favorite A Job ❤️<br />Stay Active & Visible 👀</span>
                    </div>
                    <div className="justify-center items-center gap-4 inline-flex">
                        <div className="px-8 py-4 bg-[#e7f0fa] rounded justify-center items-center gap-3 flex mt-5">
                            <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">Let's Create Your Company</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default WelcomeEmployee;