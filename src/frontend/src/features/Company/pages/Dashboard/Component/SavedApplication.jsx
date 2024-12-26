import React from 'react';
import ListSavedApplication from './ListSavedApplication';
import { CompanyContext } from '../../../../../context/CompanyContext';
import { useContext } from 'react';

function SavedApplication() {
    const { savedApplications } = useContext(CompanyContext);
    console.log(savedApplications);
    return (
        <div className='w-full flex flex-col'>
            <div className='flex flex-row justify-between items-center'>
                <div className="inline-block text-[#18191c] text-xl font-medium font-['Inter'] leading-loose">
                    My Applications <span className="text-gray ml-2">({savedApplications.length})</span>
                </div>
            </div>

            <ListSavedApplication savedApplications={savedApplications} />
        </div>
    );
};

export default SavedApplication;
