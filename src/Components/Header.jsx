import React from 'react';
import { Link, NavLink } from 'react-router';

const Header = () => {
    const navItems = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/add-listings">Add to Find Roommate</NavLink></li>
            <li><NavLink to="/browse-listings">Browse Listings</NavLink></li>
            <li><NavLink to="/my-listings">My Listings</NavLink></li>
        </>
    );
    return (
        <div className=" shadow-md px-4 py-3">
            <div className='w-11/12 mx-auto flex flex-row justify-between items-center'>
                <div className="">
                    <Link to="/" className="text-3xl font-bold text-primary">Find<span className='text-secondary'>RoomMate</span></Link>
                </div>

                <div className=" hidden lg:flex">
                    <ul className=" text-base font-bold text-secondary flex flex-row gap-6">
                        {navItems}
                    </ul>
                </div>

                <div className="">
                    <div className="flex gap-2">
                        <Link to="/login" className="btn bg-primary text-white text-base hover:bg-secondary">Login</Link>
                        <Link to="/register" className="btn bg-secondary text-white text-base hover:bg-primary">Signup</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;