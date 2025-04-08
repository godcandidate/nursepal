import React from 'react';
import { useParams } from 'react-router-dom';

export const Test: React.FC = () => {
  const { courseId, testId } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900">Test</h1>
      <p className="mt-2 text-gray-600">Course ID: {courseId}, Test ID: {testId}</p>
    </div>
  );
}