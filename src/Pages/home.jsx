import React from 'react';
import Banner from '../Components/Banner';
import { useLoaderData } from 'react-router';
import FeatureRoommate from '../Components/FeatureRoommate';


const Home = () => {
    const roommates = useLoaderData();
    return (
        <div>
            <Banner></Banner>
            <FeatureRoommate roommates={roommates} />
            
        </div>
    );
};

export default Home;