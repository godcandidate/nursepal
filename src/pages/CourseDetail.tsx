import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { coursesApi } from '../api/api';
import type { CourseTest } from '../types';
import { ChevronRight } from 'lucide-react';

export const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [tests, setTests] = useState<CourseTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        if (courseId) {
          const data = await coursesApi.getCourseOverview(courseId);
          setTests(data);
        }
      } catch (error) {
        console.error('Failed to load tests:', error instanceof Error ? error.message : 'Unknown error');
        setError('Failed to load tests');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Available Tests</h1>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Choose your preferred mode:
            </p>
            <Link
              to={`/scores/${courseId}`}
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              View Course Scores
              <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </Link>
          </div>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li className="mb-2">
              <span className="font-medium">Practice Mode:</span> Take your time, receive immediate feedback, and learn from explanations after each answer.
            </li>
            <li className="mb-2">
              <span className="font-medium">Exam Mode:</span> Timed assessment where you can freely navigate and change answers until submission. Time limit is based on the number of questions.
            </li>
          </ul>
        </div>

        <div className="grid gap-4">
          {tests.filter(test => test.id !== 0).length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.96-.5-2.5-1.303l-.546.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Tests Available</h3>
              <p className="text-gray-600">
                There are currently no tests available for this course. Please check back later.
              </p>
            </div>
          ) : (
            tests.filter(test => test.id !== 0).map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{test.title}</h3>
                    <p className="text-gray-600 mb-4">
                      This test contains {test.numberOfTests} questions to assess your knowledge.
                    </p>
                    <div className="flex space-x-4">
                      <Link
                        to={`/course/${courseId}/test/${test.id}/practice`}
                        className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
                      >
                        Practice Mode
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                      <Link
                        to={`/course/${courseId}/test/${test.id}/exam`}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Exam Mode
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                  <div className="ml-6 text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {test.numberOfTests}
                    </div>
                    <div className="text-xs text-gray-500">
                      Questions
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
