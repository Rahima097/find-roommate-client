import React from 'react';
import { Link } from 'react-router';
import ErrorImg from './../assets/error.png'

const ErrorPage = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center h-[70vh] text-center px-4">
                <img src={ErrorImg} alt="404 Error" className="w-52 mb-6 mt-4" />
                <h1 className="lg:text-5xl text-2xl font-extrabold text-primary mb-4">404 Page Not Found</h1>
                <p className="text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/">
                    <button className="btn bg-secondary text-white text-lg px-6 py-3 rounded-full hover:bg-primary transition">
                        Go to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;