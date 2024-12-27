import React from "react";
import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import TextField from "../../../../customFields/TextField";
import RichTextField from "../../../../customFields/RichTextField";
import SelectField from "../../../../customFields/SelectField";
import DateField from "../../../../customFields/DateField";
import IconTextField from "../../../../customFields/IconTextField";
import ImageField from "../../../../customFields/ImageField";
import companyApi from "../../../../api/companyApi.js";
import {CompanyContext} from '../../../../context/CompanyContext';

function AddCompany() {
  const navigate = useNavigate();
  const {
      companyName, setCompanyName, logoUrl, setLogoUrl, bannerUrl, setBannerUrl,
      description, setDescription, benefit, setBenefit,
      location, setLocation, organizationType, setOrganizationType,
      companyUrl, setCompanyUrl, jobList, setJobList, verified, setVerified,
      companyEmail, setCompanyEmail, companyPhoneNumber, setCompanyPhoneNumber,
      yearOfEstablishment, setYearOfEstablishment, savedApplicants, setSavedApplicants, 
      size, setSize, industry, setIndustry, resetCompany
    } = useContext(CompanyContext);
  const handleClickSubmit = async (values) => {
    console.log(values);

    try {
      const response = await companyApi.editCompany(values);
      const company = response.data;
      console.log(company);
      setCompanyName(company.name);
      setLogoUrl(company.logoUrl);
      setBannerUrl(company.bannerUrl);
      setDescription(company.description);
      setBenefit(company.benefit);
      setLocation(company.location);
      setOrganizationType(company.organizationType);
      setCompanyUrl(company.companyUrl);
      setJobList(company.jobList);
      setVerified(false);
      setCompanyEmail(company.companyEmail);
      setCompanyPhoneNumber(company.companyPhoneNumber);
      setYearOfEstablishment((company.yearOfEstablishment != null) ? (company.yearOfEstablishment).substring(0, 10) : null);
      setIndustry(company.industry);
      setSize(company.size);
      navigate("/company/dashboard", { replace: true });
      
    } catch (error) {
      console.log(error);
    }
  };

  Yup.addMethod(Yup.mixed, "fileSize", function (maxSize, message) {
    return this.test("fileSize", message, function (value) {
      const { path, createError } = this;
      if (value && value.size > maxSize) {
        return createError({ path, message });
      }

      return true;
    });
  });

  return (
    <div className="w-full flex justify-center">
      <div className="w-3/4 flex flex-col justify-center items-center gap-3">
        <span className="mt-4 mb-4 text-[#0a65cc] text-[3rem] font-semibold font-['Inter'] leading-tight underline decoration-2 decoration-[#0a65cc]">
          Company Info
        </span>
        <Formik
          initialValues={{
            bannerImage: null,
            logoImage: null,
            name: "",
            description: "",
            organizationType: "",
            yearOfEstablishment: "",
            companyUrl: "",
            location: "",
            companyPhoneNumber: "",
            companyEmail: "",
            industry: "",
            size: "",
          }}
          validationSchema={Yup.object({
            logoImage: Yup.mixed()
              .required("Please import your company's logo image")
              .fileSize(
                5 * 1024 * 1024,
                "File size must be less than or equal to 5MB"
              ),

            bannerImage: Yup.mixed()
              .required("Please import your company's banner image")
              .fileSize(
                5 * 1024 * 1024,
                "File size must be less than or equal to 5MB"
              ),

            name: Yup.string().required("Please fill your company's name"),
            description: Yup.string().required(
              "Please fill in this field. If not, fill N/A"
            ),
            organizationType: Yup.string().required(
              "Please select an organization type"
            ),
            yearOfEstablishment: Yup.string().required(
              "Please enter a valid year"
            ),
            industry: Yup.string().required(
              "Please provide your company's industry type"
            ),

            size: Yup.string().required(
              "Please select your company size"
            ),
            companyUrl: Yup.string()
              .url("Invalid website URL")
              .required("Please provide the company website"),
            location: Yup.string().required("Please provide a map location"),
            companyPhoneNumber: Yup.string().required(
              "Please provide a phone number"
            ),
            companyEmail: Yup.string()
              .email("Invalid email format")
              .required("Please provide an email"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              handleClickSubmit(values);
            }, 400);
          }}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => {
            return (
              <Form className="w-full space-y-6">
                <div className="w-full flex flex-col justify-center items-center gap-4">
                  <span className="text-[#18191c] self-start text-lg font-medium font-['Inter'] leading-7 inline-block">
                    Logo & Banner Image
                  </span>
                  <div className="w-full flex flex-row justify-between items-center gap-2">
                    <Field
                      name="logoImage"
                      component={ImageField}
                      label="Logo"
                      width="w-1/3"
                      placeholder="A photo larger than 400 pixels work best. Max photo size 5 MB"
                    />

                    <Field
                      name="bannerImage"
                      component={ImageField}
                      label="Banner Image"
                      width="w-2/3"
                      placeholder="Banner images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
                    />
                  </div>
                </div>
                <Field
                  name="name"
                  component={TextField}
                  label="Company Name"
                  placeholder="Company Name..."
                />

                <Field
                  name="description"
                  component={RichTextField}
                  label="About Us"
                  placeholder="Write down about your company here. Let the candidate know who we are..."
                />

                <div className="grid grid-cols-2 gap-4">
                  <Field
                    name="organizationType"
                    component={SelectField}
                    label="Organization Type"
                    options={[
                      { key: "Select...", value: "" },
                      { key: "LLC", value: "LLC" },
                      { key: "Corporation", value: "Corporation" },
                      { key: "Non Profit", value: "NonProfit" },
                    ]}
                  />

                  <Field
                    name="yearOfEstablishment"
                    component={DateField}
                    label="Year of Establishment"
                    placeholder="mm/dd/yyyy"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field
                    name="industry"
                    component={TextField}
                    label="Industry Type"
                    placeholder="Industry..."
                  />

                  <Field
                    name="size"
                    component={SelectField}
                    label="Company Size"
                    options={[
                      { key: "Select...", value: "" },
                      { key: "<100 employees", value: "<100" },
                      { key: "100-300 employees", value: "100-300" },
                      { key: "300-500 employees", value: "300-500" },
                      { key: "500-700 employees", value: "500-700" },
                      { key: "700-1000 employees", value: "700-1000" },
                      { key: ">1000 employees", value: ">1000" },
                    ]}
                  />
                </div>

                <Field
                  name="companyUrl"
                  component={IconTextField}
                  label="Company Website"
                  placeholder="Website url..."
                  imageName="link.svg"
                />

                <Field
                  name="location"
                  component={TextField}
                  label="Map Location"
                  placeholder="Location..."
                />

                <div className="grid grid-cols-2 gap-4">
                  <Field
                    name="companyPhoneNumber"
                    component={IconTextField}
                    label="Phone"
                    placeholder="Phone number..."
                    imageName="phone.svg"
                    type="number"
                  />

                  <Field
                    name="companyEmail"
                    component={IconTextField}
                    label="Email"
                    placeholder="Email Address"
                    imageName="Email.svg"
                    type="email"
                  />
                </div>

                <div className="flex justify-end w-full mt-9">
                  <button
                    type="submit"
                    className="h-14 px-4 py-2 bg-[#0a65cc]  justify-center items-center gap-3 inline-flex"
                  >
                    <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                      Save & Next
                    </div>
                    <img src={`/image/arrow_right_hover.png`} alt="icon" />
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

export default AddCompany;
