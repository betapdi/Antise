import React from "react";
import { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import jobApi from "../../../../../api/jobApi";
import TextField from "../../../../../customFields/TextField";
import SelectField from "../../../../../customFields/SelectField";
import DateField from "../../../../../customFields/DateField";
import IconTextField from "../../../../../customFields/IconTextField";
import RichTextField from "../../../../../customFields/RichTextField";
import ResumeField from "../../../../../customFields/ResumeField";
import ImageField from "../../../../../customFields/ImageField";
import PopupDialog from '../../../components/PopupDialog.js';
import {CompanyContext} from '../../../../../context/CompanyContext';
const PostJob = () => {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: null, content: null, buttonLabel: null, link: null });
  const {setJobList} = useContext(CompanyContext);
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };
  const handleSaveChange = async (values) => {
    try {
      const response = await jobApi.createJob(values);
      const job = response.data;
      setJobList((prev) => [job, ...prev]);
      setDialogContent({
        title: "Success Posting Job!",
        content: "Your job has been posted successfully. You can view it in the job list.",
        buttonLabel: "View job list",
        link: "/company/dashboard/my-job",
      });
      setIsOpenDialog(true);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full  max-w-screen-xl">
        <Formik
          initialValues={{
            title: "",
            minSalary: "",
            maxSalary: "",
            education: "",
            experience: "",
            jobType: "",
            location: "",
            expirationDate: "",
            description: "",
            responsibility: "",
            question: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Job Title is required"),
            minSalary: Yup.number().required("Minimum salary is required"),
            maxSalary: Yup.number()
              .required("Maximum salary is required")
              .moreThan(
                Yup.ref("minSalary"),
                "Max salary must be greater than min salary"
              ),
            education: Yup.string().required("Education level is required"),
            experience: Yup.string().required("Experience is required"),
            jobType: Yup.string().required("Job Type is required"),
            location: Yup.string().required("Location is required"),
            expirationDate: Yup.date().required("Expiration date is required"),
            description: Yup.string().required("Description is required"),
            responsibility: Yup.string().required(
              "Responsibilities are required"
            ),
            question: Yup.string(),
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
            return (
              <Form onSubmit={handleSubmit} className="space-y-4 w-full mb-9">
                <h1 className="w-full text-[#18191c] text-2xl font-medium font-inter leading-loose">
                  Post a job
                </h1>
                <div className="flex flex-col gap-2 w-full">
                  <Field
                    name="title"
                    label="Title"
                    component={TextField}
                    placeholder="Enter your job title"
                  />

                  {/* Salary */}
                  <h2 className="text-[#18191c] text-lg font-medium font-inter leading-loose">
                    Salary
                  </h2>
                  <div className="flex flex-row gap-10">
                    <Field
                      name="minSalary"
                      label="Min Salary (Dollar)"
                      component={TextField}
                      type="number"
                      placeholder="Minimum salary"
                    />
                    <Field
                      name="maxSalary"
                      label="Max Salary (Dollar)"
                      component={TextField}
                      type="number"
                      placeholder="Maximum salary"
                    />
                  </div>
                  <h2 className="text-[#18191c] text-lg font-medium font-inter leading-loose">
                    Advanced Infomation
                  </h2>
                  <div className="grid-cols-3 grid gap-4">
                    <Field
                      name="education"
                      component={SelectField}
                      label="Education"
                      options={[
                        { key: "Select...", value: "" },
                        { key: "High School", value: "HighSchool" },
                        { key: "Intermediate", value: "Intermediate" },
                        { key: "Graduation", value: "Graduation" },
                        { key: "Bachelor Degree", value: "Bachelor Degree" },
                        { key: "Master Degree", value: "Master Degree" },
                      ]}
                    />
                    <Field
                      name="experience"
                      component={SelectField}
                      label="Experience"
                      options={[
                        { key: "Select...", value: "" },
                        { key: "Freshers", value: "Freshers" },
                        { key: "1 - 2 Years", value: "1 - 2 Years" },
                        { key: "2 - 4 Years", value: "2 - 4 Years" },
                        { key: "4 - 6 Years", value: "4 - 6 Years" },
                        { key: "6 - 8 Years", value: "6 - 8 Years" },
                        { key: "8 - 10 Years", value: "8 - 10 Years" },
                        { key: "10 - 15 Years", value: "10 - 15 Years" },
                        { key: "15+ Years", value: "15+ Years" },
                      ]}
                    />
                    <Field
                      name="jobType"
                      component={SelectField}
                      label="Job Type"
                      options={[
                        { key: "Select...", value: "" },
                        { key: "Full Time", value: "Full Time" },
                        { key: "Part Time", value: "Part Time" },
                        { key: "Internship", value: "Internship" },
                        { key: "Remote", value: "Remote" },
                        { key: "Temporary", value: "Temporary" },
                        { key: "Contract Base", value: "Contract Base" },
                      ]}
                    />
                  </div>

                  <Field
                    label="Location"
                    name="location"
                    component={TextField}
                    placeholder="location"
                  />

                  <Field
                    label="Expiration Date"
                    name="expirationDate"
                    component={DateField}
                  />
                  <h2 className="text-[#18191c] text-lg font-medium font-inter leading-loose">
                    Description & Responsibility
                  </h2>

                  <Field
                    label="Description"
                    name="description"
                    placeholder="Add your job description..."
                    component={RichTextField}
                  />

                  <Field
                    label="Responsibilities"
                    name="responsibility"
                    placeholder="Add your job responsibilities..."
                    component={RichTextField}
                  />

                  <Field
                    label="Questions (Optional)"
                    name="questions"
                    placeholder="Add your entrance question..."
                    component={RichTextField}
                  />

                  <div className="flex justify-end mt-12">
                    <button
                      type="submit"
                      className="h-14 px-8 py-4 bg-[#0a65cc] rounded justify-center items-center gap-3 inline-flex text-white text-base font-semibold font-['Inter'] capitalize leading-normal"
                      disabled={isSubmitting}
                    >
                      Post Job
                      <img src={`/image/arrow_right_hover.png`} alt="icon" />
                    </button>
                  </div>
                </div>
              </Form>
            );
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

export default PostJob;
