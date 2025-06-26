import Banner from '../Components/Banner';
import { useLoaderData } from 'react-router';
import FeatureRoommate from '../Components/FeatureRoommate';
import TestimonialSection from '../Components/TestimonialSection';
import AboutUs from '../Components/AboutUs';
import CountdownSection from '../Components/CountdownSection';


const Home = () => {
    const roommates = useLoaderData();
    return (

        <div>
            <Banner />
            <FeatureRoommate roommates={roommates} />
            <AboutUs></AboutUs>
            <CountdownSection></CountdownSection>
            <TestimonialSection></TestimonialSection>
        </div>
    );
};

export default Home;