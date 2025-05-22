import React from 'react';
import Banner from '../Components/Banner';
import { useLoaderData } from 'react-router';
import FeatureRoommate from '../Components/FeatureRoommate';
import About from '../Components/About';


const Home = () => {
    const roommates = useLoaderData();
    return (
        <div>
            <Banner></Banner>
            <FeatureRoommate roommates={roommates} />
            <About></About>
            
        </div>
    );
};

export default Home;