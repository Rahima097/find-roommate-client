import React from 'react';
import { FaUserPlus, FaSearch, FaComments, FaHome } from 'react-icons/fa';

const HowItWorksSection = () => {
    const steps = [
        {
            id: 1,
            icon: FaUserPlus,
            title: "Create Your Profile",
            description: "Sign up and tell us about yourself, your lifestyle, and what you're looking for in a roommate.",
            color: "text-blue-500",
            bgColor: "bg-blue-50"
        },
        {
            id: 2,
            icon: FaSearch,
            title: "Browse & Match",
            description: "Use our smart filters to find compatible roommates based on location, budget, and preferences.",
            color: "text-green-500",
            bgColor: "bg-green-50"
        },
        {
            id: 3,
            icon: FaComments,
            title: "Connect & Chat",
            description: "Message potential roommates, ask questions, and get to know each other before meeting.",
            color: "text-purple-500",
            bgColor: "bg-purple-50"
        },
        {
            id: 4,
            icon: FaHome,
            title: "Move In Together",
            description: "Found your perfect match? Coordinate the move and start your new living arrangement!",
            color: "text-orange-500",
            bgColor: "bg-orange-50"
        }
    ];

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Finding your perfect roommate is easier than ever. Follow these simple steps to get started.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative">
                                {/* Connector Line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 z-0">
                                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
                                    </div>
                                )}

                                <div className="text-center relative z-10">
                                    {/* Step Number */}
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full font-bold text-lg mb-4">
                                        {step.id}
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                        <step.icon className={`text-3xl ${step.color}`} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-12">
                        <button className="btn btn-primary btn-lg text-white px-8 mr-4">
                            Get Started Now
                        </button>
                        <button className="btn btn-outline btn-primary btn-lg px-8">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;