import React, { useState, useEffect } from "react";
import userApi from "../../../../api/userApi";
import adminApi from "../../../../api/adminApi";

function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userApi.getAllUsers();
        const allUsers = response.data;
        setUsers(allUsers);
        console.log(allUsers);
      } catch (error) {
        console.log("Failed to fetch users: ", error);
      }
    };
    fetchUsers();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(users.length / itemsPerPage);

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handleBanUser = async (user) => {
    try {
      await adminApi.deleteUser(user.id);
      console.log(`User with ID ${user.id} has been deleted successfully`);
      setUsers(users.filter((item) => item.id !== user.id));
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <div>
      <span className="text-[#18191c] text-lg font-medium font-['Inter'] leading-7">
        Users
      </span>
      <div className="flex flex-col gap-3 items-center justify-center w-full mt-5">
        {paginatedUsers
          .filter((user) => user.role !== "ADMIN")
          .map((user, index) => (
            <div
              key={user.id}
              className="w-full h-[132px] p-6 bg-white rounded-xl border border-[#edeff4] justify-between items-center inline-flex mb-0 transform transition-transform duration-300 hover:border-[#1877f2]"
            >
              <div className="w-1/3 justify-start items-start gap-5 flex">
                <img
                  src={
                    "http://172.28.102.169:8080/api/v1" +
                    `${
                      user.role === "APPLICANT"
                        ? user.profileImageUrl
                        : user.logoUrl
                    }`
                  }
                  alt="user_avatar"
                  className="w-16 h-16 mt-6 rounded-full"
                />
                <div className="flex-col justify-start items-start gap-2 inline-flex">
                  <div className="text-[#181f33] text-xl font-medium font-['Inter'] leading-loose">
                    {user.role === "APPLICANT"
                      ? user.fullName || "No name"
                      : user.name || "No name"}
                  </div>
                  <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="justify-start items-start gap-1.5 flex">
                <div className="text-[#636a7f] text-sm font-normal font-['Inter'] leading-tight">
                  Type: {user.role}
                </div>
              </div>
              <button
                className="px-10 py-3 bg-[#fae7e7] rounded-[3px] justify-center items-center gap-3 flex
                                hover:bg-[#cc0a0a] hover:text-white group mr-0"
                onClick={() => handleBanUser(user)}
              >
                <div className="text-[#cc0a0a] group-hover:text-white text-base font-semibold font-['Inter'] capitalize leading-normal">
                  Delete
                </div>
              </button>
            </div>
          ))}
      </div>
      <div className="h-12 justify-center items-center gap-2 inline-flex w-full mt-5">
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
          const displayPage = index + 1;
          return (
            <button
              key={displayPage}
              className={`w-12 h-12 px-2 py-3 rounded-[50px] ${
                currentPage === displayPage
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
      </div>
    </div>
  );
}

export default UserList;
