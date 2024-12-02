import React from 'react'
import Nav from '../../../../components/Nav'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../../components/Footer';

const jobs = [
    {
        title: "Senior UX Designer",
        companyLogo: "company_1.png",
        contractType: "Contract Base",
        location: "Australia",
        salary: "$30K-$35K",
        daysRemaining: 4,
    },
    {
        title: "Software Engineer",
        companyLogo: "company_2.png",
        contractType: "Full Time",
        location: "USA",
        salary: "$50K-$70K",
        daysRemaining: 7,
    },
    {
        title: "Product Manager",
        companyLogo: "company_3.png",
        contractType: "Part Time",
        location: "UK",
        salary: "$40K-$50K",
        daysRemaining: 10,
    },
];

const companies = [
    {
      id: 1,
      logo: require("../../../../image/logoCompany/company_1.png"),
      name: "Dribbble",
      location: "United States",
    },
    {
      id: 2,
      logo: require("../../../../image/logoCompany/company_2.png"),
      name: "Figma",
      location: "Canada",
    },
    {
      id: 3,
      logo: require("../../../../image/logoCompany/company_3.png"),
      name: "Spotify",
      location: "Sweden",
    },
    {
      id: 4,
      logo: require("../../../../image/logoCompany/company_4.png"),
      name: "Google",
      location: "United States",
    },
    {
        id: 4,
        logo: require("../../../../image/logoCompany/company_4.png"),
        name: "Google",
        location: "United States",
    },
    {
        id: 4,
        logo: require("../../../../image/logoCompany/company_4.png"),
        name: "Google",
        location: "United States",
    },
    {
        id: 4,
        logo: require("../../../../image/logoCompany/company_4.png"),
        name: "Google",
        location: "United States",
    },
    {
        id: 4,
        logo: require("../../../../image/logoCompany/company_4.png"),
        name: "Google",
        location: "United States",
    },
    {
        id: 4,
        logo: require("../../../../image/logoCompany/company_4.png"),
        name: "Google",
        location: "United States",
    },
    {
        id: 4,
        logo: require("../../../../image/logoCompany/company_4.png"),
        name: "Google",
        location: "United States",
    },

];
  


