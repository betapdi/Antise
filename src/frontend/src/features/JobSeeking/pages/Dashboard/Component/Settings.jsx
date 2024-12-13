import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "../../../../../customFields/TextField";
import SelectField from "../../../../../customFields/SelectField";
import DateField from "../../../../../customFields/DateField";
import IconTextField from "../../../../../customFields/IconTextField";
import RichTextField from "../../../../../customFields/RichTextField";
import ResumeField from "../../../../../customFields/ResumeField";
import ImageField from "../../../../../customFields/ImageField";

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
            resume: null,
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
                    component={ImageField}
                    label="Profile Picture"
                    width = "w-1/4"
                    placeholder="A photo larger than 400 pixels work best. Max photo size 5 MB."
                  />
                  
                  <div className="w-3/4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Full Name */}
                        <Field
                          name="fullName"
                          component={TextField}
                          label="Full Name"
                          heightInput="h-12"
                          placeholder="Enter full name"
                        />
                      {/* Major Field */}
                        <Field
                          name="majorField"
                          component={TextField}
                          label="Major/Field"
                          heightInput="h-12"
                          placeholder="Enter major/field"
                        />
                      {/* Experience */}
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

                      {/* Education */}
                        <Field
                          name="education"
                          component={TextField}
                          label="Education"
                          heightInput="h-12"
                          placeholder="Enter education details"
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {/* Nationality */}
                        <Field
                          name="nationality"
                          component={SelectField}
                          label="Nationality"
                          heightInput="h-12"
                          options = {[{key: "Select...", value: ""},
                                    {key: "Vietnam", value: "VietNam"},
                                    {key: "USA", value: "USA"}]}
                        />

                      {/* Date Of Birth */}
                        <Field
                          name = "dateOfBirth"
                          component = {DateField}
                          label = "Date of Birth"
                          placeholder="mm/dd/yyyy"
                          heightInput = "h-12"
                        />

                      {/* Gender */}
                        <Field
                          name="gender"
                          component={SelectField}
                          label="Gender"
                          heightInput="h-12"
                          options = {[{key: "Select...", value: ""},
                                    {key: "Male", value: "male"},
                                    {key: "Female", value: "female"}]}
                        />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="pt-8">
                  <h2 className="text-[#18191c] text-lg font-medium leading-7">
                    Contact Information
                  </h2>

                  <div className="space-y-2 pt-4 w-full">
                    {/* Map Location */}
                    <div>
                      <Field
                        name = "mapLocation"
                        component = {TextField}
                        placeholder = "Enter location"
                        heightInput = "h-12"
                        label = "Map Location"
                      />
                    </div>

                    {/* Phone */}
                    <Field
                      name = "phone"
                      component = {IconTextField}
                      label = "Phone"
                      placeholder="Phone number..."
                      imageName = "phone.svg"
                      type = "number"
                      heightInput = "h-12"
                    />
                    
                    {/* Email */}
                    <Field
                      name = "email"
                      component = {IconTextField}
                      label = "Email"
                      placeholder="Email Address"
                      imageName = "Email.svg"
                      type = "email"
                    />

                    {/* Biography */}
                    <Field
                      name = "biography"
                      component = {RichTextField}
                      label = "Biography"
                      placeholder="Tell us something about yourself"
                      rows = "6"
                    />
                  </div>

                  <div>
                    <div className="text-lg font-medium mb-3">Your Cv/Resume</div>
                    {/* Resume */}
                    <Field
                      name = "resume"
                      component = {ResumeField}
                      placeholder = "Browse file or drop here. only pdf"
                    />
                  </div>
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
                
                <div className="w-full h-4"/>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Settings;
