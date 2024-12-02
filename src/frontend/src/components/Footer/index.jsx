import React from 'react'

function Footer() {
  return (
    <div className="w-full bg-[#18191c] flex-col justify-start items-center inline-flex">
        <div className="w-[1300px] h-96 flex flex-row justify-center py-16">
            <div className="h-36 flex-col justify-start items-start gap-6 inline-flex">
                <div className="justify-start items-center gap-2 inline-flex">
                    <img src={require('../../image/logo_white.png')} alt="logo" className="w-16 h-16" />
                    <div className="text-white text-2xl font-semibold font-['Inter'] leading-10">MyJob</div>
                </div>
                <div className="flex-col justify-start items-start gap-3 flex">
                    <div className="justify-start items-start inline-flex">
                        <div className="text-[#5e6670] text-lg font-normal font-['Inter'] leading-7">Call now:</div>
                        <div className="text-white text-lg font-medium font-['Inter'] leading-7"> (319) 555-0115</div>
                    </div>
                    <div className="w-[312px] text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">227 Nguyen Van Cu, Ho Chi Minh</div>
                </div>
            </div>
            <div className="h-[204px] flex-col justify-start items-start gap-4 inline-flex">
                <div className="w-[200px] text-white text-xl font-medium font-['Inter'] leading-loose">Quick Link</div>
                    <div className="flex-col justify-start items-start gap-1 flex">
                        <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                            <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">About</div>
                        </div>
                        <div className="py-1.5 justify-start items-center gap-1.5 inline-flex">
                            <div className="text-center text-[#9199a3] text-base font-medium font-['Inter'] leading-normal">Contact</div>
                        </div>
                        <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                            <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Pricing</div>
                        </div>
                        <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                            <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Blog</div>
                        </div>
                    </div>
            </div>
            <div className="h-[204px] flex-col justify-start items-start gap-4 inline-flex">
                <div className="w-[200px] text-white text-xl font-medium font-['Inter'] leading-loose">Candidate</div>
                <div className="flex-col justify-start items-start gap-1 flex">
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Browse Jobs</div>
                    </div>
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Browse Employers</div>
                    </div>
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Candidate Dashboard</div>
                    </div>
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Saved Jobs</div>
                    </div>
                </div>
            </div>
            <div className="h-[204px] flex-col justify-start items-start gap-4 inline-flex">
                <div className="w-[200px] text-white text-xl font-medium font-['Inter'] leading-loose">Employers</div>
                <div className="flex-col justify-start items-start gap-1 flex">
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Post a Job</div>
                    </div>
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Browse Candidates</div>
                    </div>
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Employers Dashboard</div>
                    </div>
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Applications</div>
                    </div>
                </div>
            </div>
            <div className="h-[164px] flex-col justify-start items-start gap-4 inline-flex">
            <div className="w-[200px] text-white text-xl font-medium font-['Inter'] leading-loose">Support</div>
                <div className="flex-col justify-start items-start gap-1 flex">
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Faqs</div>
                    </div>
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Privacy Policy</div>
                    </div>
                    <div className="py-1.5 justify-start items-center gap-1 inline-flex">
                        <div className="text-center text-[#9199a3] text-base font-normal font-['Inter'] leading-normal">Terms & Conditions</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Footer