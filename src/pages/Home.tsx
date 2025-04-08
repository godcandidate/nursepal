import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Award } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Empowering Future Nurses,
            <br />
            One Quiz at a Time
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
            Practice quizzes to help you ace your nursing exams. Join thousands of nursing students preparing for success.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-400"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose NursePal?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to succeed in your nursing exams
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <BookOpen className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">
                Comprehensive Content
              </h3>
              <p className="mt-2 text-gray-600">
                Access a wide range of nursing topics and practice questions
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Brain className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">
                Smart Learning
              </h3>
              <p className="mt-2 text-gray-600">
                Track your progress and focus on areas that need improvement
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Award className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">
                Exam Preparation
              </h3>
              <p className="mt-2 text-gray-600">
                Practice in exam-like conditions with timed tests
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};