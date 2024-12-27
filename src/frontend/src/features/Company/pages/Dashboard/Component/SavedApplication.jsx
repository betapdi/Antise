import React, { useState, useContext } from 'react';
import ListSavedApplication from './ListSavedApplication';
import { CompanyContext } from '../../../../../context/CompanyContext';
import ViewApplication from './ViewApplication';

function SavedApplication() {
    const { savedApplications } = useContext(CompanyContext);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const handleViewProfile = (application) => {
        setSelectedApplication(application);
    };

    const closeViewProfile = () => {
        setSelectedApplication(null);
    };

    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <div className="inline-block text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">
                    My Saved Applications <span className="text-gray ml-2">({savedApplications && savedApplications.length})</span>
                </div>
            </div>



            {savedApplications && savedApplications.length > 0 ? (
                <ListSavedApplication
                    savedApplications={savedApplications}
                    onViewProfile={handleViewProfile}
                />
            ) : (
                <div className="w-full flex flex-col mt-5">
                    No saved applications yet
                </div>
            )}
            {selectedApplication && (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div 
            className="relative bg-white rounded-md w-3/5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center p-4">
                <h2 className="text-xl font-semibold">Application Details</h2>
                <button onClick={closeViewProfile} className="text-gray-500 hover:text-gray-800">
                </button>
            </div>
                <ViewApplication application={selectedApplication} />
        </div>
    </div>
)}
        </div>
    );
}

export default SavedApplication;
