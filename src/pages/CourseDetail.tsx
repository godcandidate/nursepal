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
        <h1 className="text-3xl font-bold text-gray-900">Available Tests</h1>
        <div className="grid gap-6">
          {tests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{test.title}</h3>
                  {test.id === 0 ? (
                    <div className="mt-2">
                      <p className="text-gray-600 mb-4">Welcome to Biblical Studies Practice. Get started with your journey here.</p>
                      <Link
                        to={`/course/${courseId}/test/${test.id}/practice`}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Start Introduction
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  ) : (
                    <div>
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
                  )}
                </div>
                {test.id !== 0 && (
                  <div className="ml-6 text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {test.numberOfTests}
                    </div>
                    <div className="text-xs text-gray-500">
                      Questions
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
