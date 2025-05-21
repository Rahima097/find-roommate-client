import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaGoogle } from "react-icons/fa"
import { toast } from "react-toastify";
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(() => {
                toast.success("Logged in successfully!");
                navigate(from, { replace: true });
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate(from, { replace: true });
            })
            .catch(err => {
                toast.error(err.message);
            });
    };
    return (
        <div className="min-h-screen bg-base-200 flex justify-center items-center px-4">
            <div className=" w-full lg:w-4/12 md:w-6/12 shadow-lg p-6 rounded-lg py-8 bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center text-primary">Login Now</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
                    <button type="submit" className="btn bg-primary text-white w-full hover:bg-secondary">Login</button>
                    <Link to="" className="link link-hover text-secondary">Forgot Password?</Link>
                </form>
                <button onClick={handleGoogleLogin} className="btn btn-outline w-full mt-3"><FaGoogle className='text-2xl text-secondary' />Continue with Google</button>
                <p className="mt-4 text-center text-sm">Don't have an account? <Link to="/register" className="text-primary underline">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;