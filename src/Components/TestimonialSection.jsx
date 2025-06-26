import React, { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router';

const TestimonialSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Fake testimonial data with ImgBB images
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Marketing Manager",
            image: "https://i.ibb.co/rGBS7HVC/Lamia-Nahar.png",
            rating: 5,
            review: "FindRoommate made it so easy to find the perfect roommate! The platform is user-friendly and I found someone compatible within just a week. Highly recommended!",
            location: "Dhanmondi, Dhaka"
        },
        {
            id: 2,
            name: "Ahmed Rahman",
            role: "Software Engineer",
            image: "https://i.ibb.co/j9smpqvh/Sajid-Rahman.png",
            rating: 5,
            review: "Amazing experience! I was worried about finding a trustworthy roommate, but this platform connected me with genuine people. The verification process gives great peace of mind.",
            location: "Gulshan, Dhaka"
        },
        {
            id: 3,
            name: "Fatima Khan",
            role: "University Student",
            image: "https://i.ibb.co/bRFzGRXJ/Sumaiya-Siddiqua.png",
            rating: 4,
            review: "Great platform for students like me! Found a roommate who shares similar study habits and lifestyle. The detailed profiles really help in making the right choice.",
            location: "Uttara, Dhaka"
        },
        {
            id: 4,
            name: "Michael Chen",
            role: "Graphic Designer",
            image: "https://i.ibb.co/QFHtp9Hk/Tanvir-Ahamed.png",
            rating: 5,
            review: "Excellent service! The search filters are very helpful and the communication tools make it easy to connect with potential roommates. Found my ideal living situation!",
            location: "Banani, Dhaka"
        },
        {
            id: 5,
            name: "Priya Sharma",
            role: "Doctor",
            image: "https://i.ibb.co/bjGtvZYJ/Nazia-Hasan.png",
            rating: 4,
            review: "As a working professional, I needed someone reliable and mature. This platform helped me find exactly what I was looking for. The verification badges are a great feature!",
            location: "Bashundhara, Dhaka"
        },
        {
            id: 6,
            name: "David Wilson",
            role: "Business Analyst",
            image: "https://i.ibb.co/LXVnkbcS/Awlad-Hossain.png",
            rating: 5,
            review: "Outstanding platform! The detailed listings and honest reviews from other users helped me make an informed decision. Customer support is also very responsive.",
            location: "Wari, Dhaka"
        },
        {
            id: 7,
            name: "Lisa Anderson",
            role: "Teacher",
            image: "https://i.ibb.co/27ykVCmw/Farzana-Karim.png",
            rating: 5,
            review: "Perfect for educators like me! Found a quiet, studious roommate who respects my work schedule. The platform's matching system is incredibly accurate.",
            location: "Mirpur, Dhaka"
        },
        {
            id: 8,
            name: "Omar Hassan",
            role: "Architect",
            image: "https://i.ibb.co/pry49Ltd/Kamrul-Hasan.png",
            rating: 4,
            review: "Great experience overall! The detailed property descriptions and photos helped me choose the right place. Communication with potential roommates was seamless.",
            location: "Mohammadpur, Dhaka"
        },
        {
            id: 9,
            name: "Karim Reza",
            role: "Journalist",
            image: "https://i.ibb.co/1Gk5BmrY/Hasib-Mahmud.png",
            rating: 5,
            review: "Fantastic platform! As someone who travels frequently for work, I needed a flexible roommate arrangement. Found exactly what I was looking for through this site.",
            location: "Old Dhaka"
        }
    ];

    const slidesPerView = 3;
    const totalSlides = Math.ceil(testimonials.length / slidesPerView);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, totalSlides]);

    // Function to render star ratings
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={`${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    // Navigation functions
    const goToSlide = (slideIndex) => {
        setCurrentSlide(slideIndex);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    // Get current testimonials to display
    const getCurrentTestimonials = () => {
        const startIndex = currentSlide * slidesPerView;
        return testimonials.slice(startIndex, startIndex + slidesPerView);
    };

    return (
        <section className="bg-base-200 py-16">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-primary mb-4">What Our Users Say</h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what real users have to say about their experience with FindRoommate.
                    </p>
                    <div className="flex justify-center mt-4">
                        <div className="stats shadow bg-base-100">
                            <div className="stat">
                                <div className="stat-value text-primary">4.8</div>
                                <div className="stat-title">Average Rating</div>
                                <div className="stat-desc">From 500+ reviews</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials Slider */}
                <div className="relative">
                    {/* Slider Container */}
                    <div className="overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div key={slideIndex} className="w-full flex-shrink-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                                        {testimonials
                                            .slice(slideIndex * slidesPerView, (slideIndex + 1) * slidesPerView)
                                            .map((testimonial) => (
                                                <div key={testimonial.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                                                    <div className="card-body p-6">
                                                        {/* Quote Icon */}
                                                        <div className="flex justify-between items-start mb-4">
                                                            <FaQuoteLeft className="text-2xl text-primary opacity-50" />
                                                            <div className="flex gap-1">
                                                                {renderStars(testimonial.rating)}
                                                            </div>
                                                        </div>

                                                        {/* Review Text */}
                                                        <p className="text-base-content/80 mb-6 leading-relaxed">
                                                            "{testimonial.review}"
                                                        </p>

                                                        {/* User Info */}
                                                        <div className="flex items-center gap-4">
                                                            <div className="avatar">
                                                                <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                    <img 
                                                                        src={testimonial.image || "/placeholder.svg"} 
                                                                        alt={testimonial.name}
                                                                        onError={(e) => {
                                                                            e.target.src = "/placeholder.svg?height=48&width=48";
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-base-content">{testimonial.name}</h4>
                                                                <p className="text-sm text-base-content/60">{testimonial.role}</p>
                                                                <p className="text-xs text-primary">{testimonial.location}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button 
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 btn btn-circle btn-primary shadow-lg hover:btn-primary-focus z-10"
                    >
                        <FaChevronLeft />
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 btn btn-circle btn-primary shadow-lg hover:btn-primary-focus z-10"
                    >
                        <FaChevronRight />
                    </button>
                </div>

                {/* Slide Indicators */}
                <div className="flex justify-center mt-8 gap-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide 
                                    ? 'bg-primary scale-125' 
                                    : 'bg-base-300 hover:bg-primary/50'
                            }`}
                        />
                    ))}
                </div>

                {/* Auto-play Control */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                        className={`btn btn-sm ${isAutoPlaying ? 'btn-primary' : 'btn-outline'}`}
                    >
                        {isAutoPlaying ? 'Pause Auto-play' : 'Resume Auto-play'}
                    </button>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <div className="card bg-primary text-primary-content shadow-xl max-w-2xl mx-auto">
                        <div className="card-body text-center">
                            <h3 className="text-2xl font-bold mb-2">Ready to Find Your Perfect Roommate?</h3>
                            <p className="mb-4">Join thousands of satisfied users who found their ideal living situation.</p>
                            <div className="card-actions justify-center">
                                <Link to="/add-listings" className="btn btn-secondary">Get Started Today</Link>
                                <Link to="/browse-listings" className="btn btn-outline btn-secondary">Browse Listings</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;