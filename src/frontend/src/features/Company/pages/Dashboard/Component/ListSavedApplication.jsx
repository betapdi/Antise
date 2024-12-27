import React, { useState } from "react";
import companyApi from "../../../../../api/companyApi";
import { CompanyContext } from "../../../../../context/CompanyContext";
import { useContext, useEffect } from "react";
import jobApi from "../../../../../api/jobApi";
import { ApplicantContext } from "../../../../../context/ApplicantContext";
import applicantApi from "../../../../../api/applicantApi";


function ListSavedApplication({ savedApplications, onViewProfile }) {
    const [isClicked, setIsClicked] = useState({});
    const { addSavedApplications, removeSavedApplications } = useContext(CompanyContext);
    const { profileImageUrl } = useContext(ApplicantContext);
    const [applicationJobs, setApplicationJobs] = useState({});
    const [applicationApplicants, setApplicationApplicants] = useState({});

    const handleSavedApplicationClick = (applicationId) => {
        setIsClicked((prev) => ({ ...prev, [applicationId]: !prev[applicationId] }));
    };

    useEffect(() => {
        if (savedApplications != null) {
            savedApplications.forEach((application) => {
                setIsClicked((prev) => ({ ...prev, [application.id]: true }));
            });
        }
    }, []);

    useEffect(() => {
        const fetchJobsAndApplicants = async () => {
            const fetchedJobs = {};
            const fetchedApplicants = {};

            try {
                await Promise.all(
                    savedApplications.map(async (application) => {
                        if (application.jobId && !fetchedJobs[application.jobId]) {
                            const response = await jobApi.getJob(application.jobId);
                            fetchedJobs[application.jobId] = response.data;
                        }
                        if (application.jobId && !fetchedApplicants[application.applicantId]) {
                            const response = await applicantApi.getApplicant(application.applicantId);
                            fetchedApplicants[application.applicantId] = response.data;
                        }
                    })
                );
                setApplicationJobs((prevJobs) => ({ ...prevJobs, ...fetchedJobs }));
                setApplicationApplicants((prevApplicants) => ({ ...prevApplicants, ...fetchedApplicants }));

            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        if (savedApplications.length > 0) {
            fetchJobsAndApplicants();
        }
    }, []);

    const handleAddSavedApplication = async (application) => {
        try {
            const response = await companyApi.addSavedApplication(application.id);
            const application = response.data;
            console.log('ADD', application);
            addSavedApplications(application);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveSavedApplication = async (id) => {
        try {
            const response = await companyApi.removeSavedApplication(id);
            const application = response.data;
            console.log('REMOVE', application);
            removeSavedApplications(id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full flex flex-col mt-4 gap-4">
            {savedApplications.map((application, index) => (
                <div key={index} className="flex flex-row bg-white shadow-md p-5 rounded-lg">
                    {/* Candidate ava */}
                    <div className="justify-start items-center gap-4 inline-flex">
                        <div className="w-12 h-12">
                            <img
                                src={"http://172.28.102.169:8080/api/v1" + [applicationApplicants[application.applicantId] && applicationApplicants[application.applicantId].profileImageUrl]}
                                alt="avatar"
                            />
                        </div>
                        <div className="flex-col justify-start items-start gap-1">
                            <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal inline-flex">
                                {application.fullName}
                            </div>
                            <div className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight inline-flex">
                                {applicationJobs[application.jobId] && applicationJobs[application.jobId].title}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="w-4/5 h-12 justify-end gap-2 inline-flex">
                        {/* Bookmark Icon */}
                        <button
                            className="p-3 rounded-[5px] justify-start items-start gap-2.5 inline-flex"
                            onClick={() => {
                                handleSavedApplicationClick(application.id);
                                if (!savedApplications.some((savedApplication) => savedApplication.id === application.id)) {
                                    handleAddSavedApplication(application);
                                } else {
                                    handleRemoveSavedApplication(application.id);
                                }
                            }}
                        >
                            <img
                                src={`/image/${isClicked[application.id]
                                    ? "bookmark_click.png"
                                    : "bookmark.png"
                                    }`}
                                className="w-6 h-6"
                                alt="bookmark"
                            />
                        </button>

                        {/* View Profile Button */}
                        <button
                            className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 inline-flex"
                            onClick={() => onViewProfile(application)}
                        >
                            <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">
                                View Profile
                            </div>
                            <div className="w-6 h-6 relative">
                                <img src="/image/arrow_right.png" className="w-6 h-6" alt="arrow" />
                            </div>
                        </button>

                        {/* See More Icon */}
                        <button className="rounded-[5px] justify-start items-start gap-2.5 inline-flex">
                            <div className="w-12 h-12 relative">
                                <img src="/image/icon_see_more.png" className="w-12 h-12" alt="see more" />
                            </div>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListSavedApplication;
