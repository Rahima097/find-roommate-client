import React from 'react';
import { Link } from 'react-router';
import { FaGoogle } from "react-icons/fa"

const Login = () => {
    return (
        <div className="min-h-screen bg-base-200 flex justify-center items-center px-4">
            <div className=" w-full lg:w-4/12 md:w-6/12 shadow-lg p-6 rounded-lg py-8 bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center text-primary">Login Now</h2>
                <form className="space-y-4">
                    <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
                    <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
                    <button type="submit" className="btn bg-primary text-white w-full hover:bg-secondary">Login</button>
                    <Link to=""className="link link-hover text-secondary">Forgot Password?</Link>
                </form>
                <button className="btn btn-outline w-full mt-3"><FaGoogle className='text-2xl text-secondary' />Continue with Google</button>
                <p className="mt-4 text-center text-sm">Don't have an account? <Link to="/register" className="text-primary underline">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;