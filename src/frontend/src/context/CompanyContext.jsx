import React, { Children } from 'react'
import { createContext, useState } from 'react'

export const CompanyContext = createContext({});

export const CompanyProvider = ({ children }) => {
    //Company Data
    const [bannerUrl, setBannerUrl] = useState(null);
    const [benefit, setBenefit] = useState(null);
    const [companyEmail, setCompanyEmail] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState(null);
    const [companyUrl, setCompanyUrl] = useState(null);
    const [description, setDescription] = useState(null);
    const [jobList, setJobList] = useState(null);
    const [location, setLocation] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [organizationType, setOrganizationType] = useState(null);
    const [verified, setVerified] = useState(null);
    const [yearOfEstablishment, setYearOfEstablishment] = useState(null);
    const [savedApplications, setSavedApplications] = useState(null);
    const [size, setSize] = useState(null);
    const [industry, setIndustry] = useState(null);

    const resetCompany = () => {
        setBannerUrl(null);
        setBenefit(null);
        setCompanyEmail(null);
        setCompanyName(null);
        setCompanyPhoneNumber(null);
        setCompanyUrl(null);
        setDescription(null);
        setJobList(null);
        setLocation(null);
        setLogoUrl(null);
        setOrganizationType(null);
        setVerified(null);
        setYearOfEstablishment(null);
        setSavedApplications(null);
        setSize(null);
        setIndustry(null);
    }

    const addSavedApplications = (application) => {
        setSavedApplications((savedApplications) => {
            if (!savedApplications.some((savedApplication) => savedApplication.id === application.id)) {
                return [...savedApplications, application];
            }
            return savedApplications;
        });
    };

    const removeSavedApplication = (application) => {
        setSavedApplications((savedApplications) => savedApplications.filter((savedApplication) => savedApplication.id !== application.id));
    };

    return (
        <CompanyContext.Provider value={{
            companyName, setCompanyName, logoUrl, setLogoUrl, bannerUrl, setBannerUrl,
            description, setDescription, benefit, setBenefit,
            location, setLocation, organizationType, setOrganizationType,
            companyUrl, setCompanyUrl, jobList, setJobList, verified, setVerified,
            companyEmail, setCompanyEmail, companyPhoneNumber, setCompanyPhoneNumber,
            yearOfEstablishment, setYearOfEstablishment, savedApplications, setSavedApplications,
            size, setSize, industry, setIndustry, resetCompany, addSavedApplications, removeSavedApplication
        }}>
            {children}
        </CompanyContext.Provider>
    )
}
