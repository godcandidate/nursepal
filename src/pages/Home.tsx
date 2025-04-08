import { Link } from 'react-router-dom';
import { BookOpen, Brain, Award, Heart, Clock, Users } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-pattern" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Empowering Future Nurses
            <span className="block text-secondary-200">One Quiz at a Time</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-100">
            Join thousands of nursing students preparing for success with our comprehensive practice quizzes and study materials.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/signup"
              className="bg-white text-primary-600 px-8 py-3 rounded-md font-medium hover:bg-primary-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-secondary-500 text-white px-8 py-3 rounded-md font-medium hover:bg-secondary-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-primary-50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-200">
              <Users className="h-8 w-8 mx-auto text-primary-600" />
              <p className="mt-2 text-3xl font-semibold text-gray-900">10,000+</p>
              <p className="text-primary-600">Active Students</p>
            </div>
            <div className="bg-primary-50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-200">
              <Brain className="h-8 w-8 mx-auto text-primary-600" />
              <p className="mt-2 text-3xl font-semibold text-gray-900">5,000+</p>
              <p className="text-primary-600">Practice Questions</p>
            </div>
            <div className="bg-primary-50 rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-200">
              <Clock className="h-8 w-8 mx-auto text-primary-600" />
              <p className="mt-2 text-3xl font-semibold text-gray-900">24/7</p>
              <p className="text-primary-600">Study Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Why Choose <span className="text-primary-600">NursePal</span>?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Your comprehensive companion for nursing exam success
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="flex justify-center">
                <BookOpen className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900 text-center">
                Comprehensive Content
              </h3>
              <p className="mt-4 text-gray-600 text-center">
                Access an extensive library of NCLEX-style questions and detailed explanations
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="flex justify-center">
                <Heart className="h-12 w-12 text-secondary-500" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900 text-center">
                Smart Learning
              </h3>
              <p className="mt-4 text-gray-600 text-center">
                Personalized study plans and progress tracking to optimize your learning
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="flex justify-center">
                <Award className="h-12 w-12 text-primary-600" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900 text-center">
                Exam Simulation
              </h3>
              <p className="mt-4 text-gray-600 text-center">
                Practice in a realistic exam environment with timed assessments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};