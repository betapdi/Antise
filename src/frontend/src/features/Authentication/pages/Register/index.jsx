import * as React from "react";

export default function SignUpPage() {
  return (
    <div className="w-screen h-screen justify-center items-center flex flex-row gap-20">
      <div className="w-1/2 flex justify-between items-center">
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-10">
            <img
              src={require("../../../../image/logo_job.png")}
              alt="logo"
              className="h-auto"
            />
            <div className="text-black text-1xl font-inter pt-2">Antise</div>
          </div>
          <div className="flex flex-row items-center justify-between mb-8">
            <div className="flex flex-col me-16">
              <h className="text-[32px] font-medium font-inter leading-10 mb-2">
                Create Account
              </h>
              <div className="text-gray text-base font-normal font-inter">
                Already have an account?{" "}
                <a href="/auth/login" className="text-blue hover:underline">
                  Login
                </a>
              </div>
            </div>
            <select id="role" class="bg-white border border-gray/100 text-black rounded-lg p-2">
              <option value="Employee">Employee</option>
              <option value="Employer">Employer</option>
            </select>
          </div>
          <form className="space-y-2 mb-8">
            <div className="flex flex-row gap-2">
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
          <div className="flex justify-center items-center mb-3 w-full">
            <button className="bg-white py-2 px-8 rounded-md text-sm border border-gray/100 flex items-center justify-center">
              <img
                src={require("../../../../image/logo_gg.png")}
                alt="Google"
                className="mr-2"
              />
              <span className="font-['Inter'] font-normal">Sign up with Google</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center text-center me-6">
        <img
          src={require("../../../../image/bg.png")}
          alt="Logo"
          className="h-auto w-72"
        />
        <h2 className="text-2xl font-semibold text-[#0A65CC] mb-4">
          Over 1,75,324 candidates waiting for good employees.
        </h2>
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
            <p className="text-[#0A65CC]">New Jobs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
