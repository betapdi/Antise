import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import jobApi from "../../../../api/jobApi";
import TextField from "../../../../customFields/TextField";
import RichTextField from "../../../../customFields/RichTextField";
import SelectField from "../../../../customFields/SelectField";
import DateField from "../../../../customFields/DateField";
import IconTextField from "../../../../customFields/IconTextField";
import ImageField from "../../../../customFields/ImageField";

function AddCompany() {
  const navigate = useNavigate();
  const handleClickSubmit = async (values) => {
    console.log(values)
    // navigate("/company/SucessCompanyUpload");
  };

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
            companyName: "",
            aboutUs: "",
            organizationType: "",
            yearOfEstablishment: "",
            companyWebsite: "",
            mapLocation: "",
            phone: "",
            email: "",
          }}
          validationSchema={Yup.object({
            logoImage: Yup.mixed()
              .required("Please import your company's logo image")
              .test("is-valid-size", "Max allowed size is 5 MB", value => value && value.size <= 1024),

            bannerImage: Yup.mixed()
              .required("Please import your company's banner image")
              .test("is-valid-size", "Max allowed size is 5 MB", value => value && value.size <= 5 * 1024 * 1024),
            
            companyName: Yup.string().required(
              "Please fill your company's name"
            ),
            aboutUs: Yup.string().required(
              "Please fill in this field. If not, fill N/A"
            ),
            organizationType: Yup.string().required(
              "Please select an organization type"
            ),
            yearOfEstablishment: Yup.string().required(
              "Please enter a valid year"
            ),
            companyWebsite: Yup.string()
              .url("Invalid website URL")
              .required("Please provide the company website"),
            mapLocation: Yup.string().required("Please provide a map location"),
            phone: Yup.string().required("Please provide a phone number"),
            email: Yup.string()
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
            {/* console.log(values); */}
            return (
                <Form className="w-full space-y-6">
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <span className="text-[#18191c] self-start text-lg font-medium font-['Inter'] leading-7 inline-block">
                        Logo & Banner Image
                        </span>
                        <div className="w-full flex flex-row justify-between items-center gap-2">
                            <Field
                                name = "logoImage"
                                component = {ImageField}
                                label = "Logo"
                                width = "w-1/3"
                                placeholder = "A photo larger than 400 pixels work best. Max photo size 5 MB"
                            />

                            <Field
                                name = "bannerImage"
                                component = {ImageField}
                                label = "Banner Image"
                                width = "w-2/3"
                                placeholder = "Banner images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
                            />
                        </div>
                    </div>
                    <Field
                      name = "companyName"
                      component = {TextField}
                      label = "Company Name"
                      placeholder = "Company Name..."
                    />

                    <Field
                      name = "aboutUs"
                      component = {RichTextField}
                      label = "About Us"
                      placeholder="Write down about your company here. Let the candidate know who we are..."
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        name = "organizationType"
                        component = {SelectField}
                        label = "Organization Type"
                        options = {[{key: "Select...", value: ""},
                                  {key: "LLC", value: "LLC"},
                                  {key: "Corporation", value: "Corporation"},
                                  {key: "Non Profit", value: "NonProfit"}]}
                      />

                      <Field
                        name = "yearOfEstablishment"
                        component = {DateField}
                        label = "Year of Establishment"
                        placeholder="mm/dd/yyyy"
                      />
                    </div>

                    <Field
                        name = "companyWebsite"
                        component = {IconTextField}
                        label = "Company Website"
                        placeholder="Website url..."
                        imageName = "link.svg"
                    />

                    <Field
                      name = "mapLocation"
                      component = {TextField}
                      label = "Map Location"
                      placeholder = "Location..."
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Field
                            name = "phone"
                            component = {IconTextField}
                            label = "Phone"
                            placeholder="Phone number..."
                            imageName = "phone.svg"
                            type = "number"
                        />

                        <Field
                            name = "email"
                            component = {IconTextField}
                            label = "Email"
                            placeholder="Email Address"
                            imageName = "Email.svg"
                            type = "email"
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
                        <img
                        src={`/image/arrow_right_hover.png`}
                        alt="icon"
                        />
                    </button>
                    </div>
                </Form>
            )}}
        </Formik>
      </div>
    </div>
  );
}

export default AddCompany;
