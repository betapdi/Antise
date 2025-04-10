import * as React from "react";
import { useState, useEffect } from "react";
import userApi from "../../../../api/userApi";
import { Field, Form, Formik } from "formik";
import { Link, useNavigate , redirect } from "react-router-dom";
import * as Yup from "yup";
import TextField from "../../../../customFields/TextField";
import jobApi from "../../../../api/jobApi";
import companyApi from "../../../../api/companyApi";
import applicantApi from "../../../../api/applicantApi";
import RegisterDialog from "../../components/RegisterDialog";


export default function LoginPage() {
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
    const isLoggined = localStorage.getItem('accessToken');
    if (isLoggined) {
      navigate('/');
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

  const handleLogin = async (values) => {
    try {
      const response = await userApi.loginUser(values);
      const value = response.data;
  
      localStorage.setItem('accessToken', value.accessToken);
      localStorage.setItem('refreshToken', value.refreshToken);
  
      window.location.href = "/";
    } catch (error) {
      if (error.response && error.response.status === 403) { // Assuming 401 is returned for incorrect credentials
        setDialogContent({
          title: "Invalid Login Credentials",
          content: "The username or password you entered is incorrect. Please try again.",
          buttonLabel: "Retry",
          link: null, // No redirection needed, just close the dialog
        });
      } else {
        setDialogContent({
          title: `Error - Status Code: ${error.response?.status || "Unknown"}`,
          content: "An error occurred while logging in. Please try again later.",
          buttonLabel: "Back to Homepage",
          link: "/",
        });
      }
      setIsOpenDialog(true);
    }
  };
  

  return (
    <div className="w-screen h-screen justify-center items-center flex flex-row gap-20">
      <div className="w-2/5 flex justify-between items-center">
        <div className="flex flex-col w-full justify-between">
          <div className="flex flex-row items-center mb-10">
            <img src="/image/logo_job.png" alt="logo" className="h-auto" />
            <div className="text-black text-1xl font-inter pt-2">Antise</div>
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema = {Yup.object().shape({
              email: Yup.string()
                    .required("Please provide your email")
                    .email("Invalid email address"),
              password: Yup.string()
                        .required("Please enter password")
                        .min(8, "Password must be at least 8 characters"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                              handleLogin(values)
                              setSubmitting(false);
                          }, 400);
            }}
          >
            {({ values, errors, touched, handleSubmit, setFieldValue, isSubmitting }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <div className="flex flex-row items-center mb-8 w-full">
                    <div className="flex flex-col me-16">
                      <h className="text-[32px] font-medium font-inter leading-10 mb-2">Sign In</h>
                      <div className="text-gray text-base font-normal font-inter">
                        Don't have an account?{" "}
                        <Link to="/auth/register" className="text-blue hover:underline">
                          Sign Up
                        </Link>
                      </div>
                    </div>
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
                  </div>
                  <button className="w-full rounded-sm bg-blue text-white py-3 flex items-center justify-center"
                    type="submit"
                  >
                    <div className="text-white text-base font-semibold font-inter leading-normal mr-2">
                      Sign in
                    </div>
                    <span className="text-white text-1xl">→</span>
                  </button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center text-center me-6">
      <button onClick={() => {navigate('/job/homepage/')}}>
        <img src="/image/bg.png" alt="Logo" className="h-auto w-72" />
        
        </button>
        <h2 className="text-2xl font-semibold text-[#0A65CC] mb-4">Over {candidateCount - 1} candidates waiting for good employees.</h2>
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
            <p className="text-[#0A65CC]" >New Jobs</p>
          </div>
        </div>
      </div>

      <RegisterDialog isOpen = {isOpenDialog} handleClose = {handleCloseDialog} content = {dialogContent}/>
    </div>   
  );
}
