import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Settings = () => {
  return (
    <div className="w-full overflow-y-auto">
      <div className="w-full flex-col justify-start items-start gap-4 flex">
        <h1 className="text-[#18191c] text-2xl font-medium leading-loose font-inter">
          Settings
        </h1>
        <h2 className="text-[#18191c] text-lg font-medium font-inter leading-7">
          Basic Information
        </h2>
        <div className="w-full flex-row justify-start items-start flex gap-10 mb-6">
          <div className='w-1/3 flex flex-col gap-2 h-full'>
              <label className="ps-1 text-[#18191c] text-sm font-normal font-['Inter'] leading-7">Profile Picture</label>
              <div className="w-full h-48 relative border-2 border-gray/100 border-dashed rounded-lg p-6" id="dropzone">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" />
                  <div className="text-center">
                      <img className="mx-auto h-12 w-12" src={require('../../../../../image/icon_upload_gray.svg').default} alt=""/>
                      <h3 class="mt-2 text-sm font-medium text-gray-900">
                                        <label for="file-upload" class="relative cursor-pointer">
                                            <span>Drag and drop</span>
                                            <span class="text-indigo-600"> or browse</span>
                                            <span> to upload</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only"/>
                                        </label>
                      </h3>
                      <p class="mt-1 text-xs text-[#767f8c] font-inter">
                      A photo larger than 400 pixels work best. Max photo size 5 MB.
                      </p>
                  </div>
                  <img src="" class="mt-4 mx-auto max-h-40 hidden" id="preview"/>
              </div>
          </div>
          <Formik
            initialValues={{
              fullName: "",
              majorField: "",
              experience: "",
              education: "",
              nationality: "",
              dateOfBirth: "",
              gender: "",
            }}
            validationSchema={Yup.object({
              fullName: Yup.string().required("Please fill your full name"),
              majorField: Yup.string().required("Please fill your field of study"),
              experience: Yup.string().required("Please select your experience"),
              education: Yup.string().required("Please fill your education details"),
              nationality: Yup.string().required("Please select your nationality"),
              dateOfBirth: Yup.date().required("Please select your date of birth"),
              gender: Yup.string().required("Please select your gender"),
            })}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {() => (
              <div className="justify-start items-start flex w-2/3">
                <Form>
                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Full Name */}
                        <div>
                          <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Full Name
                          </label>
                          <Field
                            name="fullName"
                            type="text"
                            className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                            placeholder="Enter full name"
                          />
                          <ErrorMessage
                            name="fullName"
                            component="div"
                            className="text-red text-sm"
                          />
                        </div>

                        {/* Major/Field */}
                        <div>
                          <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Major/Field
                          </label>
                          <Field
                            name="majorField"
                            type="text"
                            className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                            placeholder="Enter your field of study"
                          />
                          <ErrorMessage
                            name="majorField"
                            component="div"
                            className="text-red text-sm"
                          />
                        </div>

                        {/* Experience */}
                        <div>
                          <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Experience
                          </label>
                          <Field as="select" name="experience" className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md">
                            <option value="">Select...</option>
                            <option value="1">1-2 years</option>
                            <option value="2">3-5 years</option>
                            <option value="3">5+ years</option>
                          </Field>
                          <ErrorMessage
                            name="experience"
                            component="div"
                            className="text-red text-sm"
                          />
                        </div>

                        {/* Education */}
                        <div>
                          <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Education
                          </label>
                          <Field
                            name="education"
                            type="text"
                            className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                            placeholder="Enter education details"
                          />
                          <ErrorMessage
                            name="education"
                            component="div"
                            className="text-red text-sm"
                          />
                        </div>

                        {/* Nationality */}
                        <div>
                          <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Nationality
                          </label>
                          <Field as="select" name="nationality" className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md">
                            <option value="">Select...</option>
                            <option value="vn">Vietnam</option>
                            <option value="us">USA</option>
                          </Field>
                          <ErrorMessage
                            name="nationality"
                            component="div"
                            className="text-red text-sm"
                          />
                        </div>

                        {/* Date of Birth */}
                        <div>
                          <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Date of Birth
                          </label>
                          <Field
                            name="dateOfBirth"
                            type="date"
                            className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                          />
                          <ErrorMessage
                            name="dateOfBirth"
                            component="div"
                            className="text-red text-sm"
                          />
                        </div>

                        {/* Gender */}
                        <div>
                          <label className="text-[#18191c] text-sm font-normal leading-tight">
                            Gender
                          </label>
                          <Field as="select" name="gender" className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md">
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </Field>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="text-red text-sm"
                          />
                        </div>
                    </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        
        <h2 className="text-[#18191c] text-lg font-medium leading-7">
          Contact Information
        </h2>

        <div className="flex-col justify-start items-start gap-2 flex w-full ">
            {/* Map Location */}
            <div className="flex-col justify-start items-start gap-2 inline-flex w-full ">
              <label className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Map Location
              </label>
              <input
                type="text"
                className="h-12 relative bg-white rounded-md border border-[#e4e5e8] w-full"
                placeholder="Enter location"
                style={{ paddingLeft: "10px" }}
              />
               {/* Phone */}
            
              <label className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Phone
              </label>
              <input
                type="text" 
                className="h-12 relative bg-white rounded-md border border-[#e4e5e8] w-full"
                placeholder="Enter phone number"
                style={{ paddingLeft: "10px" }}
              />

            {/* Email */}
              <label className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Email
              </label>
              <div className="relative w-full">
              <input
                type="email"
                className="h-12 relative bg-white rounded-md border border-[#e4e5e8] w-full"
                placeholder="Enter email address"
                style={{ paddingLeft: "50px" }}
              />
              <img
                src={require("../../../../../image/Envelope.png")}
                alt="email icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6"
              />
              </div>

            {/* Biography */}
              <label className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Biography
              </label>
              <textarea
                className="w-full h-32 bg-white rounded-md border border-[#e4e5e8] justify-start items-center inline-flex"
                placeholder="Tell us something about yourself"
                style={{ paddingLeft: "10px" }}
              ></textarea>
            </div>
            <div>
            </div>

           
          </div>
          <h2 className="text-[#18191c] text-lg font-medium leading-7">
          Your CV/Resume
          </h2>
          <div className="flex-col justify-start items-start gap-2 flex w-full ">
            {/* CV/Resume */}
            <div className="flex-col justify-start items-start gap-2 inline-flex w-full ">
              <label className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                CV/Resume
              </label>
              <div className=" p-5 bg-white rounded-md border-2 border-[#e4e5e8] justify-start items-center gap-3 inline-flex">
                <img
                  src={require("../../../../../image/PlusCircle_hover.png")}
                  alt="logo"
                  className="h-auto"
                />
                <div className="text-center">
                  <span className="text-[#18191c] text-sm font-medium">
                    Add CV/Resume
                  </span>
                  <div className="text-center text-[#767f8c] text-xs leading-[18px]">
                Only PDF. Max file size 5 MB.
                  </div>
                </div>
              </div>
              <button type="submit" className="h-14 px-8 mt-5 bg-[#0a65cc] rounded justify-center items-center gap-3 inline-flex">
                      <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">Save Changes</div>
              </button>
              </div>
            </div>
          {/* Change Password */}
          <h2 className="text-[#18191c] text-lg font-medium leading-7">
            Change Password
          </h2>
          <div className="flex-col justify-start items-start gap-2 flex w-full ">
            {/* Current Password */}
            <div className="flex-col justify-start items-start gap-2 inline-flex w-full ">
              <label className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Current Password
              </label>
              <input
                type="password"
                className="h-12 relative bg-white rounded-md border border-[#e4e5e8] w-full"
                placeholder="Enter current password"
                style={{ paddingLeft: "10px" }}
              />
            </div>
            {/* New Password */}
            <div className="flex-col justify-start items-start gap-2 inline-flex w-full ">
              <label className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                New Password
              </label>
              <input
                type="password"
                className="h-12 relative bg-white rounded-md border border-[#e4e5e8] w-full"
                placeholder="Enter new password"
                style={{ paddingLeft: "10px" }}
              />
            </div>
            {/* Confirm Password */}
            <div className="flex-col justify-start items-start gap-2 inline-flex w-full ">
              <label className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Confirm Password
              </label>
              <input
                type="password"
                className="h-12 relative bg-white rounded-md border border-[#e4e5e8] w-full"
                placeholder="Confirm new password"
                style={{ paddingLeft: "10px" }}
              />
            </div>
            <button type="submit" className="h-14 px-8 mt-5 bg-[#0a65cc] rounded justify-center items-center gap-3 inline-flex">
                      <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">Change Password</div>
            </button>
            </div>
            {/* Delete Your Account */}
            <h2 className="text-[#18191c] text-lg font-medium leading-7">
            Delete Your Account
            </h2>
            <div className="w-1/2 text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">If you delete your Antise account, you will no longer be able to get information about the matched jobs, following employers, and job alert, shortlisted jobs and more. You will be abandoned from all the services of Antise.com.</div>
            <div className="h-6 rounded-[3px] justify-center items-center gap-2 inline-flex">
            <img
                  src={require("../../../../../image/XCircle.png")}
                  alt="logo"
                  className="h-auto"
                />
            <div className="text-[#e05050] text-sm font-medium font-['Inter'] leading-tight">Close Account</div>
            </div>
        </div>
    </div>
  );
};

export default Settings;
