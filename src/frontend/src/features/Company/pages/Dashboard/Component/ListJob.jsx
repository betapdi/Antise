import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jobApi from "../../../../../api/jobApi";
import { UserContext } from "../../../../../context/UserContext";
import { CompanyContext } from "../../../../../context/CompanyContext";
import PopupDialog from "../../../components/PopupDialog";

function ListJob({ jobList }) {
    const { setJobList } = useContext(CompanyContext);
    const {
        userId,
        setUserId,
        email,
        setEmail,
        role,
        setRole,
        notifications,
        setNotifications,
        resetUser,
    } = useContext(UserContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of jobs to display per page

    const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const toggleDropdown = (jobId) => {
        setDropdownOpen((prev) => (prev === jobId ? null : jobId));
    };

    const handleDeleteJob = async (job) => {
        try {
            const response = await jobApi.deleteJob(job.id);
            const data = response.data;
            const updatedJobList = jobList.filter((item) => item.id !== job.id);
            setJobList(updatedJobList);
        } catch (error) {
            console.log("Error deleting job", error);
        }
    };

    const [remainingDays, setRemainingDays] = useState([]);

    const calculateRemainingDays = () => {
        const remainingDaysMap = jobList.reduce((acc, job) => {
            const targetDate = new Date(job.expirationDate);
            const now = new Date();
            const diff = targetDate - now;
            const daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24)); // convert to days
            acc[job.id] = daysRemaining;
            return acc;
        }, {});

        setRemainingDays(remainingDaysMap);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedJobs = jobList.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(jobList.length / itemsPerPage);

    useEffect(() => {
        calculateRemainingDays();
    }, [jobList]);

    // Close dropdown when clicking outside
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleViewJobsApplications = (job) => {
        navigate(`/company/dashboard/my-job/list-candidate/${job.id}`);
    };

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState({
        title: null,
        content: null,
        buttonLabel: null,
        link: null,
    });

    // Handle dialog close
    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    };

    const confirmDeleteJob = (job) => {
        setDialogContent({
            title: "Confirm Deletion",
            content: `Are you sure you want to delete the job: ${job.title}?`,
            buttonLabel: "Delete",
            link: null, // Not used here
        });
        setIsOpenDialog(true);

        // Callback on dialog action
        const onConfirmDelete = async () => {
            setIsOpenDialog(false);
            handleDeleteJob(job);
        };
        setDialogContent((prev) => ({
            ...prev,
            onConfirm: onConfirmDelete, // Add callback to dialog
        }));
    };

    return (
        <div className="w-full flex flex-col mt-4 gap-4" ref={dropdownRef}>
            {paginatedJobs.map((job, index) => (
                <div
                    key={job.id}
                    className="flex flex-row bg-white shadow-md p-5 rounded-lg"
                >
                    <div className="flex flex-col w-1/2 gap-2">
                        <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal">
                            {job.title}
                            {job.PostedDate}
                        </div>
                        <div className="inline-flex items-center gap-4">
                            <span className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">
                                {job.jobType}
                            </span>
                            <span className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">
                                {remainingDays[job.id] > 0 ? `${remainingDays[job.id]}` : "0"}{" "}
                                days remaining
                            </span>
                        </div>
                    </div>
                    <div className="inline-flex gap-1 items-center w-1/5">
                        <img
                            src={
                                remainingDays[job.id] > 0
                                    ? `/image/CheckCircle.svg`
                                    : `/image/XCircle.png`
                            }
                            className="h-6 w-6"
                            alt="status"
                        />
                        <div
                            className={`${remainingDays[job.id] > 0 ? "text-[#0ba02c]" : "text-[#d32f2f]"
                                } text-sm font-medium font-['Inter'] leading-tight`}
                        >
                            {remainingDays[job.id] > 0 ? "Active" : "Expired"}
                        </div>
                    </div>
                    <div className="inline-flex gap-1 items-center w-3/12 ">
                        <img
                            src={`/image/Users.svg`}
                            className="h-6 w-6"
                            alt="applications"
                        />
                        <div className="text-[#5e6670] text-sm font-normal font-['Inter'] leading-tight">
                            {job.applications.length} Applications
                        </div>
                    </div>
                    <button
                        className="h-12 px-1 py-3 bg-white border-blue border rounded-[3px] justify-center items-center gap-3 inline-flex w-2/12"
                        onClick={() => handleViewJobsApplications(job)}
                    >
                        <span className="text-[#0a65cc] text-sm font-semibold font-['Inter'] capitalize leading-normal">
                            View Applications
                        </span>
                    </button>
                    <div className="h-12 py-3 px-5 rounded-[5px] justify-start items-start gap-2.5 inline-flex">
                        <button>
                            <img
                                src={`/image/DotsThreeVertical.png`}
                                className="h-6 w-6"
                                alt="options"
                                onClick={() => toggleDropdown(job.id)}
                            />
                        </button>
                        {dropdownOpen === job.id && (
                            <button
                                className="mt-9 ml-[-65px] flex items-center absolute bg-white gap-2 px-4 py-2 text-left shadow-md"
                                onClick={() => confirmDeleteJob(job)}
                            >
                                <img
                                    src="/image/Trash.png"
                                    alt="Delete Icon"
                                    className="w-5 h-5"
                                />
                                <span className="text-[#E05151]">Delete</span>
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {jobList && jobList.length > 0 && (
                <div className="h-12 justify-center items-center gap-2 inline-flex w-full">
                    <button
                        className="p-3 bg-[#e7f0fa] rounded-[84px]"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <img
                            src={`/image/arrow_left.png`}
                            alt="icon_arrow"
                            className="w-6 h-6"
                        />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                        const startPage = Math.max(1, currentPage - 2);
                        const endPage = Math.min(totalPages, currentPage + 2);
                        const displayPage = startPage + index;
                        if (displayPage > totalPages) return null;
                        return (
                            <button
                                key={displayPage}
                                className={`w-12 h-12 px-2 py-3 rounded-[50px] ${currentPage === displayPage
                                    ? "bg-[#0a65cc] text-white"
                                    : "text-[#5e6670]"
                                    }`}
                                onClick={() => setCurrentPage(displayPage)}
                            >
                                {displayPage}
                            </button>
                        );
                    })}
                    <button
                        className="p-3 bg-[#e7f0fa] rounded-[84px]"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <img
                            src={`/image/arrow_right.png`}
                            alt="icon_arrow"
                            className="w-6 h-6"
                        />
                    </button>
                </div>)
            }

            {isOpenDialog && (
                <PopupDialog
                    isOpen={isOpenDialog}
                    handleClose={handleCloseDialog}
                    content={dialogContent}
                />
            )}
        </div>
    );
}

export default ListJob;
