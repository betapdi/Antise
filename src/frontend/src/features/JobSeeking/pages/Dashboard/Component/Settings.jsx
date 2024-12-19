import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextField from "../../../../../customFields/TextField";
import SelectField from "../../../../../customFields/SelectField";
import DateField from "../../../../../customFields/DateField";
import IconTextField from "../../../../../customFields/IconTextField";
import RichTextField from "../../../../../customFields/RichTextField";
import ResumeField from "../../../../../customFields/ResumeField";
import ImageField from "../../../../../customFields/ImageField";
import applicantApi from "../../../../../api/applicantApi";
import { ApplicantContext } from "../../../../../context/ApplicantContext";
import PopupDialog from "../../../components/PopupDialog"; // Adjust the import based on your project structure

const Settings = () => {
  const {
    gender, setGender, fullName, setFullName, profileImageUrl, setProfileImageUrl,
    resumeUrl, setResumeUrl, dateOfBirth, setDateOfBirth,
    experience, setExperience, nationality, setNationality,
    major, setMajor, biography, setBiography, address, setAddress,
    applications, setApplications, education, setEducation,
    workEmail, setWorkEmail, phoneNumber, setPhoneNumber
  } = useContext(ApplicantContext);

  const [oldResume, setOldResume] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: null, content: null, buttonLabel: null, link: null });

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  // Fetch Resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await applicantApi.getResume(resumeUrl);
        console.log(response.data);
        setOldResume(response.data);
      } catch (error) {
        console.log(error);
        setOldResume({ size: 0 });
      }
    };
    fetchResume();
  }, [resumeUrl]);

  // Save changes and show dialog
  const handleSaveChange = async (values) => {
    try {
      const response = await applicantApi.editApplicant(values);
      const applicant = response.data;

      // Update context
      setGender(applicant.gender);
      setFullName(applicant.fullName);
      setAddress(applicant.address);
      setProfileImageUrl(applicant.profileImageUrl);
      setResumeUrl(applicant.resumeUrl);
      setDateOfBirth(applicant.dateOfBirth ? applicant.dateOfBirth.substring(0, 10) : null);
      setExperience(applicant.experience);
      setNationality(applicant.nationality);
      setMajor(applicant.major);
      setBiography(applicant.biography);
      setApplications(applicant.applications);
      setEducation(applicant.education);
      setWorkEmail(applicant.workEmail);
      setPhoneNumber(applicant.phoneNumber);

      // Set success dialog
      setDialogContent({
        title: "Changes Saved Successfully!",
        content: "Your profile has been updated.",
        buttonLabel: "Close",
        link: null
      });
    } catch (error) {
      console.error(error);

      // Set error dialog
      setDialogContent({
        title: "Error!",
        content: "An error occurred while saving changes. Please try again later.",
        buttonLabel: "Close",
        link: null
      });
    }

    // Open dialog
    setIsOpenDialog(true);
  };

  return (
    <div className="w-full overflow-y-auto ml-8">
      {(oldResume != null) && (
        <div className="w-full flex-col justify-start items-start gap-4 flex">
          <h1 className="text-[#18191c] text-2xl font-medium leading-loose font-inter">
            Settings
          </h1>
          <Formik
            initialValues={{
              profilePicture: null,
              resume: null,
              fullName: "",
              major: "",
              experience: "",
              education: "",
              nationality: "",
              dateOfBirth: "",
              gender: null,
              address: "",
              phoneNumber: "",
              workEmail: "",
              biography: "",
            }}
            validationSchema={Yup.object({
              fullName: Yup.string().required("Please fill your full name"),
              major: Yup.string().required("Please fill your field of study"),
              experience: Yup.string().required("Please select your experience"),
              education: Yup.string().required("Please fill your education details"),
              nationality: Yup.string().required("Please select your nationality"),
              dateOfBirth: Yup.date().required("Please select your date of birth"),
              gender: Yup.boolean().required("Please select your gender"),
              address: Yup.string().required("Please provide your location"),
              phoneNumber: Yup.string()
                .required("Please enter your phone number")
                .matches(/^\d+$/, "Please enter a valid number.")
                .matches(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
              workEmail: Yup.string()
                .required("Please provide your email")
                .email("Invalid email address"),
              biography: Yup.string().required("Please write a short biography"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                handleSaveChange(values);
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
                      width="w-1/4"
                      oldImageUrl={profileImageUrl}
                      placeholder="A photo larger than 400 pixels work best. Max photo size 5 MB."
                    />

                    <div className="w-3/4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {/* Full Name */}
                        <Field
                          name="fullName"
                          component={TextField}
                          oldValue={fullName}
                          label="Full Name"
                          heightInput="h-12"
                          placeholder="Enter full name"
                        />
                        {/* Major Field */}
                        <Field
                          name="major"
                          component={TextField}
                          oldValue={major}
                          label="Major/Field"
                          heightInput="h-12"
                          placeholder="Enter major/field"
                        />
                        {/* Experience */}
                        <Field
                          name="experience"
                          component={SelectField}
                          label="Experience"
                          oldValue={experience}
                          heightInput="h-12"
                          options={[{ key: "Select...", value: "" },
                          { key: "0-1 years", value: "0-1 years" },
                          { key: "1-3 years", value: "1-3 years" },
                          { key: "3-5 years", value: "3-5 years" },
                          { key: "5+ years", value: "5+ years" }]}
                        />

                        {/* Education */}
                        <Field
                          name="education"
                          component={TextField}
                          oldValue={education}
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
                          oldValue={nationality}
                          label="Nationality"
                          heightInput="h-12"
                          options={[{ key: "Select...", value: "" },
                          { key: "Vietnam", value: "VietNam" },
                          { key: "USA", value: "USA" }]}
                        />

                        {/* Date Of Birth */}
                        <Field
                          name="dateOfBirth"
                          component={DateField}
                          oldValue={dateOfBirth}
                          label="Date of Birth"
                          placeholder="mm/dd/yyyy"
                          heightInput="h-12"
                        />

                        {/* Gender */}
                        <Field
                          name="gender"
                          component={SelectField}
                          oldValue={gender}
                          label="Gender"
                          heightInput="h-12"
                          options={[{ key: "Select...", value: "" },
                          { key: "Male", value: 0 },
                          { key: "Female", value: 1 }]}
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
                          name="address"
                          component={TextField}
                          oldValue={address}
                          placeholder="Enter location"
                          heightInput="h-12"
                          label="Map Location"
                        />
                      </div>

                      {/* Phone */}
                      <Field
                        name="phoneNumber"
                        component={IconTextField}
                        oldValue={phoneNumber}
                        label="Phone"
                        placeholder="Phone number..."
                        imageName="phone.svg"
                        type="text"
                        heightInput="h-12"
                      />

                      {/* Email */}
                      <Field
                        name="workEmail"
                        component={IconTextField}
                        oldValue={workEmail}
                        label="Email"
                        placeholder="Email Address"
                        imageName="Email.svg"
                        type="email"
                        heightInput="h-12"
                      />

                      {/* Biography */}
                      <Field
                        name="biography"
                        component={RichTextField}
                        oldValue={biography}
                        label="Biography"
                        placeholder="Tell us something about yourself"
                        rows="6"
                      />
                    </div>

                    <div>
                      <div className="text-lg font-medium mb-3">Your Cv/Resume</div>
                      {/* Resume */}
                      <Field
                        name="resume"
                        component={ResumeField}
                        placeholder="Browse file or drop here. only pdf"
                        oldFile={oldResume}
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
                </Form>
              )
            }}
          </Formik>
        </div>
      )}
      {isOpenDialog && (
        <PopupDialog
          isOpen={isOpenDialog}
          handleClose={handleCloseDialog}
          content={dialogContent}
        />
      )}
    </div>
  );
};

export default Settings;

