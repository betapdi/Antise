import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../../components/Footer";
import jobApi from "../../../../api/jobApi";
import companyApi from "../../../../api/companyApi";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../../context/UserContext";
import applicantApi from "../../../../api/applicantApi";
import { ApplicantContext } from "../../../../context/ApplicantContext";
import userApi from "../../../../api/userApi";

function HomePage() {
  const [listJob, setListJobs] = useState([]);
  const [isClicked, setIsClicked] = useState({});
  const [remainingDays, setRemainingDays] = useState([]);
  const [companies, setcompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentCompanies, setCurrentCompanies] = useState([]);
  const [logo, setLogo] = useState({});
  const { role } = useContext(UserContext);
  const [liveJobCount, setLiveJobCount] = useState(0);
  const [newJobCount, setNewJobCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);
  const { favoriteJobs, removeFavoriteJob, addFavoriteJob } =useContext(ApplicantContext);

  const calculateRemainingDays = () => {
    const updatedListJobs = [];
    const remainingDaysList = [];
    let check = false;
    for (let i = 0; i < listJob.length; i++) {
      const targetDateString = listJob[i].expirationDate;
      const targetDate = new Date(targetDateString);
      const now = new Date();
      const diff = targetDate - now;
      const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (daysLeft > 0) {
        updatedListJobs.push(listJob[i]);
        remainingDaysList.push(daysLeft);
      } else {
        check = true;
      }
    }
    if (check) setListJobs(updatedListJobs);
    setRemainingDays(remainingDaysList);
  };

  const itemsPerPage = 8;
  const navigate = useNavigate();

  // Handle page change (next and previous page)
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < Math.ceil(companies.length / itemsPerPage)) {
      setCurrentPage(newPage);
    }
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentCompanies(companies, startIndex, endIndex);
  };

  const handleSignUpClick = () => {
    navigate("/auth/register"); // Route for Sign Up
  };

  const handleViewDetailJob = (job) => {
    navigate(`/job/detailjob/${job.id}`);
  };

  const handleViewAlllJob = () => {
    navigate(`/job/listjob`);
  };

  const handleViewDetailCompany = (company) => {
    navigate(`/job/detailcompany/${company.id}`);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobApi.getAllJobs();
        setListJobs(response.data);
      } catch (error) {
        console.log("Failed to fetch jobs: ", error);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    calculateRemainingDays();
    if (listJob.length > 0) {
      const interval = setInterval(() => {
        calculateRemainingDays();
      }, 5000);

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [listJob]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companyApi.getAllCompanies();
        let result = response.data;
        result = result.filter(company => company.verified);
        setcompanies(result);
      } catch (error) {
        console.log("Failed to fetch companies: ", error);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (companies.length > 0) {
      const idToLogoMap = {};
      for (const company of companies) {
        if (company.id && company.logoUrl) {
          idToLogoMap[company.id] = company.logoUrl;
        }
      }
      setLogo(idToLogoMap);
    }
  }, [companies]);

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

      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const candidateResponse = await userApi.getNumUser();
        setCandidateCount(candidateResponse.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchCandidate();
  }, []);

  const handleJobFavoriteClick = (jobId) => {
    setIsClicked((prev) => ({ ...prev, [jobId]: !prev[jobId] }));
  };

  useEffect(() => {
    if (favoriteJobs != null) {
      favoriteJobs.forEach((job) => {
        setIsClicked((prev) => ({ ...prev, [job.id]: true }));
      });
    }
  }, []);

  const handleAddFavoriteJob = async (id) => {
    try {
      const response = await applicantApi.addFavoriteJob(id);
      const job = response.data;
      addFavoriteJob(job);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFavoriteJob = async (id) => {
    try {
      const response = await applicantApi.removeFavoriteJob(id);
      const job = response.data;
      removeFavoriteJob(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col w-full items-center justify-center bg-[#f7f7f8]">
        <div className="flex-row justify-center items-center gap-10 flex mb-20">
          <div className="w-[32rem] text-[#18191c] text-[56px] font-medium font-['Inter'] leading-[64px]">
            Find a job that suits your interest & skills.
          </div>
          <img src={"/image/homepage_img.png"} alt="hero_image" />
        </div>
        <div className="flex flex-row gap-4 mb-20">
          {[
            {
              number: liveJobCount,
              text: "Live Job",
              image: "icon_job.png",
              hoverImage: "icon_job_hover.png",
            },
            {
              number: companyCount,
              text: "Companies",
              image: "icon_company.png",
              hoverImage: "icon_company_hover.png",
            },
            {
              number: candidateCount,
              text: "Candidates",
              image: "icon_user.png",
              hoverImage: "icon_user_hover.png",
            },
            {
              number: newJobCount,
              text: "New Jobs",
              image: "icon_job.png",
              hoverImage: "icon_job_hover.png",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="group h-28 p-5 bg-white rounded-lg justify-start items-center gap-14 inline-flex transform transition-transform duration-300 hover:scale-105"
            >
              <div className="p-4 bg-[#e7f0fa] rounded justify-start items-start gap-2.5 flex transition-colors duration-300 group-hover:bg-[#0A65CC]">
                <img
                  src={`/image/${item.image}`}
                  alt="icon"
                  className="transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={`/image/${item.hoverImage}`}
                  alt="icon_hover"
                  className="absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
              <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                <div className="text-[#18191c] text-2xl font-medium font-['Inter'] leading-loose">
                  {item.number}
                </div>
                <div className="text-[#767f8c] text-base font-normal font-['Inter'] leading-normal">
                  {item.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3  w-full items-center justify-center py-16 bg-[#f1f2f4]">
        <div className="text-center text-[#18191c] text-[40px] font-medium font-['Inter'] leading-[48px]">
          How jobpilot work
        </div>
        <div className="flex flex-row">
          {[
            {
              title: "Create account",
              description: "Sign up to start your job search journey easily.",
              defaultImage: "/image/icon_add_user.png",
              hoverImage: "/image/icon_add_user_hover.png",
            },
            {
              title: "Upload CV/Resume",
              description:
                "Upload your updated CV or resume to showcase your skills and experience.",
              defaultImage: "/image/icon_upload.png",
              hoverImage: "/image/icon_upload_hover.png",
            },
            {
              title: "Find suitable job",
              description:
                "Search and discover jobs that match your skills and career goals.",
              defaultImage: "/image/icon_find.png",
              hoverImage: "/image/icon_find_hover.png",
            },
            {
              title: "Apply job",
              description:
                "Submit applications for your preferred job openings with ease.",
              defaultImage: "/image/icon_tick.png",
              hoverImage: "/image/icon_tick_hover.png",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="h-56 p-4 rounded-xl flex-col justify-start items-center gap-6 inline-flex group transform transition-transform duration-300 hover:scale-105"
            >
              <div className="p-5 bg-white rounded-[80px] justify-start items-start gap-2.5 inline-flex group-hover:bg-[#0A65CC]">
                <img
                  src={item.defaultImage}
                  alt={`icon${index + 1}`}
                  className="transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={item.hoverImage}
                  alt={`hover-icon${index + 1}`}
                  className="absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              </div>
              <div className="flex-col justify-start items-start gap-3 flex">
                <div className="w-[18rem] text-center text-[#18191c] text-lg font-medium font-['Inter'] leading-7">
                  {item.title}
                </div>
                <div className="w-[18rem] text-center text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center w-full py-16">
        <div className="flex flex-row h-12 gap-[50rem]">
          <div className="text-center text-[#181f33] text-[40px] font-medium font-['Inter'] leading-[48px]">
            Featured job
          </div>
          <button
            className="px-6 py-3 rounded-[3px] border border-[#e7f0fa] flex justify-center items-center gap-3 text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal hover:bg-[#0a65cc] hover:text-white group"
            onClick={() => handleViewAlllJob()}
          >
            View All
            <img
              src={"/image/arrow_right.png"}
              alt="arrow_right"
              className="h-4 group-hover:hidden"
            />
            <img
              src={"/image/arrow_right_hover.png"}
              alt="arrow_right_hover"
              className="h-4 hidden group-hover:block"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {listJob.slice(0, Math.min(10, listJob.length)).map((job, index) => (
          <div
            key={job.id}
            className="w-[1200px] h-[132px] p-8 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-4 transform transition-transform duration-300 hover:scale-105 hover:border-[#1877f2]"
          >
            <div className="justify-start items-start gap-5 flex">
              <img
                src={"http://172.28.102.169:8080/api/v1" + logo[job.companyId]}
                alt="job_icon"
                className="w-16 h-16"
              />
              <div className="flex-col justify-start items-start gap-3.5 inline-flex">
                <div className="justify-start items-center gap-5 inline-flex">
                  <div className="text-[#181f33] text-xl font-medium font-['Inter'] leading-loose">
                    {job.title}
                  </div>
                  <div className="px-3 py-[3px] bg-[#e8f1ff] rounded-[52px] justify-start items-start gap-2.5 flex">
                    <div className="text-[#0a65cc] text-sm font-normal font-['Inter'] leading-tight">
                      {job.jobType}
                    </div>
                  </div>
                </div>
                <div className="justify-start items-center gap-4 inline-flex">
                  <div className="justify-start items-center gap-1.5 flex">
                    <img
                      src={"/image/icon_map.png"}
                      alt="location_icon"
                      className="h-4"
                    />
                    <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">
                      {job.location}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1 flex">
                    <img
                      src={"/image/icon_salary.png"}
                      alt="salary_icon"
                      className="h-4"
                    />
                    <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">
                      {job.minSalary} - {job.maxSalary}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1.5 flex">
                    <img
                      src={"/image/icon_calander.png"}
                      alt="calendar_icon"
                      className="h-4"
                    />
                    <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">
                      {remainingDays[index]} Days Remaining
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-start items-start gap-3 flex">
              {role === "APPLICANT" && (
                <div
                  className="p-4 bg-[#e7f0fa] rounded justify-start items-start gap-2.5 flex"
                  onClick={() => {
                    handleJobFavoriteClick(job.id);
                    if (!favoriteJobs.some((favJob) => favJob.id === job.id)) {
                      handleAddFavoriteJob(job.id);
                    } else {
                      handleRemoveFavoriteJob(job.id);
                    }
                  }}
                >
                  <div className="w-6 h-6 justify-center items-center flex">
                    <div className="w-6 h-6 relative">
                      <img
                        src={`/image/${
                          isClicked[job.id]
                            ? "bookmark_click.png"
                            : "bookmark.png"
                        }`}
                        alt="icon"
                      />
                    </div>
                  </div>
                </div>
              )}
              <button
                className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex
                            hover:bg-[#0a65cc] hover:text-white group"
                onClick={() => handleViewDetailJob(job)}
              >
                <div className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                  Apply Now
                </div>
                <img
                  src={"/image/arrow_right.png"}
                  alt="arrow_right"
                  className="h-4 group-hover:hidden"
                />
                <img
                  src={"/image/arrow_right_hover.png"}
                  alt="arrow_right_hover"
                  className="h-4 hidden group-hover:block"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center w-full py-14">
        <div className="flex flex-row h-12 gap-[50rem] items-center">
          <div className="text-center text-[#18191c] text-[40px] font-medium font-['Inter'] leading-[48px]">
            Top companies
          </div>
          <div className="justify-start items-start gap-4 flex ">
            <div
              className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start gap-2.5 flex hover:bg-[#0a65cc] group"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <img
                src={"/image/arrow_left.png"}
                alt="arrow_right"
                className="h-4 group-hover:hidden"
              />
              <img
                src={"/image/arrow_left_hover.png"}
                alt="arrow_right_hover"
                className="h-4 hidden group-hover:block"
              />
            </div>
            <div
              className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start gap-2.5 flex hover:bg-[#0a65cc] group"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={
                currentPage * itemsPerPage + itemsPerPage >= companies.length
              }
            >
              <img
                src={"/image/arrow_right.png"}
                alt="arrow_right"
                className="h-4 group-hover:hidden"
              />
              <img
                src={"/image/arrow_right_hover.png"}
                alt="arrow_right_hover"
                className="h-4 hidden group-hover:block"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full py-16">
        <div className="grid grid-cols-4 grid-rows-2 gap-2">
          {companies.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage).map((company, index) =>(
            <div 
              key={company.id} 
              className="h-[200px] p-8 bg-white rounded-xl border border-[#edeff4] flex-col justify-start items-start gap-8 flex transform transition-transform duration-300 hover:scale-105 hover:border-[#1877f2]">
              <div className="justify-start items-start gap-4 inline-flex">
                <img
                  src={"http://172.28.102.169:8080/api/v1" + company.logoUrl}
                  alt={`${company.name} logo`}
                  className="w-16 h-16"
                />
                <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                  <div className="justify-start items-center gap-2 inline-flex">
                    <div className="text-[#181f33] text-lg font-medium font-['Inter'] leading-7">
                      {company.name}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1.5 inline-flex">
                    <img
                      src={"/image/icon_map.png"}
                      alt="location_icon"
                      className="h-4"
                    />
                    <div className="text-[#9399ad] text-sm font-normal font-['Inter'] leading-tight">
                      {company.location}
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="w-[248px] px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 inline-flex  hover:bg-[#0a65cc] hover:text-white group"
                onClick={() => handleViewDetailCompany(company)}
              >
                <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal group-hover:text-white">
                  Open Position
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
