import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { coursesApi } from '../api/api';
import type { CourseTest } from '../api/types';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { TestIntro } from './TestIntro';

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
      } catch (error: Error | unknown) {
        console.error('Failed to load course tests:', error instanceof Error ? error.message : 'Unknown error');
        setError('Failed to load course tests');
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/dashboard"
        className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Tests</h2>
          <div className="space-y-6">
            {tests.map((test) => (
              <div key={test.id} className="border border-gray-200 rounded-lg p-6">
                {test.id === 0 ? (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{test.title}</h3>
                      <p className="text-gray-600 mt-1">{test.description}</p>
                    </div>
                  </div>
                ) : (
                  <TestIntro test={test} />
                )}
                {test.id !== 0 && test.numberOfTests > 0 && (
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={`/course/${courseId}/test/${test.id}`}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      View Test
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
