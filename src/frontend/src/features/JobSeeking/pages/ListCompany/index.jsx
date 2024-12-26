  import React, { useState, useEffect } from "react";
  import { useSearchParams, useNavigate } from "react-router-dom";
  import companyApi from "../../../../api/companyApi.js";
  import PopupDialog from "../../components/PopupDialog.js";

  function ListCompany() {
    const [state, setState] = useState({
      companies: [],
      sortOption: "latest",
      isLoading: true,
    });
    const [dialog, setDialog] = useState({
      isOpen: false,
      content: { title: "", content: "", buttonLabel: "", link: null },
    });

    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("searchQuery") || "";
    const navigate = useNavigate();

    const fetchCompanies = async (query) => {
      try {
        console.log("Search query:", query);
        const response = query
          ? await companyApi.searchCompany(query)
          : await companyApi.getAllCompanies();
        console.log("API Response:", response.data);

        const data = response.data || [];
        if (data.length === 0) {
          setDialog({
            isOpen: true,
            content: {
              title: "No companies found!",
              content: `No companies match your search criteria "${query}". Please try again.`,
              buttonLabel: "Close",
              link: null,
            },
          });
        }

        setState((prev) => ({
          ...prev,
          companies: data,
          isLoading: false,
        }));
      } catch (error) {
        console.error("Error fetching company data:", error.message || error);
        setDialog({
          isOpen: true,
          content: {
            title: "Error!",
            content: "An error occurred while fetching companies. Please try again later.",
            buttonLabel: "Close",
            link: null,
          },
        });
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    useEffect(() => {
      const normalizedQuery = searchQuery?.trim();
      console.log("Raw searchQuery:", searchQuery);
      console.log("Normalized query:", normalizedQuery);
      setState((prev) => ({ ...prev, isLoading: true }));
      fetchCompanies(normalizedQuery);
    }, [searchQuery]);

    const handleSortChange = (e) => {
      const selectedSort = e.target.value;
      setState((prev) => ({
        ...prev,
        sortOption: selectedSort,
        companies: [...prev.companies].sort((a, b) => {
          const nameA = a.name || "";
          const nameB = b.name || "";
          if (selectedSort === "A-Z") return nameA.localeCompare(nameB);
          if (selectedSort === "Z-A") return nameB.localeCompare(nameA);
          return 0;
        }),
      }));
    };

    const handleViewDetailCompany = (company) => {
      navigate(`/job/detailcompany/${company.id}`);
    };

    const handleCloseDialog = () => {
      setDialog({ isOpen: false, content: {} });
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
            value={state.sortOption}
            onChange={handleSortChange}
          >
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="latest">Latest</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 items-center justify-center flex-grow h-full w-full">
          {state.isLoading ? (
            <div>Loading...</div>
          ) : state.companies.length === 0 ? (
            <div>No companies to display</div>
          ) : (
            state.companies.map((company, index) => (
              <div
                key={index}
                className="w-[70rem] h-28 p-8 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex"
              >
                <div className="justify-start items-center gap-5 flex">
                  <img
                    src={company.logoUrl ? "http://172.28.102.169:8080/api/v1" + company.logoUrl : "/image/default_logo.png"}
                    alt={`${company.name || "Company"} logo`}
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex-col justify-start items-start gap-3 inline-flex">
                    <div className="text-center text-[#181f33] text-xl font-medium font-['Inter'] leading-loose">
                      {company.name || "Unknown Company"}
                    </div>
                    <div className="justify-start items-center gap-5 inline-flex">
                      <div className="justify-start items-center gap-1.5 flex">
                        <img
                          src={`/image/icon_map.png`}
                          alt="Location icon"
                          className="h-4"
                        />
                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-snug">
                          {company.location || "Unknown Location"}
                        </div>
                      </div>
                      <div className="justify-start items-center gap-1.5 flex">
                        <img
                          src={`/image/Briefcase.png`}
                          alt="Job icon"
                          className="h-4"
                        />
                        <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-snug">
                          {company.jobList?.length || 0} Open Jobs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 flex hover:bg-[#0a65cc] hover:text-white group">
                  <button
                    className="text-[#0a65cc] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal"
                    onClick={() => handleViewDetailCompany(company)}
                  >
                    View Company
                  </button>
                  <img
                    src={`/image/arrow_right.png`}
                    alt="Arrow right"
                    className="h-4 group-hover:hidden"
                  />
                  <img
                    src={`/image/arrow_right_hover.png`}
                    alt="Arrow right hover"
                    className="h-4 hidden group-hover:block"
                  />
                </div>
              </div>
            ))
          )}
          {dialog.isOpen && (
            <PopupDialog
              isOpen={dialog.isOpen}
              handleClose={handleCloseDialog}
              content={dialog.content}
            />
          )}
        </div>
      </div>
    );
  }

  export default ListCompany;
