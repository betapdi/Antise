import React from "react";
import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CompanyContext } from "../../../../../context/CompanyContext";
import TextField from "../../../../../customFields/TextField";
import SelectField from "../../../../../customFields/SelectField";
import DateField from "../../../../../customFields/DateField";
import IconTextField from "../../../../../customFields/IconTextField";
import RichTextField from "../../../../../customFields/RichTextField";
import ResumeField from "../../../../../customFields/ResumeField";
import ImageField from "../../../../../customFields/ImageField";
import companyApi from "../../../../../api/companyApi.js";

function Settings() {
  const {
    companyName,
    setCompanyName,
    logoUrl,
    setLogoUrl,
    bannerUrl,
    setBannerUrl,
    description,
    setDescription,
    benefit,
    setBenefit,
    location,
    setLocation,
    organizationType,
    setOrganizationType,
    companyUrl,
    setCompanyUrl,
    jobList,
    setJobList,
    verified,
    setVerified,
    companyEmail,
    setCompanyEmail,
    companyPhoneNumber,
    setCompanyPhoneNumber,
    yearOfEstablishment,
    setYearOfEstablishment,
    savedApplicants,
    setSavedApplicants,
  } = useContext(CompanyContext);
  const handleSaveChange = async (values) => {
        console.log(values);
    try {
        const response = await companyApi.editCompany(values);
        const company = response.data;
        setCompanyName(company.name);
        setLogoUrl(company.logoUrl);
        setBannerUrl(company.bannerUrl);
        setDescription(company.description);
        setBenefit(company.benefit);
        setLocation(company.location);
        setOrganizationType(company.organizationType);
        setCompanyUrl(company.companyUrl);
        setJobList(company.jobList);
        setVerified(company.verified);
        setCompanyEmail(company.companyEmail);
        setCompanyPhoneNumber(company.companyPhoneNumber);
        setYearOfEstablishment((company.yearOfEstablishment != null) ? (company.yearOfEstablishment).substring(0, 10) : null);
        setSavedApplicants(company.savedApplicants);

        //Update context and show popup
        console.log(company);
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <div className="w-full flex-col justify-start items-start gap-4 flex">
        <h1 className="text-[#18191c] text-2xl font-medium leading-loose font-inter">
          Settings
        </h1>
        <Formik
          initialValues={{
            logoUrl: null,
            bannerUrl: null,
            companyName: "",
            description: "",
            organizationType: "",
            yearOfEstablishment: "",
            companyUrl: "",
            location: "",
            companyPhoneNumber: "",
            companyEmail: "",
          }}
          validationSchema={Yup.object({
            logoUrl: Yup.mixed().required(
              "Please import your company's logo image"
            ),

            bannerUrl: Yup.mixed().required(
              "Please import your company's banner image"
            ),

            companyName: Yup.string().required(
              "Please enter your company name"
            ),
            description: Yup.string().required(
              "Please enter your company description"
            ),
            organizationType: Yup.string().required(
              "Please enter your company organization type"
            ),
            yearOfEstablishment: Yup.string().required(
              "Please enter your company year of establishment"
            ),
            companyUrl: Yup.string().required(
              "Please enter your company website"
            ),
            location: Yup.string().required(
              "Please enter your company location"
            ),
            companyPhoneNumber: Yup.string().required(
              "Please enter your company phone number"
            ),
            companyEmail: Yup.string().required(
              "Please enter your company email"
            ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handleSaveChange(values);
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => {
            console.log({
              values,
              errors,
              touched,
              handleSubmit,
              isSubmitting,
            });
            return (
              <Form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-4"
              >
                {/* Basic Information */}
                <h2 className="text-[#18191c] text-lg font-medium leading-7">
                  Logo & Banner Image
                </h2>
                <div className="w-full flex flex-row justify-between items-center gap-2">
                  <Field
                    name="logoUrl"
                    component={ImageField}
                    oldValue = {logoUrl}
                    label="Logo"
                    width="w-1/3"
                    placeholder="A photo larger than 400 pixels work best. Max photo size 5 MB"
                  />

                  <Field
                    name="bannerUrl"
                    component={ImageField}
                    oldValue = {bannerUrl}
                    label="Banner Image"
                    width="w-2/3"
                    placeholder="Banner images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
                  />
                </div>
                <Field
                  name="companyName"
                  component={TextField}
                  oldValue = {companyName}
                  label="Company name"
                  width="w-1/3"
                />
                <Field
                  name="description"
                  component={RichTextField}
                  label="About Us"
                  oldValue={description}
                  width="w-1/3"
                  placeholder="Write down about your company here. Let the candidate know who we are..."
                />
                <div className="w-full flex flex-row items-center justify-between">
                  <Field
                    name="organizationType"
                    component={SelectField}
                    label="Organization Type"
                    oldValue = {organizationType}
                    options={[
                      { key: "Select...", value: "" },
                      { key: "LLC", value: "LLC" },
                      { key: "Corporation", value: "Corporation" },
                      { key: "Non Profit", value: "NonProfit" },
                    ]}
                    width="w-1/3"
                  />
                  <Field
                    name="yearOfEstablishment"
                    component={DateField}
                    oldValue = {yearOfEstablishment}
                    label="Year of Establishment"
                    width="w-1/3"
                  />
                  <Field
                    name="companyUrl"
                    component={IconTextField}
                    oldValue = {companyUrl}
                    label="Company Website"
                    width="w-1/3"
                    placeholder="Website url..."
                    imageName="link.svg"
                  />
                </div>
                <h2 className="text-[#18191c] text-lg font-medium leading-7">
                  Contact Information
                </h2>
                <Field
                  name="location"
                  component={TextField}
                  oldValue = {location}
                  label="Location"
                  width="w-1/3"
                />
                <Field
                  name="companyPhoneNumber"
                  component={IconTextField}
                  label="Phone"
                  oldValue = {companyPhoneNumber}
                  placeholder="Phone number..."
                  imageName="phone.svg"
                  type="number"
                />
                <Field
                  name="companyEmail"
                  component={IconTextField}
                  label="Email"
                  oldValue = {companyEmail}
                  placeholder="Email Address"
                  imageName="Email.svg"
                  type="email"
                />
                <div className="flex justify-end w-full mt-9">
                  <button
                    type="submit"
                    className="h-14 px-4 py-2 bg-[#0a65cc]  justify-center items-center gap-3 inline-flex"
                    disabled={isSubmitting}
                  >
                    <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                    Save Change
                    </div>
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Settings;
