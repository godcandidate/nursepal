import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCourses } from '../data';
import { useAuth } from '../context/AuthContext';
import { Test } from '../types';

export const Course: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const course = mockCourses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Course not found</p>
      </div>
    );
  }

  const handleStartTest = (test: Test, mode: 'practice' | 'exam') => {
    navigate(`/course/${id}/test/${test.id}`, { state: { mode } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-8">{course.description}</p>

      <div className="grid grid-cols-1 gap-6">
        {course.tests.map((test) => {
          const testHistory = user?.progress[course.id]?.testHistory[test.id];

          return (
            <div key={test.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{test.title}</h3>
                  <p className="text-gray-600 mt-1">{test.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Time limit: {test.timeLimit} minutes</p>
                </div>
                {testHistory && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Last attempt: {testHistory.lastAttempted}</p>
                    <p className="text-sm font-semibold text-blue-600">Score: {testHistory.score}%</p>
                    <p className="text-xs text-gray-500">Mode: {testHistory.mode}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleStartTest(test, 'practice')}
                  className="flex-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Practice Mode
                </button>
                <button
                  onClick={() => handleStartTest(test, 'exam')}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Exam Mode
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};