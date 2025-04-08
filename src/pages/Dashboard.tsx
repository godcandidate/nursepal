import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockCourses } from "../data";
import { BookOpen, Clock, Award, ChevronRight } from "lucide-react";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 mb-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="mt-2 text-primary-100 text-lg">
            Your journey to becoming a great nurse continues here.
          </p>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-primary-100" />
                <div>
                  <p className="text-sm text-primary-100">Courses</p>
                  <p className="text-2xl font-bold">{mockCourses.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-primary-100" />
                <div>
                  <p className="text-sm text-primary-100">Study Hours</p>
                  <p className="text-2xl font-bold">12.5</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6 text-primary-100" />
                <div>
                  <p className="text-sm text-primary-100">Avg. Score</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => {
            const progress = user?.progress?.[course.id];
            const totalQuestions = course.questions?.length ?? 0;
            const progressPercentage =
              progress && totalQuestions > 0
                ? (progress.completed / totalQuestions) * 100
                : 0;

            return (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="mt-2 text-gray-600">{course.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-primary-600">
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${progressPercentage}%` }}
                        className="h-full bg-primary-600 rounded-full transition-all duration-500"
                      />
                    </div>
                    {progress && (
                      <p className="mt-2 text-sm text-gray-500 flex items-center">
                        <Award className="h-4 w-4 mr-1 text-secondary-500" />
                        Best Score: {progress.score}%
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
