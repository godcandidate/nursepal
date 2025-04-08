import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Stethoscope className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">NursePal</span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-primary-600 hover:text-primary-700 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-200 shadow-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-white border-t border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="w-full text-left flex items-center space-x-1 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};