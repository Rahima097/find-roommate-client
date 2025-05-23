import React from 'react';
import RoommateCard from './../Components/RoommateCard';

const FeatureRoommate = ({ roommates }) => {

    return (
        <div className=''>
            <div className='w-11/12 mx-auto py-12'>
                <h2 className='text-4xl font-bold text-primary text-center'> Feature <span className='text-secondary'>Roommate</span></h2>
                <p className='text-center pt-2 text-secondary'>Easily find a roommate who matches your lifestyle and budget.</p>
                <div className=' py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '  >
                    {
                        roommates && roommates.length > 0
                            ? roommates.map(roommate => (
                                <RoommateCard key={roommate._id} roommate={roommate}></RoommateCard>
                            ))
                            : <p>No roommates available</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default FeatureRoommate;