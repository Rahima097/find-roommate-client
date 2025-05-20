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
        <div className="navbar bg-base-100 shadow-md px-4 py-3">
            <div className="navbar-start">
                <Link to="/" className="text-2xl font-bold">FindRoomMate</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navItems}
                </ul>
            </div>

            <div className="navbar-end">

                <div className="flex gap-2">
                    <Link to="/login" className="btn btn-sm">Login</Link>
                    <Link to="/register" className="btn btn-sm btn-outline">Signup</Link>
                </div>

            </div>
        </div>
    );
};

export default Header;