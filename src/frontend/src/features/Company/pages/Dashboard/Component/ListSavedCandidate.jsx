import React, { useState } from "react";

function ListSavedCandidate({ savedCandidateList }) {
    // State to store bookmark status for each candidate
    const [bookmarkedCandidates, setBookmarkedCandidates] = useState(
        Array(savedCandidateList.length).fill(false)
    );

    // Toggle bookmark state for a specific candidate
    const toggleBookmark = (index) => {
        const updatedBookmarks = [...bookmarkedCandidates];
        updatedBookmarks[index] = !updatedBookmarks[index];
        setBookmarkedCandidates(updatedBookmarks);
        console.log(index);
    };
    console.log(savedCandidateList); // Log to check if savedCandidateList is populated correctly
    console.log(bookmarkedCandidates); // Check the array structure


    return (
        <div className="w-full flex flex-col mt-4 gap-4">
            {savedCandidateList.map((candidate, index) => (
                <div key={index} className="flex flex-row bg-white shadow-md p-5 rounded-lg">
                    {/* Candidate ava */}
                    <div className="justify-start items-center gap-4 inline-flex">
                        <div className="w-12 h-12 bg-[#767f8c] rounded" />
                        <div className="flex-col justify-start items-start gap-1">
                            <div className="text-[#18191c] text-base font-medium font-['Inter'] leading-normal inline-flex">
                                {candidate.name}
                            </div>
                            <div className="text-[#767f8c] text-sm font-normal font-['Inter'] leading-tight inline-flex">
                                {candidate.job}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="w-4/5 h-12 justify-end gap-2 inline-flex">
                        {/* Bookmark Icon */}
                        <button
                            className="p-3 rounded-[5px] justify-start items-start gap-2.5 inline-flex"
                            onClick={() => toggleBookmark(index)}
                        >
                            <img
                                src={
                                    bookmarkedCandidates[index]
                                        ? "/image/bookmark_click.png"
                                        : "/image/bookmark.png"
                                }
                                className="w-6 h-6"
                                alt="bookmark"
                            />
                        </button>

                        {/* View Profile Button */}
                        <button className="px-6 py-3 bg-[#e7f0fa] rounded-[3px] justify-center items-center gap-3 inline-flex">
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

export default ListSavedCandidate;
