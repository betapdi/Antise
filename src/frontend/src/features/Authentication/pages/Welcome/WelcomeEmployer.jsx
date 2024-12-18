import React from "react";

const WelcomeEmployer = () => {
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
        <div className='w-2/3 flex justify-center items-center flex-col gap-3'>
            <img src={`/image/Timer.png`} alt="success" className='w-16 h-16' />
            <div className="flex-col justify-center items-center gap-4 flex">
                <div className="text-center">
                    <div className=" text-center text-[#18191c] text-5xl font-medium font-['Inter'] leading-loose">🎉 Welcome to Antise</div>
                    <div className="">
                        <span style="text-[#5e6670] text-[32px] font-bold font-['Inter'] leading-10">Thank you for joining us! To get started, you’ll need to complete your </span>
                        <span style="text-[#f62929] text-[32px] font-black font-['Inter'] leading-10">Company Profile</span>
                        <span style="text-[#5e6670] text-[32px] font-bold font-['Inter'] leading-10">. Once that’s done, you’ll have full access to all the powerful tools we offer to help you find the best talent for your company. Here’s how to get started:<br /></span>
                        <span style="text-[#5e6670] text-2xl font-bold font-['Inter'] leading-normal"><br /></span>
                        <span style="text-[#5e6670] text-2xl font-normal font-['Inter'] leading-10">1. Set Up Your Company Profile 🏢<br />2. Post Your First Job 📝<br />3. Create Entrance Questions 🎯<br />4. Review Applications 📑<br />5. View and Manage Your Posted Jobs 📃<br />6. Save Candidates 🔖<br />7. Stay Active & Visible 👀<br /></span>
                        <span style="text-[#5e6670] text-base font-normal font-['Inter'] leading-normal"><br /></span>
                        <span style="text-[#5e6670] text-[32px] font-bold font-['Inter'] leading-[50px]">Helpful Tips for Employers 📈<br /></span>
                        <span style="text-[#5e6670] text-2xl font-normal font-['Inter'] leading-10">Be Clear and Detailed in Your Job Descriptions<br />Stay Engaged<br />Check Your Email<br />Update Your Company Profile</span></div>
                </div>
                <div className="justify-center items-center gap-4 inline-flex">
                    <div className="px-8 py-4 bg-[#e7f0fa] rounded justify-center items-center gap-3 flex">
                        <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">Let's Create Your Company</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default WelcomeEmployer;