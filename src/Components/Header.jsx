import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import defaultAvatar from './../assets/default-user-img.png'

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
    <div className="shadow-md px-4 py-3 bg-white z-50 relative">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-primary">
          Find<span className="text-secondary">RoomMate</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <ul className="flex gap-6 text-base font-bold text-secondary">
            <li><NavLink to="/" className="hover:text-primary">Home</NavLink></li>
            <li><NavLink to="/add-listings" className="hover:text-primary">Add to Find Roommate</NavLink></li>
            <li><NavLink to="/browse-listings" className="hover:text-primary">Browse Listings</NavLink></li>
            <li><NavLink to="/my-listings" className="hover:text-primary">My Listings</NavLink></li>
          </ul>
        </div>

        {/* Auth Buttons / User Info */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="btn bg-primary text-white hover:bg-secondary text-base">Login</Link>
              <Link to="/register" className="btn bg-secondary text-white hover:bg-primary text-base">Signup</Link>
            </>
          ) : (
            <>
              <div className="relative group">
                <img
                  src={user.photoURL || defaultAvatar }
                  alt={user.displayName || 'User'}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {user.displayName || 'No Name'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-ghost text-primary hover:text-secondary"
              >
                Log out
              </button>
            </>
          )}
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
            <li><NavLink to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Home</NavLink></li>
            <li><NavLink to="/add-listings" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Add to Find Roommate</NavLink></li>
            <li><NavLink to="/browse-listings" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">Browse Listings</NavLink></li>
            <li><NavLink to="/my-listings" onClick={() => setIsMenuOpen(false)} className="hover:text-primary">My Listings</NavLink></li>
          </ul>

          <div className="flex flex-col gap-2 mt-4 items-center">
            {!user ? (
              <>
                <Link to="/login" className="btn bg-primary text-white hover:bg-secondary text-base">Login</Link>
                <Link to="/register" className="btn bg-secondary text-white hover:bg-primary text-base">Signup</Link>
              </>
            ) : (
              <>
                <div className="relative group">
                  <img
                    src={user.photoURL || '/default-avatar.png'}
                    alt={user.displayName || 'User'}
                    className="w-10 h-10 rounded-full mb-2"
                  />
                  <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {user.displayName || 'No Name'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-ghost text-primary hover:text-secondary"
                >
                  Log out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
