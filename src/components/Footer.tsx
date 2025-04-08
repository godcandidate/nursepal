import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              About
            </h3>
            <p className="mt-4 text-gray-500">
              NursePal helps nursing students prepare for their exams through interactive quizzes and practice tests.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-500 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-500 hover:text-gray-900">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Connect
            </h3>
            <div className="mt-4 flex items-center space-x-2 text-gray-500">
              Made with <Heart className="h-4 w-4 text-red-500" /> by NursePal Team
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} NursePal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};