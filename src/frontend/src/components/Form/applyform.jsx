import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import TextField from "../../customFields/TextField";
import SelectField from "../../customFields/SelectField";
import RichTextField from "../../customFields/RichTextField";
import PopupDialog from "./PopupDialog";

const ApplyForm = ({ isCloseChange, job }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: null, content: null, buttonLabel: null, link: null });

  useEffect(() => {
    console.log("Dialog open:", isOpenDialog);
  }, [isOpenDialog]); // Logs when isOpenDialog changes

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
    isCloseChange(true);
  }

  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  const handleClickSubmit = async (values) => {
    try {
      setDialogContent({
        title: "Submit Form Successfully",
        content: "Your form has been submitted!",
        buttonLabel: "Close",
        link: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setDialogContent({
        title: "Error",
        content: "There was an error submitting your form. Please try again later!",
        buttonLabel: "Close",
        link: null,
      });
    }
    setIsOpenDialog(true);
  };


  return (
    <div className="w-full mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-[#18191c] mb-3 text-lg font-medium font-['Inter'] leading-7">{job.title}</h1>
      <div>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          email: "",
          resume: "",
          coverLetter: "",
          questions: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().required("Please fill your full name"),
          phoneNumber: Yup.string().matches(phoneRegExp, "Please enter a valid phone number").required("Please fill your telephone number"),
          email: Yup.string().email("Invalid email").required("Please fill your email"),
          resume: Yup.string().required("Please upload your CV"),
          coverLetter: Yup.string().required("Please fill the cover letter. If not, fill N/A"),
          ...(job?.questions && {
            questions: Yup.string().required("Please answer the questions"),
          }),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            handleClickSubmit(values);
            //isCloseChange(true);
          }, 400);
        }}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => {
          console.log("Formik errors:", errors);
          return (
            <Form className="space-y-4">
              <Field
                label="Full Name"
                name="fullName"
                component={TextField}
                placeholder="Company Name"
              />

              <Field
                label="Telephone Number"
                name="phoneNumber"
                component={TextField}
                placeholder="Telephone number"
              />

              <Field
                label="Email"
                name="email"
                component={TextField}
                placeholder="Email"
              />

              <Field
                name="resume"
                component={SelectField}
                label="Resume"
                options={[{ key: "Select...", value: "" },
                { key: "Resume 1", value: "Resume 1" },
                { key: "Resume 2", value: "Resume 2" }]}
              />

              <Field
                label="Cover Letter"
                name="coverLetter"
                component={RichTextField}
                placeholder="Cover Letter"
              />

              {job?.questions && (
                <div className="mt-4 ">
                  <h3 className="text-sm font-medium text-[#18191c]"> Questions</h3>
                  <div className="mb-2">
                    {job.responsibility.split('\n').map((line, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-sm font-small text-[#18191c] px-1">•</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  <Field
                    name="questions"
                    component={RichTextField}
                    placeholder="Questions"
                  />
                </div>
              )}
              <div className="flex flex-row justify-between">
                <button className="h-12 px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 inline-flex"
                  onClick={() => isCloseChange(true)}
                >
                  <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">Cancel</div>
                </button>
                <button
                  type="submit"
                  className="h-12 px-6 py-3 bg-[#0a65cc] rounded-[3px] justify-center items-center gap-3 inline-flex cursor-pointer"
                >
                  <div className="text-white text-base font-semibold font-['Inter'] capitalize leading-normal">Apply Now</div>
                  <img
                    src={"/image/arrow_right_hover.png"}
                    alt="arrow_right"
                    className="h-4"
                  />
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
      </div>
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

export default ApplyForm;
