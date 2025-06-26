import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import defaultAvatar from './../assets/default-user-img.png';
import logo from './../assets/logo.roommate.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="sticky top-0 bg-primary shadow-md px-4 lg:py-3 md:py-2 py-1 z-50">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className='flex items-center'>
          <img className='w-[55px]' src={logo || "/placeholder.svg"} alt="Logo" />
          <Link to="/" className="lg:text-3xl text-xl font-bold text-white">
            Find<span className="text-secondary">RoomMate</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <ul className="flex gap-6 text-base font-bold text-secondary">
            <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
            <li><NavLink to="/browse-listings" className="hover:text-white">Browse Listings</NavLink></li>
            <li><NavLink to="/about" className="hover:text-white">About</NavLink></li>
            <li><NavLink to="/faq" className="hover:text-white">FAQ</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-white">Contact</NavLink></li>
            {user && <li><NavLink to="/dashboard" className="hover:text-white">Dashboard</NavLink></li>}
          </ul>
        </div>

        {/* Auth Buttons / User Info (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="btn bg-white text-primary border-0 hover:bg-secondary text-base">Login</Link>
              <Link to="/register" className="btn bg-secondary text-primary border-0 hover:bg-primary text-base">Signup</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* Profile Picture with Name Tooltip - ONLY name shows on hover */}
              <div className="relative">
                <img
                  src={user.photoURL || defaultAvatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-secondary"
                />
                {/* Name tooltip - only shows on hover of profile image */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
                  {user.displayName || 'No Name'}
                </div>
              </div>

              {/* Logout Button - Always visible */}
              <button
                onClick={handleLogout}
                className="bg-secondary text-primary text-sm px-3 py-2 rounded hover:bg-white transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden text-secondary">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white px-4 pb-4 mt-2 shadow-md rounded-md">
          <ul className="flex flex-col gap-2 pt-2 text-base font-semibold text-primary">
            <li><NavLink to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Home</NavLink></li>
            <li><NavLink to="/browse-listings" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Browse Listings</NavLink></li>
            <li><NavLink to="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">About</NavLink></li>
            <li><NavLink to="/faq" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">FAQ</NavLink></li>
            {user && <li><NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Dashboard</NavLink></li>}
          </ul>

          <div className="flex flex-col gap-2 mt-4 items-center">
            {!user ? (
              <>
                <Link to="/login" className="btn bg-primary text-white hover:bg-secondary text-base w-full text-center">Login</Link>
                <Link to="/register" className="btn bg-secondary text-white hover:bg-primary text-base w-full text-center">Signup</Link>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3">
                {/* Profile Picture with Name Tooltip */}
                <div className="relative">
                  <img
                    src={user.photoURL || defaultAvatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-primary"
                  />
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                    {user.displayName || 'No Name'}
                  </div>
                </div>

                {/* Logout Button - Always visible */}
                <button
                  onClick={handleLogout}
                  className="btn bg-primary text-white text-sm px-4 py-2 rounded hover:bg-secondary transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;