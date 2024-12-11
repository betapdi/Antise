import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FileChooser from "../../../../../customFields/FileChooser";
import TextField from "../../../../../customFields/TextField";
import SelectField from "../../../../../customFields/SelectField";

const Settings = () => {
  return (
    <div className="w-full overflow-y-auto ml-8">
      <div className="w-full flex-col justify-start items-start gap-4 flex">
        <h1 className="text-[#18191c] text-2xl font-medium leading-loose font-inter">
          Settings
        </h1>
        <Formik
          initialValues={{
            profilePicture: null,
            fullName: "",
            majorField: "",
            experience: "",
            education: "",
            nationality: "",
            dateOfBirth: "",
            gender: "",
            mapLocation: "",
            phone: "",
            email: "",
            biography: "",
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={Yup.object({
            fullName: Yup.string().required("Please fill your full name"),
            majorField: Yup.string().required("Please fill your field of study"),
            experience: Yup.string().required("Please select your experience"),
            education: Yup.string().required("Please fill your education details"),
            nationality: Yup.string().required("Please select your nationality"),
            dateOfBirth: Yup.date().required("Please select your date of birth"),
            gender: Yup.string().required("Please select your gender"),
            mapLocation: Yup.string().required("Please provide your location"),
            phone: Yup.string()
              .required("Please enter your phone number")
              .matches(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
            email: Yup.string()
              .required("Please provide your email")
              .email("Invalid email address"),
            biography: Yup.string().required("Please write a short biography"),
            currentPassword: Yup.string().required("Please enter your current password"),
            newPassword: Yup.string()
              .required("Please provide a new password")
              .min(8, "Password must be at least 8 characters"),
            confirmNewPassword: Yup.string()
              .required("Please confirm your new password")
              .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 400);
          }}
        >
          {({ values, errors, touched, handleSubmit, setFieldValue, isSubmitting }) => {
            console.log({ values, errors, touched, handleSubmit, isSubmitting });
            return (
              <Form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <h2 className="text-[#18191c] text-lg font-medium leading-7">
                  Basic Information
                </h2>
                <div className="w-full flex-row justify-start items-start flex gap-10 mb-6">
                    <Field
                      name="profilePicture"
                      component={FileChooser}
                      label="Profile Picture"
                      width = "w-1/3"
                      placeholder="A photo larger than 400 pixels work best. Max photo size 5 MB."
                    />
                  {/* <div className='w-1/3 flex flex-col gap-2 h-full'>
                    <label className="ps-1 text-[#18191c] text-sm font-normal font-['Inter'] leading-7">Profile Picture</label>
                    <div className="w-full h-48 relative border-2 border-gray/100 border-dashed rounded-lg p-6" id="dropzone">
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" name="profilePicture" 
                      onChange={(event) => {console.log("Set file value"); setFieldValue('profilePicture', event.currentTarget.files[0]);}} />
                      
                      <div className="text-center">
      
                        <img className="mx-auto h-12 w-12" src={`/image/icon_upload_gray.svg`} alt="" />
                        <h3 class="mt-2 text-sm font-medium text-gray-900">
                          <label for="file-upload" class="relative cursor-pointer">
                            <span>Drag and drop</span>
                            <span class="text-indigo-600"> or browse</span>
                            <span> to upload</span>
                          </label>
                        </h3>
                        <p class="mt-1 text-xs text-[#767f8c] font-inter">
                          A photo larger than 400 pixels work best. Max photo size 5 MB.
                        </p>
                      </div>
                    </div>
                  </div> */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Full Name */}
                    <div>
                    <Field
                      name="fullName"
                      component={TextField}
                      label="Full Name"
                      heightInput="h-12"
                      placeholder="Enter full name"
                    />
                      {/* <label className="text-[#18191c] text-sm font-normal leading-tight">
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
                      /> */}
                    </div>
                    {/* Major Field */}
                    <div>
                      <Field
                        name="majorField"
                        component={TextField}
                        label="Major Field"
                        heightInput="h-12"
                        placeholder="Enter major field"
                      />
                      {/* <label className="text-[#18191c] text-sm font-normal leading-tight">
                        Major Field
                      </label>
                      <Field
                        name="majorField"
                        type="text"
                        className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                        placeholder="Enter major field"
                      />
                      <ErrorMessage
                        name="majorField"
                        component="div"
                        className="text-red text-sm"
                      /> */}
                    </div>
                    {/* Experience */}
                    <div>
                      <Field
                        name="experience"
                        component={SelectField}
                        label="Experience"
                        heightInput="h-12"
                        options = {[{key: "Select...", value: ""},
                                  {key: "0-1 years", value: "0-1 years"},
                                  {key: "1-3 years", value: "1-3 years"},
                                  {key: "3-5 years", value: "3-5 years"},
                                  {key: "5+ years", value: "5+ years"}]}
                      />
                      {/* <label className="text-[#18191c] text-sm font-normal leading-tight">
                        Experience
                      </label>
                      <Field
                        as="select"
                        name="experience"
                        className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                      >
                        <option value="">Select experience</option>
                        <option value="0-1 years">0-1 years</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </Field>
                      <ErrorMessage
                        name="experience"
                        component="div"
                        className="text-red text-sm"
                      /> */}
                    </div>
                    {/* Education */}
                    <div>
                      <Field
                        name="education"
                        component={TextField}
                        label="Education"
                        heightInput="h-12"
                        placeholder="Enter education details"
                      />
                      {/* <label className="text-[#18191c] text-sm font-normal leading-tight">
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
                      /> */}
                    </div>
                    {/* Nationality */}
                    <div>
                      <Field
                        name="nationality"
                        component={SelectField}
                        label="Nationality"
                        heightInput="h-12"
                        options = {[{key: "Select...", value: ""},
                                  {key: "Vietnam", value: "Vietnam"},
                                  {key: "USA", value: "USA"}]}
                      />
                      {/* <label className="text-[#18191c] text-sm font-normal leading-tight">
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
                      /> */}
                    </div>
                    {/* Major/Field */}
                    <div>
                      <Field
                        name="majorField"
                        component={TextField}
                        label="Major/Field"
                        heightInput="h-12"
                        placeholder="Enter study field"
                      />
                      {/* <label className="text-[#18191c] text-sm font-normal leading-tight">
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
                      /> */}
                    </div>
                    {/* Experience */}
                    <div>
                      <Field
                        name="experience"
                        component={SelectField}
                        label="Experience"
                        heightInput="h-12"
                        options = {[{key: "Select...", value: ""},
                                  {key: "1-2 years", value: "1-2 years"},
                                  {key: "3-5 years", value: "3-5 years"},
                                  {key: "5+ years", value: "5+ years"}]}
                      />
                      {/* <label className="text-[#18191c] text-sm font-normal leading-tight">
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
                      /> */}
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
                </div>

                {/* Contact Information */}
                <h2 className="text-[#18191c] text-lg font-medium leading-7">
                  Contact Information
                </h2>
                {/* Map Location */}
                <div>
                  <label className="text-[#18191c] text-sm font-normal leading-tight">
                    Map Location
                  </label>
                  <Field
                    name="mapLocation"
                    type="text"
                    className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                    placeholder="Enter location"
                  />
                  <ErrorMessage
                    name="mapLocation"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>
                {/* Phone */}
                <div>
                  <label className="text-[#18191c] text-sm font-normal leading-tight">
                    Phone
                  </label>
                  <Field
                    name="phone"
                    type="text"
                    className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                    placeholder="Enter phone number"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="text-[#18191c] text-sm font-normal leading-tight">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                    placeholder="Enter email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>
                {/* Biography */}
                <div className="col-span-2">
                  <label className="text-[#18191c] text-sm font-normal leading-tight">
                    Biography
                  </label>
                  <Field
                    as="textarea"
                    name="biography"
                    className="w-full h-32 px-4 bg-white border border-[#e4e5e8] rounded-md"
                    placeholder="Tell us something about yourself"
                  />
                  <ErrorMessage
                    name="biography"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>

                {/* Change Password */}
                <h2 className="text-[#18191c] text-lg font-medium leading-7">
                  Change Password
                </h2>
                {/* Current Password */}
                <div>
                  <label className="text-[#18191c] text-sm font-normal leading-tight">
                    Current Password
                  </label>
                  <Field
                    name="currentPassword"
                    type="password"
                    className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                    placeholder="Enter current password"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>
                {/* New Password */}
                <div>
                  <label className="text-[#18191c] text-sm font-normal leading-tight">
                    New Password
                  </label>
                  <Field
                    name="newPassword"
                    type="password"
                    className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                    placeholder="Enter new password"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>

                <div>
                  <label className="text-[#18191c] text-sm font-normal leading-tight">
                    Confirm New Password
                  </label>
                  <Field
                    name="confirmNewPassword"
                    type="password"
                    className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"
                    placeholder="Confirm new password"
                  />
                  <ErrorMessage
                    name="confirmNewPassword"
                    component="div"
                    className="text-red text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="h-14 px-8 mt-5 bg-[#0a65cc] rounded justify-center items-center gap-3 inline-flex"
                  disabled={isSubmitting}
                >
                  <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                    Save Changes
                  </div>
                </button>
                {/* Delete Your Account */}
                <div className="space-y-3 mt-6">
                  <h2 className="text-[#18191c] text-lg font-medium leading-7">
                    Delete Your Account
                  </h2>
                  <div className="w-1/2 text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">If you delete your Antise account, you will no longer be able to get information about the matched jobs, following employers, and job alert, shortlisted jobs and more. You will be abandoned from all the services of Antise.com.</div>
                  <div className="h-6 rounded-[3px] justify-center items-center gap-2 inline-flex">
                    <img
                      src={`/image/XCircle.png`}
                      alt="logo"
                      className="h-auto"
                    />
                    <div className="text-[#e05050] text-sm font-medium font-['Inter'] leading-tight">Close Account</div>
                  </div>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Settings;
