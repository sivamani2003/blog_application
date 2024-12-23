import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Change useHistory to useNavigate
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Manage login state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage mobile dropdown
  const navigate = useNavigate();  // Initialize useNavigate hook

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userToken'); // Remove token or reset login state
    navigate('/login'); // Redirect to the login page using useNavigate
  };

  return (
    <nav className="bg-[#36454F] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand Name */}
        <Link to="/" className="text-2xl font-bold">
          Blogs
        </Link>

        {/* Navbar for large screens */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-accent">
            Home
          </Link>
          
          {isLoggedIn && (  // Only show Dashboard for logged-in users
            <Link to="/admin" className="hover:text-accent">
              Dashboard
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hover:text-accent"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hover:text-accent">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            <FaBars size={24} />
          </button>

          {/* Mobile Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-0 right-0 mt-12 bg-[#36454F] text-white py-2 px-4 rounded shadow-lg">
              <Link
                to="/"
                className="block hover:text-accent py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              {isLoggedIn && (
                <Link
                  to="/admin"
                  className="block hover:text-accent py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block hover:text-accent py-1"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block hover:text-accent py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
