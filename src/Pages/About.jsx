import React from 'react';
import aboutoneImg from './../assets/about1.jpg';
import abouttwoImg from './../assets/about2.jpg';
import rentRoomImg from './../assets/rent-room.jpg';
import findRoomImg from './../assets/find-room.jpg';
import { Link } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';
import { Fade, Zoom } from 'react-awesome-reveal';
import TestimonialSection from '../Components/TestimonialSection';

const About = () => {
    return (
        <div className=" px-0 space-y-24">
            <div className="w-11/12 mx-auto py-16 flex flex-col lg:flex-row items-center gap-10">
                <Zoom cascade damping={0.1}>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div className="w-full h-full">
                            <img
                                src={aboutoneImg}
                                alt="People sharing home"
                                className="w-full border-4 border-primary lg:h-[500px] md:[400px] h-full object-cover rounded-br-[80px]"
                            />
                        </div>
                        <div className="w-full h-full">
                            <img
                                src={abouttwoImg}
                                alt="Roommate friends"
                                className="w-full lg:h-[350px] md:[250px] h-full object-cover border-4 lg:mt-30 lg:-ml-20 border-white rounded-br-[80px]"
                            />
                        </div>
                    </div>
                </Zoom>

                <Fade direction="right" triggerOnce>
                    <div className="flex-1 space-y-4">
                        <p className="text-primary font-semibold uppercase">About Us</p>
                        <h2 className="text-4xl font-bold text-secondary">
                            <Typewriter
                                words={['Connecting People to the Right Roommates']}
                                loop={false}
                                cursor
                                cursorStyle="|"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={2000}
                            />
                        </h2>
                        <p className="">
                            At FindRoommate, we believe that a great living experience starts with the right person...
                        </p>
                        <p className="">
                            We offer tools, filters, and secure messaging...
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <span className="flex items-center gap-2 text-sm">
                                🏠 Easy Listing & Searching
                            </span>
                            <span className="flex items-center gap-2 text-sm">
                                🔒 Safe & Verified Users
                            </span>
                            <span className="flex items-center gap-2 text-sm">
                                💬 Built-in Chat System
                            </span>
                            <span className="flex items-center gap-2 text-sm">
                                📍 Location-Based Matching
                            </span>
                        </div>
                        <Link to="/browse-listings" className="btn btn-primary mt-6">Check All Listing ↗</Link>
                    </div>
                </Fade>
            </div>

            <div className='w-11/12 mx-auto'>
                <h2 className="text-4xl font-bold text-center text-secondary mb-8">How It <span className="text-primary">Works</span></h2>
                <div className="tabs tabs-lift">
                    <input type="radio" name="my_tabs_3" className="tab text-primary" aria-label="Rent a Room" />
                    <div className="tab-content border-base-300 p-6">
                        <Fade triggerOnce direction="up">
                            <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center gap-10 tab-panel py-10">
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-2xl font-semibold text-secondary">Post Your Room Listing</h3>
                                    <ul className="space-y-3 ">
                                        <li>✅ Fill out a simple form...</li>
                                        <li>✅ Upload photos, location...</li>
                                        <li>✅ Create a free account...</li>
                                        <li>✅ Get contacted by potential roommates...</li>
                                    </ul>
                                    <Link to="/browse-listings" className="btn btn-primary mt-6">Start Searching ↗</Link>
                                </div>
                                <div className="flex-1">
                                    <img
                                        src={rentRoomImg}
                                        alt="Rent Room"
                                        className="w-full max-w-md mx-auto border-4 border-primary rounded-br-[80px]"
                                    />
                                </div>
                            </div>
                        </Fade>
                    </div>

                    <input type="radio" name="my_tabs_3" className="tab text-primary" aria-label="Find a Room" defaultChecked />
                    <div className="tab-content  border-base-300 p-6">
                        <Fade triggerOnce direction="up">
                            <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center gap-10 tab-panel py-10">
                                <div className="flex-1 space-y-4">
                                    <h3 className="text-2xl font-semibold text-secondary">Find Your Perfect Room</h3>
                                    <ul className="space-y-3 ">
                                        <li>✅ Browse verified listings...</li>
                                        <li>✅ Use filters like location...</li>
                                        <li>✅ Check roommate profiles...</li>
                                        <li>✅ Contact listers and book a visit...</li>
                                    </ul>
                                    <Link to="/browse-listings" className="btn btn-primary mt-6">Start Searching ↗</Link>
                                </div>
                                <div className="flex-1">
                                    <img
                                        src={findRoomImg}
                                        alt="Find Room"
                                        className="w-full max-w-md mx-auto border-4 border-primary rounded-br-[80px]"
                                    />
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
            <TestimonialSection></TestimonialSection>
        </div>
        
    );
};

export default About;
