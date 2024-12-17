import React, { Children } from 'react'
import { createContext, useState } from 'react'

export const CompanyContext = createContext({});

export const CompanyProvider = ({children}) => {
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

    return (
        <CompanyContext.Provider value = {{
            companyName, setCompanyName, logoUrl, setLogoUrl, bannerUrl, setBannerUrl,
            description, setDescription, benefit, setBenefit,
            location, setLocation, organizationType, setOrganizationType,
            companyUrl, setCompanyUrl, jobList, setJobList, verified, setVerified,
            companyEmail, setCompanyEmail, companyPhoneNumber, setCompanyPhoneNumber,
            yearOfEstablishment, setYearOfEstablishment
        }}>
            {children}
        </CompanyContext.Provider>
    )
}
