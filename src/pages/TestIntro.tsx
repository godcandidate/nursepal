import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseTest } from '../api/types';
import { BookOpen, Brain, GraduationCap } from 'lucide-react';

interface TestIntroProps {
  test: CourseTest;
}

export const TestIntro: React.FC<TestIntroProps> = ({ test }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const startTest = (mode: 'practice' | 'exam') => {
    navigate(`/course/${courseId}/test/${test.id}/${mode}`);
  };

  if (test.numberOfTests === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex justify-center mb-4">
          <BookOpen className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tests Available</h3>
        <p className="text-gray-600">
          This section doesn't have any tests yet. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{test.title}</h2>
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <BookOpen className="h-5 w-5" />
          <span>{test.numberOfTests} questions</span>
        </div>
        <p className="text-gray-600">
          Choose your preferred mode to start the test. Practice mode provides immediate feedback,
          while Exam mode reveals your score only at the end.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => startTest('practice')}
          className="flex items-center justify-center space-x-3 px-6 py-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
        >
          <Brain className="h-6 w-6" />
          <div className="text-left">
            <div className="font-semibold">Practice Mode</div>
            <div className="text-sm">Get instant feedback on each answer</div>
          </div>
        </button>

        <button
          onClick={() => startTest('exam')}
          className="flex items-center justify-center space-x-3 px-6 py-4 bg-secondary-50 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors"
        >
          <GraduationCap className="h-6 w-6" />
          <div className="text-left">
            <div className="font-semibold">Exam Mode</div>
            <div className="text-sm">Test yourself under exam conditions</div>
          </div>
        </button>
      </div>
    </div>
  );
};
