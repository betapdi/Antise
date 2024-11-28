import * as React from "react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-row gap-32">
      <div className="w-1/3 flex ms-24 justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-10">
            <img src={require("../../../../image/logo_job.png")} alt="logo" className="h-auto" />
            <div className="text-black text-1xl font-inter pt-2">Antise</div>
          </div>
          <div className="flex flex-row items-center mb-8">
            <div className="flex flex-col me-16">
              <h className="text-[32px] font-medium font-inter leading-10 mb-2">Create Account</h>
              <div className="text-gray text-base font-normal font-inter">Already have an account? <a href="/login" className="text-blue hover:underline">Login</a></div>
            </div>
            <select className="border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 py-0 pr-2">
              <option value="1">Employee</option>
              <option value="2">Employer</option>
            </select>
          </div>
          <form className="space-y-2 mb-8">
              <div className ="flex flex-row gap-2"> 
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-[#b8b6b6]"
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-[#b8b6b6]" 
                />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-2 py-2  border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-[#b8b6b6]"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-2 py-2  border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-[#b8b6b6]"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 border-[#b8b6b6]"
              />
          </form>
          <button className="w-full rounded-sm bg-blue text-white py-3 flex items-center justify-center">
            <div className="text-white text-base font-semibold font-inter leading-normal mr-2">
              Create account
            </div>
            <span className="text-white text-1xl">→</span>
          </button>
          <div className="my-4 text-center text-gray">or</div>
          <div className="flex justify-between mb-3">
            <button className="w-full mr-2 bg-white py-2 rounded-md text-sm border border-[#b8b6b6] pl-1 inline-flex items-center">
              <img src={require("../../../../image/logo_fb.png")} alt="Facebook" className="mr-2" />
              Sign up with Facebook
            </button>
            <button className="w-full ml-2 bg-white py-2 rounded-md text-sm border border-[#b8b6b6] pl-1 inline-flex items-center">
              <img src={require("../../../../image/logo_gg.png")} alt="Google" className="mr-2"/>
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center text-center me-6">
        <img src={require("../../../../image/bg.png")} alt="Logo" className="h-auto w-72" />
        <h2 className="text-2xl font-semibold text-[#0A65CC] mb-4">Over 1,75,324 candidates waiting for good employees.</h2>
        <div className="flex space-x-5">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0A65CC]">1,75,324</p>
            <p className="text-[#0A65CC]">Live Jobs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0A65CC]">97,354</p>
            <p className="text-[#0A65CC]">Companies</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0A65CC]">7,532</p>
            <p className="text-[#0A65CC]" >New Jobs</p>
          </div>
        </div>
      </div>
    </div>   
  );
}
