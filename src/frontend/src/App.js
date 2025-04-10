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
import Error from './components/Error';

const Job = React.lazy(() => import('./features/JobSeeking'));
const Company = React.lazy(() => import('./features/Company'));
const Admin = React.lazy(() => import('./features/Admin'));
const WelcomeEmployee = React.lazy(() => import('./features/Welcome/WelcomeEmployee'));
const WelcomeEmployer = React.lazy(() => import('./features/Welcome/WelcomeEmployer'));


function App() {
  const {
    userId, setUserId, email, setEmail, role, setRole,
    notifications, setNotifications, resetUser
  } = useContext(UserContext);

  const {
    gender, setGender, fullName, setFullName, profileImageUrl, setProfileImageUrl,
    resumeUrl, setResumeUrl, dateOfBirth, setDateOfBirth,
    experience, setExperience, nationality, setNationality,
    major, setMajor, biography, setBiography, address, setAddress,
    applications, setApplications, education, setEducation,
    workEmail, setWorkEmail, phoneNumber, setPhoneNumber,
    favoriteJobs, setFavoriteJobs, resetApplicant
  } = useContext(ApplicantContext);

  const {
    companyName, setCompanyName, logoUrl, setLogoUrl, bannerUrl, setBannerUrl,
    description, setDescription, benefit, setBenefit,
    location, setLocation, organizationType, setOrganizationType,
    companyUrl, setCompanyUrl, jobList, setJobList, verified, setVerified,
    companyEmail, setCompanyEmail, companyPhoneNumber, setCompanyPhoneNumber,
    yearOfEstablishment, setYearOfEstablishment, savedApplications, setSavedApplications,
    size, setSize, industry, setIndustry, resetCompany
  } = useContext(CompanyContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userApi.getUserData();
        const userData = response.data;
        //console.log(userData);

        setUserId(userData.id);
        setEmail(userData.email);
        setRole(userData.role);
        setNotifications(userData.notifications);

        if (userData.role === 'APPLICANT') {
          setGender(userData.gender);
          setFullName(userData.fullName);
          setAddress(userData.address);
          setProfileImageUrl(userData.profileImageUrl);
          setResumeUrl(userData.resumeUrl);
          setDateOfBirth((userData.dateOfBirth != null) ? (userData.dateOfBirth).substring(0, 10) : null);
          setExperience(userData.experience);
          setNationality(userData.nationality);
          setMajor(userData.major);
          setBiography(userData.biography);
          setApplications(userData.applications);
          setEducation(userData.education);
          setWorkEmail(userData.workEmail);
          setPhoneNumber(userData.phoneNumber);
          setFavoriteJobs(userData.favoriteJobs);
        }

        else {
          setCompanyName(userData.name);
          setLogoUrl(userData.logoUrl);
          setBannerUrl(userData.bannerUrl);
          setDescription(userData.description);
          setBenefit(userData.benefit);
          setLocation(userData.location);
          setOrganizationType(userData.organizationType);
          setCompanyUrl(userData.companyUrl);
          setJobList(userData.jobList);
          setVerified(userData.verified);
          setCompanyEmail(userData.companyEmail);
          setCompanyPhoneNumber(userData.companyPhoneNumber);
          setYearOfEstablishment((userData.yearOfEstablishment != null) ? (userData.yearOfEstablishment).substring(0, 10) : null);
          setSavedApplications(userData.savedApplications);
          setIndustry(userData.industry);
          setSize(userData.size);
        }

      } catch (error) {

        resetUser();
        resetApplicant();
        resetCompany();

        setRole("ANONYMOUS");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    }

    fetchUserData();
  }, [])

  return (
    <>
      {(role != null) ? (
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Routes>
              <Route path="auth/*" element={<Authentication />} />
              <Route path="/" element={
                role === "APPLICANT" ? (
                  <Job />
                ) : role === "COMPANY" ? (
                  <Company />
                ) : role === "ADMIN" ? (
                  <Admin />
                ) : (
                  <Navigate to="/job/homepage" replace />
                )
              }
              />
              <Route path="welcome/employee" element={<WelcomeEmployee />} />
              <Route path="welcome/employer" element={<WelcomeEmployer />} />
              <Route path="admin/*" element={<Admin />} />
              <Route path="job/*" element={<Job />} />
              <Route path="company/*" element={<Company />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </Suspense>)
        : <div>Loading...</div>}
    </>
  )
}

export default App;
