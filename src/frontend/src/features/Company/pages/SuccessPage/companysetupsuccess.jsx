import React from 'react'

function CompanySetupSuccess() {
    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col'>
            <div className='w-2/3 flex justify-center items-center flex-col gap-3'>
                <img src={`/image/Timer.png`} alt="success" className='w-16 h-16' />
                <div className="flex-col justify-center items-center gap-4 flex">
                    <div className="text-center">
                        <span className="text-[#18191c] text-[40px] font-medium font-['Inter'] leading-[50px]">Your company setup is in the authorized <br />This process is at most </span>
                        <span className="text-[#ff4500] text-[40px] font-medium font-['Inter'] leading-[50px]">24h<br /></span>
                        <span className="text-[#18191c] text-[40px] font-medium font-['Inter'] leading-[50px]">Thank you</span>
                    </div>
                    <div className="justify-center items-center gap-4 inline-flex">
                        <div className="px-8 py-4 bg-[#e7f0fa] rounded justify-center items-center gap-3 flex">
                            <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">Sign Out</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CompanySetupSuccess