import React from 'react';
import Banner from '../Components/Banner';
import { useLoaderData } from 'react-router';
import FeatureRoommate from '../Components/FeatureRoommate';
import About from '../Components/About';
import Faq from '../Components/Faq';


const Home = () => {
    const roommates = useLoaderData();
    return (
        <div>
            <Banner></Banner>
            <FeatureRoommate roommates={roommates} />
            <About></About>
            <Faq></Faq>
            
        </div>
    );
};

export default Home;