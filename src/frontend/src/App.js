import React, { Suspense, useEffect, useContext, useState } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes
} from "react-router-dom";

import './App.css';
import Authentication from './features/Authentication';
import NavCompany from './components/Nav/Company';
import userApi from './api/userApi';

import { UserContext } from './context/UserContext';
import { ApplicantContext } from './context/ApplicantContext';
import { CompanyContext } from './context/CompanyContext';

const Job = React.lazy(() => import('./features/JobSeeking'));
const Company = React.lazy(() => import('./features/Company'));


function App() {
  const {
    userId, setUserId, fullName, setFullName,
    email, setEmail, role, setRole,
    phoneNumber, setPhoneNumber
  } = useContext(UserContext);

  const {
    gender, setGender, profileImageUrl, setProfileImageUrl,
    resumeUrl, setResumeUrl, dateOfBirth, setDateOfBirth,
    experience, setExperience, nationality, setNationality,
    major, setMajor, biography, setBiography, 
    applications, setApplications
  } = useContext(ApplicantContext);

  const {
    companyName, setCompanyName, logoUrl, setLogoUrl, bannerUrl, setBannerUrl,
    description, setDescription, benefit, setBenefit,
    location, setLocation, organizationType, setOrganizationType,
    companyUrl, setCompanyUrl, jobList, setJobList, verified, setVerified
  } = useContext(CompanyContext);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.getUserData();
        const userData = response.data;
        console.log(userData);
  
        setUserId(userData.id);
        setFullName(userData.fullName);
        setEmail(userData.email);
        setRole(userData.role);
        setPhoneNumber(userData.phoneNumber);
  
        if (userData.role === 'APPLICANT') {
          setGender(userData.gender);
          setProfileImageUrl(userData.profileImageUrl);
          setResumeUrl(userData.resumeUrl);
          setDateOfBirth(userData.dateOfBirth);
          setExperience(userData.experience);
          setNationality(userData.nationality);
          setMajor(userData.major);
          setBiography(userData.biography);
          setApplications(userData.applications);
        }
  
        else {
          setCompanyName(userData.companyName);
          setLogoUrl(userData.logoUrl);
          setBannerUrl(userData.bannerUrl);
          setDescription(userData.description);
          setBenefit(userData.benefit);
          setLocation(userData.location);
          setOrganizationType(userData.organizationType);
          setCompanyUrl(userData.companyUrl);
          setJobList(userData.jobList);
          setVerified(userData.verified);
        }
      } catch(error) {
        console.log(error);
        setRole("ANONYMOUS");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }

    fetchUserData();
  },[])

  return (
    <>
      {(role != null) ? (
        <Suspense fallback = {<div>Loading...</div>}>
            <BrowserRouter>
              <Routes>
                <Route path = "/" element={
                                  role === "APPLICANT" ? (
                                    <Job />
                                  ) : role === "COMPANY" ? (
                                    <Company />
                                  ) : (
                                    <Navigate to="/auth/login" replace />
                                  )
                                }
                />
                <Route path = "job/*" element = {<Job />} />
                <Route path = "auth/*" element = {<Authentication />} />
                <Route path = "company/*" element = {<Company />} />
              </Routes>
            </BrowserRouter>
        </Suspense>)
      : <div>Loading...</div>}
    </>
  )
}

export default App;
