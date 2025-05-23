import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import { Fade } from 'react-awesome-reveal';

import 'swiper/css';
import 'swiper/css/pagination';

import slideOneImg from './../assets/slide-1.jpg';
import slideTwoImg from './../assets/slide-2.jpg';
import slideThreeImg from './../assets/slide-3.jpg';

const Banner = () => {
    const slides = [slideOneImg, slideTwoImg, slideThreeImg];

    return (
        <div className="w-full mx-auto">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                loop={true}
            >
                {slides.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[250px] md:h-[580px] lg:h-[600px]">
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover z-0"
                            />

                            
                            <div className="absolute inset-0 z-10"></div>

                            {/* Centered text */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
                                <Fade direction="up" triggerOnce>
                                    <div className="text-primary space-y-4 max-w-2xl">
                                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                            <Typewriter
                                                words={[
                                                    'Find Your Perfect Roommate',
                                                    'Smart Matching. Verified Users.',
                                                    'Safe & Easy Room Rentals',
                                                ]}
                                                loop={true}
                                                cursor
                                                cursorStyle="|"
                                                typeSpeed={70}
                                                deleteSpeed={40}
                                                delaySpeed={2000}
                                            />
                                        </h1>
                                        <p className="text-secondary text-sm md:text-lg">
                                            Discover rooms and compatible roommates near you. Browse verified listings and chat securely — all in one platform.
                                        </p>
                                    </div>
                                </Fade>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
