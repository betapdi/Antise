import React from 'react'
import Nav from '../Nav'

const Header = () => {
  return (
    <div className='w-full flex flex-col justify-center bg-[#f1f2f4]'> 
      <div className='w-full pl-48 flex'>
        <div className="h-12 justify-start inline-flex">
          <div className="justify-start gap-6 flex">
            <div className="py-3.5 bg-[#f1f2f4] justify-start items-center gap-1 flex">
              <div className="text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight">Home</div>
            </div>
            <div className="py-3.5 bg-[#f1f2f4] shadow-inner justify-start items-center gap-1 flex">
              <div className="text-[#0a65cc] text-sm font-medium font-['Inter'] leading-tight">Find Job</div>
            </div>
            <div className="py-3.5 bg-[#f1f2f4] justify-start items-center gap-1 flex">
              <div className="text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight">Find Employers</div>
            </div>
          </div>
        </div>
      </div>
      <Nav isAuthen={1}/>
    </div> 
  )
}

export default Header