import React, { useState } from 'react';
import Banner from '../Components/Banner';
import { useLoaderData } from 'react-router';
import FeatureRoommate from '../Components/FeatureRoommate';
import About from '../Components/About';
import Faq from '../Components/Faq';
import DarkMoodToggoler from '../Components/DarkMoodToggoler';


const Home = () => {
    const roommates = useLoaderData();
    const [darkMode, setDarkMode] = useState(false);
    return (

        <div
            className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                }`}
        >
            <div className="p-2 text-center">
                <DarkMoodToggoler darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            <Banner />
            <FeatureRoommate roommates={roommates} />
            <About />
            <Faq />
        </div>
    );
};

export default Home;