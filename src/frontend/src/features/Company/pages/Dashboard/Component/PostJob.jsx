import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import jobApi from '../../../../../api/jobApi';

const PostJob = () => {
  const navigate = useNavigate();
  const handleClick = async() =>{
      const title = document.querySelector('input[name="jobTitle"]').value;
      const description = document.querySelector('textarea[name="description"]').value;
      const responsibility = document.querySelector('textarea[name="responsibilities"]').value;
  
      const rawData = {
          title, description, responsibility
      }
      console.log(rawData);
      const value = await jobApi.createJob(rawData);
      console.log(value);
      navigate("/company/postjobsuccess");
  }
  return (
    <div className="w-full flex justify-center items-center">
        <div className="w-full  max-w-screen-xl">
            <Formik
                initialValues={{
                    jobTitle: "",
                    minSalary: "",
                    maxSalary: "",
                    education: "",
                    experience: "",
                    jobType: "",
                    location: "",
                    expirationDate: "",
                    description: "",
                    responsibilities: "",
                }}
                validationSchema={Yup.object({
                    jobTitle: Yup.string().required("Job Title is required"),
                    minSalary: Yup.number().required("Minimum salary is required"),
                    maxSalary: Yup.number()
                    .required("Maximum salary is required")
                    .moreThan(Yup.ref("minSalary"), "Max salary must be greater than min salary"),
                    education: Yup.string().required("Education level is required"),
                    experience: Yup.string().required("Experience is required"),
                    jobType: Yup.string().required("Job Type is required"),
                    location: Yup.string().required("Location is required"),
                    expirationDate: Yup.date().required("Expiration date is required"),
                    description: Yup.string().required("Description is required"),
                    responsibilities: Yup.string().required("Responsibilities are required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                setSubmitting(false);
                }}
            >
                {() => (
                <Form className="space-y-4 w-full mb-9">
                    <h1 className="w-full text-[#18191c] text-2xl font-medium font-inter leading-loose">Post a job</h1>
                    <div>
                        <h2 className="text-[#18191c] text-lg font-medium font-inter leading-loose">Title</h2>
                        <label htmlFor="fullName" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                        Job title
                        </label>
                        <Field
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        placeholder="Add job tittle, role, vacancies etc"
                        className="block w-full border border-gray/100 rounded px-3 py-2"
                        />
                        <ErrorMessage
                        name="jobTitle"
                        component="div"
                        className="text-red text-sm mt-1"
                        />
                    </div>
                    {/* Salary */}
                    <h2 className="text-[#18191c] text-lg font-medium font-inter leading-loose">Salary</h2>
                    <div className="flex flex-row gap-10">
                        <div>
                        <label htmlFor="minSalary" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                            Minimum
                        </label>
                        <Field
                            id="minSalary"
                            name="minSalary"
                            type="number"
                            placeholder="Minimum salary"
                            className="block w-full border border-gray/100 rounded px-3 py-2"
                        />
                        <ErrorMessage
                            name="minSalary"
                            component="div"
                            className="text-red text-sm mt-1"
                        />
                        </div>
                        <div>
                        <label htmlFor="maxSalary" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                            Maximum
                        </label>
                        <Field
                            id="maxSalary"
                            name="maxSalary"
                            type="number"
                            placeholder="Maximum salary"
                            className="block w-full border border-gray/100 rounded px-3 py-2"
                        />
                        <ErrorMessage
                            name="maxSalary"
                            component="div"
                            className="text-red text-sm mt-1"
                        />
                        </div>
                    </div>
                    <h2 className="text-[#18191c] text-lg font-medium font-inter leading-loose">Advanced Infomation</h2>
                    <div className="grid-cols-3 grid gap-4">
                        <div>
                            <label htmlFor="education" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                                Education
                            </label>
                            <Field as="select" name="education" className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md relative">
                                        <option value="">Select...</option>
                                        <option value="1">High School</option>
                                        <option value="2">Intermediate</option>
                                        <option value="3">Graduate</option>
                                        <option value="4">Master Degree</option>
                                        <option value="5">Bachelor Degree</option>
                            </Field>
                            <ErrorMessage
                                name="education"
                                component="div"
                                className="text-red text-sm mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="education" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                            Experience
                            </label>
                            <Field as="select" name="education" className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"                    >
                                <option value="">Select...</option>
                                <option value="1">Freshers</option>
                                <option value="2">1 - 2 Years</option>
                                <option value="3">2 - 4 Years</option>
                                <option value="4">4 - 6 Years</option>
                                <option value="5">6 - 8 Years</option>
                                <option value="6">8 - 10 Years</option>
                                <option value="7">10 - 15 Years</option>
                                <option value="8">15+ Years</option>
                            </Field>
                            <ErrorMessage
                                name="education"
                                component="div"
                                className="text-red text-sm mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="jobType" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                            Job Type
                            </label>
                            <Field as="select" name="jobType" className="w-full h-12 px-4 bg-white border border-[#e4e5e8] rounded-md"                    >
                                <option value="">Select...</option>
                                <option value="1">Full Time</option>
                                <option value="2">Part Time</option>
                                <option value="3">Internship</option>
                                <option value="4">Remote</option>
                                <option value="5">Temporary</option>
                                <option value="6">Contract Base</option>
                            </Field>
                            <ErrorMessage
                                name="education"
                                component="div"
                                className="text-red text-sm mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                            Location
                            </label>
                            <Field
                            id="location"
                            name="location"
                            type="text"
                            placeholder="location"
                            className="block w-full border border-gray/100 rounded px-3 py-2"
                            />
                            <ErrorMessage
                            name="location"
                            component="div"
                            className="text-red text-sm mt-1"
                            />
                        </div>
                        <div>
                            <label htmlFor="expirationDate" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight">
                            Expiration Date
                            </label>
                            <Field
                            id="expirationDate"
                            name="expirationDate"
                            type="date"
                            className="block w-full border border-gray/100 rounded px-3 py-2"
                            />
                            <ErrorMessage
                            name="expirationDate"
                            component="div"
                            className="text-red text-sm mt-1"
                            />
                        </div>
                    </div>
                    <h2 className="text-[#18191c] text-lg font-medium font-inter leading-loose">Description & Responsibility</h2>
                    <div>
                        <label htmlFor="description" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight w-full">
                        Description 
                        </label>
                        <Field
                            as="textarea"
                                id="description"
                                name="description"
                                placeholder="Add your job description..."
                                className="block w-full border border-gray/100 rounded px-3 py-2"
                                rows="4"
                        />
                        <ErrorMessage
                            name="description"
                            component="div"
                            className="text-red text-sm mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="text-[#18191c] text-sm font-normal font-['Inter'] leading-tight w-full">
                        Responsibilities
                        </label>
                        <Field
                            as="textarea"
                                id="responsibilities"
                                name="responsibilities"
                                placeholder="Add your job responsibilities..."
                                className="block w-full border border-gray/100 rounded px-3 py-2"
                                rows="4"
                        />
                        <ErrorMessage
                            name="description"
                            component="div"
                            className="text-red text-sm mt-1"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button className="h-14 px-8 py-4 bg-[#0a65cc] rounded justify-center items-center gap-3 inline-flex text-white text-base font-semibold font-['Inter'] capitalize leading-normal" onClick={handleClick}>
                            Post Job
                            <img
                                src={`/image/arrow_right_hover.png`}
                                alt="icon"
                            />
                        </button>
                    </div>


                    
                </Form>
                )}
            </Formik>
        </div>
    </div>

  )
};

export default PostJob;
