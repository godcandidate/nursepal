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
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{test.title}</h3>
                  <p className="text-gray-600">{test.description}</p>
                  <div className="mt-4 space-x-4">
                    <Link
                      to={`/course/${courseId}/test/${test.id}/practice`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700"
                    >
                      Practice Mode
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                    <Link
                      to={`/course/${courseId}/test/${test.id}/exam`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700"
                    >
                      Exam Mode
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {test.questions || 'N/A'} questions
                  </div>
                  <div className="text-sm text-gray-600">
                    {test.timeLimit || 'N/A'} minutes
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