function HomePage() {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8; 
    const navigate = useNavigate();
    // Calculate the index range for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
 
    // Slice the companies array based on current page
    const currentCompanies = companies.slice(startIndex, endIndex);
 
    // Handle page change (next and previous page)
    const handlePageChange = (newPage) => {
        // Ensure the new page is within valid bounds
        if (newPage >= 0 && newPage < Math.ceil(companies.length / itemsPerPage)) {
            setCurrentPage(newPage);
        }
    };
    const handleSignInClick = () => {
        navigate('/auth/login'); // Route for Sign In
    };

    const handleSignUpClick = () => {
        navigate('/auth/register'); // Route for Sign Up
    };
    
    
    return (
        <div>
            <div className="flex flex-col w-full items-center justify-center bg-[#f7f7f8]">
                <div className="flex flex-row justify-center items-center gap-16 mb-20">
                    <div className="flex-col justify-center items-center gap-8 flex">
                        <div className="flex-col justify-start items-start flex">
                            <div className="w-[652px] text-[#18191c] text-[56px] font-medium font-['Inter'] leading-[64px]">Find a job that suits your interest & skills.</div>
                            <div className="w-[536px] text-[#bccce0] text-lg font-normal font-['Inter'] leading-7">Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget sollicitudin velit bestibulum.</div>
                        </div>
                    </div>
                    <img src={require("../../../../image/homepage_img.png")} alt="hero_image"/>
                </div>
                <div className="flex flex-row gap-4 mb-20">
                {[
                    { number: "1,75,324",text: "Live Job", image: "icon_job.png", hoverImage: "icon_job_hover.png" },
                    { number: "1,75,324",text: "Companies", image: "icon_company.png", hoverImage: "icon_company_hover.png" },
                    { number: "1,75,324",text: "Candidates", image: "icon_user.png", hoverImage: "icon_user_hover.png" },
                    { number: "1,75,324",text: "New Jobs", image: "icon_job.png", hoverImage: "icon_job_hover.png" },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="group h-28 p-5 bg-white rounded-lg justify-start items-center gap-14 inline-flex transform transition-transform duration-300 hover:scale-105"
                    >
                       <div className="p-4 bg-[#e7f0fa] rounded justify-start items-start gap-2.5 flex transition-colors duration-300 group-hover:bg-[#0A65CC]">
                            <img
                                src={require(`../../../../image/${item.image}`)}
                                alt="icon"
                                className="transition-opacity duration-300 group-hover:opacity-0"
                            />
                            <img
                                src={require(`../../../../image/${item.hoverImage}`)}
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
                <div className="text-center text-[#18191c] text-[40px] font-medium font-['Inter'] leading-[48px]">How jobpilot work</div>
                <div className="flex flex-row">
                    {[
                        {
                            title: "Create account",
                            description: "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
                            defaultImage: require("../../../../image/icon_add_user.png"),
                            hoverImage: require("../../../../image/icon_add_user_hover.png"),
                        },
                        {
                            title: "Upload CV/Resume",
                            description: "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales.",
                            defaultImage: require("../../../../image/icon_upload.png"),
                            hoverImage: require("../../../../image/icon_upload_hover.png"),
                        },
                        {
                            title: "Find suitable job",
                            description: "Phasellus quis eleifend ex. Morbi nec fringilla nibh.",
                            defaultImage: require("../../../../image/icon_find.png"),
                            hoverImage: require("../../../../image/icon_find_hover.png"),
                        },
                        {
                            title: "Apply job",
                            description: "Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales purus.",
                            defaultImage: require("../../../../image/icon_tick.png"),
                            hoverImage: require("../../../../image/icon_tick_hover.png"),
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="h-56 p-6 rounded-xl flex-col justify-start items-center gap-6 inline-flex group transform transition-transform duration-300 hover:scale-105"
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
                                <div className="w-[264px] text-center text-[#18191c] text-lg font-medium font-['Inter'] leading-7">
                                    {item.title}
                                </div>
                                <div className="w-[264px] text-center text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex justify-center items-center w-full py-16'>
                <div className="flex flex-row h-12 gap-[50rem]">
                    <div className="text-center text-[#181f33] text-[40px] font-medium font-['Inter'] leading-[48px]">Featured job</div>
                        <div className="px-6 py-3 rounded-[3px] border border-[#e7f0fa] justify-center items-center gap-3 flex">
                            <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal">View All</div>
                            <img src={require("../../../../image/arrow_right.png")} alt="arrow_right" className="h-4"/>
                        </div>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
            {jobs.map((job, index) => (
                <div
                key={index}
                className="w-[1200px] h-[132px] p-8 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-4 transform transition-transform duration-300 hover:scale-105 hover:border-[#1877f2]"
                >
                    <div className="justify-start items-start gap-5 flex">
                        <img src={require(`../../../../image/logoCompany/${job.companyLogo}`)} alt="job_icon" className="w-16 h-16" />
                        <div className="flex-col justify-start items-start gap-3.5 inline-flex">
                            <div className="justify-start items-center gap-2 inline-flex">
                                <div className="text-[#181f33] text-xl font-medium font-['Inter'] leading-loose">{job.title}</div>
                                <div className="px-3 py-[3px] bg-[#e8f1ff] rounded-[52px] justify-start items-start gap-2.5 flex">
                                    <div className="text-[#0a65cc] text-sm font-normal font-['Inter'] leading-tight">{job.contractType}</div>
                                </div>
                            </div>
                            <div className="justify-start items-center gap-4 inline-flex">
                                <div className="justify-start items-center gap-1.5 flex">
                                    <img src={require("../../../../image/icon_map.png")} alt="location_icon" className="h-4" />
                                    <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.location}</div>
                                </div>
                                <div className="justify-start items-center gap-1 flex">
                                    <img src={require("../../../../image/icon_salary.png")} alt="salary_icon" className="h-4" />
                                    <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.salary}</div>
                                </div>
                                <div className="justify-start items-center gap-1.5 flex">
                                    <img src={require("../../../../image/icon_calander.png")} alt="calendar_icon" className="h-4" />
                                    <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">{job.daysRemaining} Days Remaining</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="justify-start items-start gap-3 flex">
                        <div className="p-3 rounded-[5px] justify-start items-start gap-2.5 flex">
                            <img src={require("../../../../image/bookmark.png")} alt="icon_star" className="w-4 h-4" />
                        </div>
                        <div className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex
                        hover:bg-[#0a65cc] hover:text-white group">
                            <div className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                            Apply Now
                            </div>
                            <img 
                                src={require("../../../../image/arrow_right.png")} 
                                alt="arrow_right" 
                                className="h-4 group-hover:hidden"
                            />
                            <img 
                                src={require("../../../../image/arrow_right_hover.png")} 
                                alt="arrow_right_hover" 
                                className="h-4 hidden group-hover:block"
                            />
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <div className='flex justify-center items-center w-full py-14'>
                <div className="flex flex-row h-12 gap-[50rem] items-center">
                    <div className="text-center text-[#18191c] text-[40px] font-medium font-['Inter'] leading-[48px]">Top companies</div>
                    <div className="justify-start items-start gap-4 flex ">
                        <div className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start gap-2.5 flex hover:bg-[#0a65cc] group"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 0}
                         >
                            <img 
                                src={require("../../../../image/arrow_left.png")} 
                                alt="arrow_right" 
                                className="h-4 group-hover:hidden"

                            />
                            <img 
                                src={require("../../../../image/arrow_left_hover.png")} 
                                alt="arrow_right_hover" 
                                className="h-4 hidden group-hover:block"
                            />
                        </div>
                        <div className="p-3 bg-[#e7f0fa] rounded-[5px] justify-start items-start gap-2.5 flex hover:bg-[#0a65cc] group"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage * itemsPerPage + itemsPerPage >= companies.length}
                        >
                            <img 
                                src={require("../../../../image/arrow_right.png")} 
                                alt="arrow_right" 
                                className="h-4 group-hover:hidden"
                            />
                            <img 
                                src={require("../../../../image/arrow_right_hover.png")} 
                                alt="arrow_right_hover" 
                                className="h-4 hidden group-hover:block"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center w-full py-16">
                <div className="grid grid-cols-4 grid-rows-2 gap-2">
                    {currentCompanies.map((company, index) => (
                        <div 
                            key={index} 
                            className="h-[200px] p-8 bg-white rounded-xl border border-[#edeff4] flex-col justify-start items-start gap-8 flex transform transition-transform duration-300 hover:scale-105 hover:border-[#1877f2]"
                        >
                            <div className="justify-start items-start gap-4 inline-flex">
                                <img src={company.logo} alt={`${company.name} logo`} className="w-16 h-16" />
                                <div className="flex-col justify-start items-start gap-1.5 inline-flex">
                                    <div className="justify-start items-center gap-2 inline-flex">
                                        <div className="text-[#181f33] text-lg font-medium font-['Inter'] leading-7">
                                            {company.name}
                                        </div>
                                        {index === 0 && (
                                            <div className="px-3 py-[3px] bg-[#fceeee] rounded-[52px] justify-start items-start gap-2.5 flex">
                                                <div className="text-[#e05050] text-sm font-normal font-['Inter'] leading-tight">
                                                    Featured
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="justify-start items-center gap-1.5 inline-flex">
                                        <img src={require("../../../../image/icon_map.png")} alt="location_icon" className="h-4" />
                                        <div className="text-[#9399ad] text-sm font-normal font-['Inter'] leading-tight">
                                            {company.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[248px] px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 inline-flex  hover:bg-[#0a65cc] hover:text-white group">
                                <div className="text-[#0a65cc] text-base font-semibold font-['Inter'] capitalize leading-normal group-hover:text-white">
                                    Open Position
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-row justify-center gap-16 py-16'>
                <div className="h-[290px] p-[30px] bg-[#e4e5e8] rounded-xl flex-col justify-start items-start gap-[26px] inline-flex">
                    <div className="flex-col justify-start items-start gap-4 flex">
                        <div className="w-[500px] text-[#181f33] text-[32px] font-medium font-['Inter'] leading-10">Become a Candidate</div>
                        <div className="w-[312px] opacity-80 text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.</div>
                    </div>
                    <div className="px-6 py-3 bg-white rounded-[3px] justify-center items-center gap-3 inline-flex hover:bg-[#0a65cc] hover:text-white group">
                        <div className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal"
                                         onClick={()=>handleSignUpClick()}
                        >
                            Register now
                        </div>
                        <img 
                                src={require("../../../../image/arrow_right.png")} 
                                alt="arrow_right" 
                                className="h-4 group-hover:hidden"
                        />
                        <img 
                                src={require("../../../../image/arrow_right_hover.png")} 
                                alt="arrow_right_hover" 
                                className="h-4 hidden group-hover:block"
                        />
                    </div>
                </div>
                <div className="h-[290px] p-[30px] bg-[#0851a3] rounded-xl flex-col justify-start items-start gap-[26px] inline-flex">
                    <div className="flex-col justify-start items-start gap-4 flex">
                        <div className="w-[500px] text-white text-[32px] font-medium font-['Inter'] leading-10">Become a Employers</div>
                        <div className="w-[312px] opacity-80 text-white text-sm font-normal font-['Inter'] leading-tight">Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pelque augue risus, aliqu.</div>    
                    </div>
                    <div className="px-6 py-3 bg-white rounded-[3px] justify-center items-center gap-3 inline-flex hover:bg-[#0a65cc] hover:text-white group">
                        <div className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal"
                                        onClick={()=>handleSignUpClick()}
                        >
                            Register now
                        </div>
                        <img 
                                src={require("../../../../image/arrow_right.png")} 
                                alt="arrow_right" 
                                className="h-4 group-hover:hidden"
                        />
                        <img 
                                src={require("../../../../image/arrow_right_hover.png")} 
                                alt="arrow_right_hover" 
                                className="h-4 hidden group-hover:block"
                        />
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
        
    )
}

export default HomePage