import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = (
    <>
      <li><NavLink to="/" className="hover:text-primary">Home</NavLink></li>
      <li><NavLink to="/add-listings" className="hover:text-primary">Add to Find Roommate</NavLink></li>
      <li><NavLink to="/browse-listings" className="hover:text-primary">Browse Listings</NavLink></li>
      <li><NavLink to="/my-listings" className="hover:text-primary">My Listings</NavLink></li>
    </>
  );

  return (
    <div className="shadow-md px-4 py-3 bg-white z-50 relative">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-3xl font-bold text-primary">
            Find<span className="text-secondary">RoomMate</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex">
          <ul className="flex gap-6 text-base font-bold text-secondary">
            {navItems}
          </ul>
        </div>

        {/* Auth Buttons (Always visible) */}
        <div className="hidden lg:flex gap-2">
          <Link to="/login" className="btn bg-primary text-white hover:bg-secondary text-base">Login</Link>
          <Link to="/register" className="btn bg-secondary text-white hover:bg-primary text-base">Signup</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white px-4 pb-4 mt-2 shadow-md rounded-md">
          <ul className="flex flex-col gap-3 text-base font-semibold text-secondary">
            {navItems}
          </ul>
          <div className="flex flex-col gap-2 mt-4">
            <Link to="/login" className="btn bg-primary text-white hover:bg-secondary text-base">Login</Link>
            <Link to="/register" className="btn bg-secondary text-white hover:bg-primary text-base">Signup</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
