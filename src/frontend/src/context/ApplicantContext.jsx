import React, { Children } from 'react'
import { createContext, useState } from 'react'

export const ApplicantContext = createContext({});

export const ApplicantProvider = ({ children }) => {
    //Applicant Data
    const [gender, setGender] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [resumeUrl, setResumeUrl] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [experience, setExperience] = useState(null);
    const [education, setEducation] = useState(null);
    const [nationality, setNationality] = useState(null);
    const [major, setMajor] = useState(null);
    const [biography, setBiography] = useState(null);
    const [address, setAddress] = useState(null);
    const [workEmail, setWorkEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [applications, setApplications] = useState(null);
    const [favoriteJobs, setFavoriteJobs] = useState(null);
    const resetApplicant = () => {
        setGender(null);
        setFullName(null);
        setProfileImageUrl(null);
        setResumeUrl(null);
        setDateOfBirth(null);
        setExperience(null);
        setEducation(null);
        setNationality(null);
        setMajor(null);
        setBiography(null);
        setAddress(null);
        setWorkEmail(null);
        setPhoneNumber(null);
        setApplications(null);
        setFavoriteJobs(null);
    }

    const addFavoriteJob = (job) => {
        setFavoriteJobs((prevJobs) => {
            if (!prevJobs.some((favJob) => favJob.id === job.id)) {
                return [...prevJobs, job];
            }
            return prevJobs;
        });
    };

    const removeFavoriteJob = (id) => {
        setFavoriteJobs((prevJobs) => prevJobs.filter((favJob) => favJob.id !== id));
    };



    return (
        <ApplicantContext.Provider value={{
            gender, setGender, fullName, setFullName, profileImageUrl, setProfileImageUrl,
            resumeUrl, setResumeUrl, dateOfBirth, setDateOfBirth,
            experience, setExperience, nationality, setNationality,
            major, setMajor, biography, setBiography, address, setAddress,
            applications, setApplications, education, setEducation,
            workEmail, setWorkEmail, phoneNumber, setPhoneNumber,
            favoriteJobs, setFavoriteJobs, resetApplicant, removeFavoriteJob, addFavoriteJob
        }}>
            {children}
        </ApplicantContext.Provider>
    )
}
