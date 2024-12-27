import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import companyApi from "../../../../api/companyApi.js";
import { useNavigate, useLocation } from "react-router-dom";
import PopupDialog from "../../components/PopupDialog.js";

function ListCompany() {
  const location = useLocation();
  // Set Show Dialog
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: null, content: null, buttonLabel: null, link: null });

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const [logos, setLogos] = useState({});
  const [remainingDays, setRemainingDays] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");

  const handleViewDetailCompany = (company) => {
    navigate(`/job/detailcompany/${company.id}`);
  };

  useEffect(() => {
    const query = searchQuery === "" ? null : searchQuery;
    console.log("Searching for companies with query:", query);
    companyApi
      .searchCompany(query)
      .then((response) => {
        console.log("Search results:", response.data);
        setCompanies(response.data);
        if (response.data.length === 0) {
          setDialogContent({
            title: "No companies found!",
            content: "There are no companies that match your search criteria. Please try again.",
            buttonLabel: "Close",
            link: null
          });
          setIsOpenDialog(true);
        }
      })
      .catch((error) => {
        console.error("Error searching for company:", error);
        setDialogContent({
          title: "Error!",
          content: "An error occurred while searching companies. Please try again later.",
          buttonLabel: "Close",
          link: null
        });
        setIsOpenDialog(true);
      });

  }, [location]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companyApi.getAllCompanies();
        let result = response.data;
        result = result.filter(company => company.verified);
        setCompanies(result);
      } catch (error) {
        console.error("Failed to fetch company list: ", error);
      }
    };
    if (searchQuery === "")  fetchCompanies();
  }, []);
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort);

    // Example sorting logic
    const sortedCompanies = [...companies].sort((a, b) => {
      if (selectedSort === "A-Z") return a.name.localeCompare(b.name);
      if (selectedSort === "Z-A") return b.name.localeCompare(a.name);
      return 0; // Default to "latest" or no sorting
    });
    setCompanies(sortedCompanies);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = companies.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

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

  return (
    <div className="flex flex-col gap-12 justify-center items-center w-full py-16">
      <div className="flex flex-row justify-center items-center gap-[52rem] mt-3 mb-3">
        <div className="text-center text-[#181f33] text-[40px] font-medium font-['Inter'] leading-[48px]">
          Company
        </div>
        <select
          id="sort"
          className="bg-white border border-gray/100 text-black rounded-lg p-2"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="">Latest</option>
        </select>
      </div>
      <div className="flex flex-col gap-3 items-center justify-center flex-grow h-full w-full">
        {paginatedCompanies.map((company, index) => (
          <div className="w-[70rem] h-28 p-8 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex">
            <div className="justify-start items-center gap-5 flex">
              <img
                src={"http://172.28.102.169:8080/api/v1" + company.logoUrl}
                alt="logo"
                className="w-20 h-20 rounded-full"
              />
              <div className="flex-col justify-start items-start gap-3 inline-flex">
                <div className="text-center text-[#181f33] text-xl font-medium font-['Inter'] leading-loose">
                  {company.name}
                </div>
                <div className="justify-start items-center gap-5 inline-flex">
                  <div className="justify-start items-center gap-1.5 flex">
                    <img
                      src={`/image/icon_map.png`}
                      alt="location_icon"
                      className="h-4"
                    />
                    <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-snug">
                      {company.location}
                    </div>
                  </div>
                  <div className="justify-start items-center gap-1.5 flex">
                    <img
                      src={`/image/Briefcase.png`}
                      alt="job_icon"
                      className="h-4" />
                    <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-snug">
                      {company.jobList.length} Open Jobs
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex
                            hover:bg-[#0a65cc] hover:text-white group"
              onClick={() => handleViewDetailCompany(company)}>
              <button className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal"

              >
                View Company
              </button>
              <img
                src={`/image/arrow_right.png`}
                alt="arrow_right"
                className="h-4 group-hover:hidden"
              />
              <img
                src={`/image/arrow_right_hover.png`}
                alt="arrow_right_hover"
                className="h-4 hidden group-hover:block"
              />
            </button>
            
          </div>
        ))}
        {isOpenDialog && (
          <PopupDialog
            isOpen={isOpenDialog}
            handleClose={handleCloseDialog}
            content={dialogContent}
          />
        )}
        <div className="h-12 mt-3 justify-center items-center gap-2 inline-flex w-full">
              <button
                className="p-3 bg-[#e7f0fa] rounded-[84px]"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <img src={`/image/arrow_left.png`} alt="icon_arrow" className="w-6 h-6" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 px-2 py-3 rounded-[50px] ${currentPage === index + 1 ? 'bg-[#0a65cc] text-white' : 'text-[#5e6670]'
                    }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="p-3 bg-[#e7f0fa] rounded-[84px]"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <img src={`/image/arrow_right.png`} alt="icon_arrow" className="w-6 h-6" />
              </button>
            </div>
      </div>
    </div>
  );
}

export default ListCompany;
