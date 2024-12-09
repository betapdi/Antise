import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ApplyForm = ({isCloseChange}) => {
  return (
    <div className="w-full mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-[#18191c] mb-3 text-lg font-medium font-['Inter'] leading-7">Apply Job: Senior UX Designer</h1>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          email: "",
          resume: "",
          coverLetter: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().required("Please fill your full name"),
          phoneNumber: Yup.string().required("Please fill your telephone number"),
          email: Yup.string().email("Invalid email").required("Please fill your email"),
          resume: Yup.string().required("Please upload your CV"),
          coverLetter: Yup.string().required("Please fill the cover letter. If not, fill N/A"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Full Name
              </label>
              <Field
                id="fullName"
                name="fullName"
                type="text"
                className="block w-full border border-gray/100 rounded px-3 py-2"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Telephone Number
              </label>
              <Field
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                className="block w-full border border-gray/100 rounded px-3 py-2"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="block w-full border border-gray/100 rounded px-3 py-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="resume" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Choose Resume
              </label>
              <Field
                as="select"
                id="resume"
                name="resume"
                className="block w-full border border-gray/100 rounded px-3 py-2"
              >
                <option value="">Select...</option>
                <option value="resume1">Resume 1</option>
              </Field>
              <ErrorMessage
                name="resume"
                component="div"
                className="text-red text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="coverLetter" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                Cover Letter
              </label>
              <Field
                as="textarea"
                id="coverLetter"
                name="coverLetter"
                placeholder="Write down your biography here..."
                className="block w-full border border-gray/100 rounded px-3 py-2"
                rows="4"
              />
              <ErrorMessage
                name="coverLetter"
                component="div"
                className="text-red text-sm mt-1"
              />
            </div>

            <div className="flex flex-row justify-between">
                <button className="h-12 px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 inline-flex"
                     onClick={() => isCloseChange(true)}
                >
                    <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">Cancel</div>
                </button>
                <div className="h-12 px-6 py-3 bg-[#0a65cc] rounded-[3px] justify-center items-center gap-3 inline-flex">
                    <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">Apply Now</div>
                    <img 
                        src={"/image/arrow_right_hover.png"} 
                        alt="arrow_right" 
                        className="h-4"
                    />
                </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ApplyForm;
