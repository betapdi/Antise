import * as React from "react";
import userApi from "../../../../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import applicantApi from "../../../../api/applicantApi";
import companyApi from "../../../../api/companyApi";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import SelectField from "../../../../customFields/SelectField";
import TextField from "../../../../customFields/TextField";
import RegisterDialog from "../../components/RegisterDialog";
import { useState } from "react";

export default function SignUpPage() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({title: null, content: null, buttonLabel: null, link: null});

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  }

  const handleSignUp = async (values) => {
    const rawData = values;
    // console.log(rawData);

    try {
      const response = await userApi.registerUser(rawData);
      const value = response.data;
  
      // console.log(response);
      localStorage.setItem('accessToken', value.accessToken);
      localStorage.setItem('refreshToken', value.refreshToken);
      
      if (rawData.role === "applicant") {
        const response = await applicantApi.createApplicantAccount();
        // console.log(response);
      }
  
      else {
        const response = await companyApi.createCompanyAccount();
        // console.log(response);
      }

      setDialogContent({
        title: "Register Succesfully!", 
        content: "Your account has been created!", 
        buttonLabel: "Click here to login!",
        link: "/auth/login" 
      })
    } catch(error) {
      // console.log(error)
      setDialogContent({
        title: `Error - Status Code: ${error.status}!`, 
        content: "There is a error while creating your account, please try again later!", 
        buttonLabel: "Click here to back to Homepage!",
        link: "/" 
      })
    }
  
    setIsOpenDialog(true);
  }

  return (
    <div className="w-screen h-screen justify-center items-center flex flex-row gap-20">
      <div className="w-1/2 flex justify-between items-center">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center mb-10">
            <img
              src={`/image/logo_job.png`}
              alt="logo"
              className="h-auto"
            />
            <div className="text-black text-1xl font-inter pt-2">Antise</div>
          </div>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              role: "",
              confirmedPassword: "",
            }}
            validationSchema = {Yup.object().shape({
              fullName: Yup.string().required("Please fill your full name"),
              role: Yup.string().required("Please select your role"),
              email: Yup.string()
                    .required("Please provide your email")
                    .email("Invalid email address"),
              password: Yup.string()
                        .required("Please enter password")
                        .min(8, "Password must be at least 8 characters"),
              confirmedPassword: Yup.string()
                .required("Please confirm your password")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                              alert(JSON.stringify(values, null, 2));
                              handleSignUp(values)
                              setSubmitting(false);
                          }, 400);
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue, isSubmitting }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-row items-center justify-between mb-8">
                    <div className="flex flex-col me-16">
                      <h className="text-[32px] font-medium font-inter leading-10 mb-2">
                        Create Account
                      </h>
                      <div className="text-gray text-base font-normal font-inter">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-blue hover:underline">
                          Login
                        </Link>
                      </div>
                    </div>
                    <Field
                      name = "role"
                      component = {SelectField}
                      options = {[{key: "Select...", value: ""},
                                    {key: "Employee", value: "applicant"},
                                    {key: "Employer", value: "company"}]}
                    />
                  </div>
                  <div className="space-y-2 mb-8 w-full">
                    <Field
                      name = "fullName"
                      component = {TextField}
                      placeholder = "Full Name"
                      focusStyle = "focus:outline-none focus:ring-2 focus:ring-blue-400"
                      borderColor = "border-[#b8b6b6]"
                      heightInput = "h-11"
                    />

                    <Field
                      name = "email"
                      component = {TextField}
                      placeholder = "Email"
                      focusStyle = "focus:outline-none focus:ring-2 focus:ring-blue-400"
                      borderColor = "border-[#b8b6b6]"
                      heightInput = "h-11"
                    />

                    <Field
                      name = "password"
                      component = {TextField}
                      type = "password"
                      placeholder = "Password"
                      focusStyle = "focus:outline-none focus:ring-2 focus:ring-blue-400"
                      borderColor = "border-[#b8b6b6]"
                      heightInput = "h-11"
                    />

                    <Field
                      name = "confirmedPassword"
                      component = {TextField}
                      type = "password"
                      placeholder = "Confirm Password"
                      focusStyle = "focus:outline-none focus:ring-2 focus:ring-blue-400"
                      borderColor = "border-[#b8b6b6]"
                      heightInput = "h-11"
                    />
                  </div>
                  <button className="w-full rounded-sm bg-blue text-white py-3 flex items-center justify-center"
                    type="submit"
                  >
                    <div className="text-white text-base font-semibold font-inter leading-normal mr-2">
                      Create account
                    </div>
                    <span className="text-white text-1xl">→</span>
                  </button>
                  <div className="my-4 text-center text-gray">or</div>
                  <div className="flex justify-center items-center mb-3 w-full">
                    <button className="bg-white py-2 px-8 rounded-md text-sm border border-gray/100 flex items-center justify-center">
                      <img
                        src={`/image/logo_gg.png`}
                        alt="Google"
                        className="mr-2"
                      />
                      <span className="font-['Inter'] font-normal">Sign up with Google</span>
                    </button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center text-center me-6">
        <img
          src={`/image/bg.png`}
          alt="Logo"
          className="h-auto w-72"
        />
        <h2 className="text-2xl font-semibold text-[#0A65CC] mb-4">
          Over 1,75,324 candidates waiting for good employees.
        </h2>
        <div className="flex space-x-5">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0A65CC]">1,75,324</p>
            <p className="text-[#0A65CC]">Live Jobs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0A65CC]">97,354</p>
            <p className="text-[#0A65CC]">Companies</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0A65CC]">7,532</p>
            <p className="text-[#0A65CC]">New Jobs</p>
          </div>
        </div>

        <RegisterDialog isOpen = {isOpenDialog} handleClose = {handleCloseDialog} content = {dialogContent}/>
      </div>
    </div>
  );
}
