import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-50 border-t border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-primary-800 tracking-wider uppercase">
              About
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              NursePal helps nursing students prepare for their exams through interactive quizzes and practice tests. Our platform is designed by healthcare professionals for the next generation of nurses.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-primary-800 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-primary-800 tracking-wider uppercase">
              Connect With Us
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                Made with <Heart className="h-4 w-4 text-secondary-500 mx-1" /> by NursePal Team
              </div>
              <p className="text-gray-600">
                Empowering future nurses through technology
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-primary-100 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} NursePal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};