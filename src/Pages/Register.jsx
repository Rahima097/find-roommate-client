import React from 'react';
import { Link } from 'react-router';
import { FaGoogle } from "react-icons/fa"

const Register = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
            <div className="w-full lg:w-4/12 md:w-6/12 shadow-lg p-6 bg-white rounded-lg py-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-primary">Register Now</h2>
                <form className="space-y-4">
                    <input type="text" name="name" placeholder="Name" className="input input-bordered w-full" required />
                    <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
                    <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered w-full" />
                    <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
                    <button type="submit" className="btn bg-primary text-white w-full hover:bg-secondary">Register</button>
                </form>
                <button className="btn btn-outline w-full mt-3"><FaGoogle className='text-2xl text-secondary' />Continue with Google</button>
                <p className="mt-4 text-center text-sm">Already have an account? <Link to="/login" className="text-primary underline">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;