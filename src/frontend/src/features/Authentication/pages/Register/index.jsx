import * as React from "react";
import userApi from "../../../../api/userApi";
import { Link, useNavigate } from "react-router-dom";
import applicantApi from "../../../../api/applicantApi";
import companyApi from "../../../../api/companyApi";
import jobApi from "../../../../api/jobApi";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import SelectField from "../../../../customFields/SelectField";
import TextField from "../../../../customFields/TextField";
import RegisterDialog from "../../components/RegisterDialog";
import { useState, useEffect } from "react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({title: null, content: null, buttonLabel: null, link: null});
  const [liveJobCount, setLiveJobCount] = useState(0);
  const [newJobCount, setNewJobCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  }

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const jobResponse = await jobApi.getAllJobs();
        const jobs = jobResponse.data;
        const now = new Date();
        const liveJobs = jobs.filter(
          (job) => new Date(job.expirationDate) > now
        );
        setLiveJobCount(liveJobs.length);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newJobs = jobs.filter(
          (job) => new Date(job.postedDate) >= oneWeekAgo
        );
        setNewJobCount(newJobs.length);

        const companyResponse = await companyApi.getAllCompanies();
        setCompanyCount(companyResponse.data.length);

        const candidateResponse = await userApi.getNumUser();
        setCandidateCount(candidateResponse.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

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

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

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
              email: "",
              password: "",
              role: "",
              confirmedPassword: "",
            }}
            validationSchema = {Yup.object().shape({
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
                  {/* <div className="my-4 text-center text-gray">or</div>
                  <div className="flex justify-center items-center mb-3 w-full">
                    <button className="bg-white py-2 px-8 rounded-md text-sm border border-gray/100 flex items-center justify-center">
                      <img
                        src={`/image/logo_gg.png`}
                        alt="Google"
                        className="mr-2"
                      />
                      <span className="font-['Inter'] font-normal">Sign up with Google</span>
                    </button>
                  </div> */}
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
          Over {candidateCount - 1} candidates waiting for good employees.
        </h2>
        <div className="flex space-x-5">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0A65CC]">{liveJobCount}</p>
            <p className="text-[#0A65CC]">Live Jobs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0A65CC]">{companyCount}</p>
            <p className="text-[#0A65CC]">Companies</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#0A65CC]">{newJobCount}</p>
            <p className="text-[#0A65CC]">New Jobs</p>
          </div>
        </div>

        <RegisterDialog isOpen = {isOpenDialog} handleClose = {handleCloseDialog} content = {dialogContent}/>
      </div>
    </div>
  );
}
