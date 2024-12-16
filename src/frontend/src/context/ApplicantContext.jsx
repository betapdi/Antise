import React, { Children } from 'react'
import { createContext, useState } from 'react'

export const ApplicantContext = createContext({});

export const ApplicantProvider = ({children}) => {
    //Applicant Data
    const [gender, setGender] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [resumeUrl, setResumeUrl] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [experience, setExperience] = useState(null);
    const [nationality, setNationality] = useState(null);
    const [major, setMajor] = useState(null);
    const [biography, setBiography] = useState(null);
    const [applications, setApplications] = useState(null);

    return (
        <ApplicantContext.Provider value = {{
            gender, setGender, profileImageUrl, setProfileImageUrl,
            resumeUrl, setResumeUrl, dateOfBirth, setDateOfBirth,
            experience, setExperience, nationality, setNationality,
            major, setMajor, biography, setBiography, 
            applications, setApplications
        }}>
            {children}
        </ApplicantContext.Provider>
    )
}
