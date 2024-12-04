import React from 'react'

function SucessCompanyUpload() {
  return ( 
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
        <div className='w-2/3 flex justify-center items-center flex-col gap-3'>
            <img src={require('../../image/success.png')} alt="success" className='w-16 h-16' />
            <div className="w-full text-center text-[#18191c] text-2xl font-medium font-['Inter'] leading-loose">🎉 Congratulations, You company profile is 100% complete!</div>
            <div className="w-1/2 text-center text-[#5e6670] text-base font-normal font-['Inter'] leading-normal">Please wait for check validation of your company</div>
            <button className="mt-3 px-6 py-3 bg-[#0a65cc] rounded justify-center items-center flex text-white text-base font-semibold font-['Inter'] capitalize leading-normal">View Dashboard</button>
              
        </div>
    </div>
  )
}

export default SucessCompanyUpload