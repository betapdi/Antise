import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import jobApi from "../../../../api/jobApi";
import FileChooser from "../../../../customFields/FileChooser";

function AddCompany() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const name = document.querySelector('input[name="companyname"]').value;
    const description = document.querySelector(
      'textarea[name="aboutus"]'
    ).value;

    const rawData = {
      name,
      description,
    };
    console.log(rawData);

    const value = await jobApi.createCompany(rawData);
    console.log(value);
    navigate("/company/SucessCompanyUpload");
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
            companyname: "",
            aboutus: "",
            organizationType: "",
            yearOfEstablishment: "",
            companyWebsite: "",
            mapLocation: "",
            phone: "",
            email: "",
          }}
          validationSchema={Yup.object({
            companyname: Yup.string().required(
              "Please fill your company's name"
            ),
            aboutus: Yup.string().required(
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
            console.log(values);
            setSubmitting(false);
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
                                type = "file"
                                component = {FileChooser}
                                label = "Logo"
                                width = "w-1/3"
                                placeholder = "A photo larger than 400 pixels work best. Max photo size 5 MB"
                            />

                            <Field
                                name = "bannerImage"
                                type = "file"
                                component = {FileChooser}
                                label = "Banner Image"
                                width = "w-2/3"
                                placeholder = "Banner images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                        htmlFor="companyname"
                        className="text-sm font-medium text-[#18191c]"
                        >
                        Company Name
                        </label>
                        <Field
                        id="companyname"
                        name="companyname"
                        type="text"
                        className="block w-full border border-gray/100 rounded p-1"
                        />
                        <ErrorMessage
                        name="companyname"
                        component="div"
                        className="text-red text-sm mt-1"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                        htmlFor="aboutus"
                        className="text-sm font-medium text-[#18191c]"
                        >
                        About Us
                        </label>
                        <Field
                        as="textarea"
                        id="aboutus"
                        name="aboutus"
                        placeholder="Write down about your company here. Let the candidate know who we are..."
                        className="block w-full border border-gray/100 rounded p-1"
                        rows="4"
                        />
                        <ErrorMessage
                        name="aboutus"
                        component="div"
                        className="text-red text-sm mt-1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                        <label
                            htmlFor="organizationType"
                            className="text-sm font-medium text-[#18191c]"
                        >
                            Organization Type
                        </label>
                        <Field
                            as="select"
                            id="organizationType"
                            name="organizationType"
                            className="block w-full border border-gray/100 rounded p-1"
                        >
                            <option value="">Select...</option>
                            <option value="LLC">LLC</option>
                            <option value="Corporation">Corporation</option>
                            <option value="Nonprofit">Nonprofit</option>
                        </Field>
                        <ErrorMessage
                            name="organizationType"
                            component="div"
                            className="text-red text-sm mt-1"
                        />
                        </div>

                        <div className="flex flex-col gap-2">
                        <label
                            htmlFor="yearOfEstablishment"
                            className="text-sm font-medium text-[#18191c]"
                        >
                            Year of Establishment
                        </label>
                        <Field
                            id="yearOfEstablishment"
                            name="yearOfEstablishment"
                            type="date"
                            placeholder="mm/dd/yyyy"
                            className="block w-full border border-gray/100 rounded p-1"
                        />
                        <ErrorMessage
                            name="yearOfEstablishment"
                            component="div"
                            className="text-red text-sm mt-1"
                        />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                        htmlFor="companyWebsite"
                        className="text-sm font-medium text-[#18191c]"
                        >
                        Company Website
                        </label>
                        <div className="relative">
                        <Field
                            id="companyWebsite"
                            name="companyWebsite"
                            type="text"
                            placeholder="Website url..."
                            className="block w-full border border-gray/100 rounded pl-10 p-1"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pr-1">
                            <img
                            src={require(`../../../../image/link.svg`).default}
                            alt="icon"
                            />
                        </div>
                        </div>
                        <ErrorMessage
                        name="companyWebsite"
                        component="div"
                        className="text-red text-sm mt-1"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                        htmlFor="mapLocation"
                        className="text-sm font-medium text-[#18191c]"
                        >
                        Map Location
                        </label>
                        <Field
                        id="mapLocation"
                        name="mapLocation"
                        type="text"
                        className="block w-full border border-gray/100 rounded p-1"
                        />
                        <ErrorMessage
                        name="mapLocation"
                        component="div"
                        className="text-red text-sm mt-1"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                        <label
                            htmlFor="phone"
                            className="text-sm font-medium text-[#18191c]"
                        >
                            Phone
                        </label>
                        <div className="relative">
                            <Field
                            id="phone"
                            name="phone"
                            type="number"
                            placeholder="Phone number.."
                            className="block w-full border border-gray/100 rounded pl-10 p-1 "
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pr-1">
                            <img
                                src={require(`../../../../image/phone.svg`).default}
                                alt="icon"
                            />
                            </div>
                        </div>
                        <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red text-sm mt-1"
                        />
                        </div>

                        <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-[#18191c]"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <Field
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            className="block w-full border border-gray/100 rounded pl-10 p-1" // Add padding to the left to make space for the icon
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pr-1">
                            <img
                                src={require(`../../../../image/Email.svg`).default}
                                alt="icon"
                            />
                            </div>
                        </div>
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red text-sm mt-1"
                        />
                        </div>
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
                        src={require(`../../../../image/arrow_right_hover.png`)}
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
