import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaGoogle } from "react-icons/fa"
import { toast } from "react-toastify";
import { AuthContext } from '../Provider/AuthProvider';
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Register = () => {
    const { register, googleLogin } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
            toast.error("Password must have at least one uppercase, one lowercase, and be at least 6 characters long!");
            return;
        }

        register(email, password)
            .then(() => {
                toast.success("Registration successful!");
                navigate("/");
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("Logged in with Google!");
                navigate("/");
            })
            .catch(err => {
                toast.error(err.message);
            });
    };
    return (
        <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
            <div className="w-full lg:w-4/12 md:w-6/12 shadow-lg p-6 bg-white rounded-lg py-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-primary">Register Now</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input type="text" name="name" placeholder="Name" className="input input-bordered w-full" required />
                    <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
                    <input type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered w-full" />
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="input input-bordered text-primary text-base border-secondary w-full" required />
                        <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                    <button type="submit" className="btn bg-primary text-white w-full hover:bg-secondary">Register</button>
                </form>
                <button onClick={handleGoogleLogin} className="btn btn-outline w-full mt-3"><FaGoogle className='text-2xl text-secondary' />Continue with Google</button>
                <p className="mt-4 text-center text-sm">Already have an account? <Link to="/login" className="text-primary underline">Login</Link></p>
            </div>
        </div>
    );
};

export default Register;