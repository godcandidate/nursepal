import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { coursesApi, scoresApi } from '../api/api';
import { TestQuestion } from '../api/types';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';

type TestMode = 'practice' | 'exam';

interface Answer {
  questionId: number;
  selectedOption: string;
  isCorrect?: boolean;
}

export const Test: React.FC = () => {
  const { courseId, testId, mode } = useParams<{ courseId: string; testId: string; mode: TestMode }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const calculateScore = useCallback(() => {
    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    return Math.round((correctAnswers / questions.length) * 100);
  }, [answers, questions.length]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (courseId && testId) {
          const data = await coursesApi.getTestQuestions(courseId, testId);
          setQuestions(data);
        }
      } catch (error) {
        console.error('Failed to load questions:', error instanceof Error ? error.message : 'Unknown error');
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [courseId, testId]);

  useEffect(() => {
    if (testCompleted && testId) {
      const score = calculateScore();
      scoresApi.submitScore({ testId, score })
        .catch(error => {
          console.error('Failed to submit score:', error instanceof Error ? error.message : 'Unknown error');
          setError('Failed to submit score');
        });
    }
  }, [testCompleted, testId, calculateScore]);

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

  if (showIntro && testId === '0') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Biblical Studies Practice</h1>
          
          <div className="prose prose-blue max-w-none mb-8">
            <p className="text-lg text-gray-600 mb-4">
              Welcome to the Biblical Studies Practice test. This introduction will help you understand how the test works.
            </p>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Format</h2>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li>• Each test contains multiple-choice questions</li>
              <li>• You can review your answers in practice mode</li>
              <li>• Explanations are provided for each answer</li>
              <li>• Track your progress and scores</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips for Success</h2>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li>• Read each question carefully</li>
              <li>• Consider all options before selecting an answer</li>
              <li>• Use the explanations to learn from mistakes</li>
              <li>• Practice regularly to improve your knowledge</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate(`/courses/${courseId}/test/1/practice`)}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Practice Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isPracticeMode = mode === 'practice';
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswer = (selectedOption: string) => {
    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedOption,
      isCorrect: selectedOption === currentQuestion.answer
    };

    setAnswers((prev) => [...prev, answer]);

    if (isLastQuestion) {
      setTestCompleted(true);
    }
  };





  if (testCompleted) {
    const score = calculateScore();
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100">
              <CheckCircle className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Completed!</h2>
          <div className="text-4xl font-bold text-primary-600 mb-4">{score}%</div>
          <p className="text-gray-600 mb-8">
            You got {answers.filter((a) => a.isCorrect).length} out of {questions.length} questions correct.
          </p>
          {isPracticeMode && (
            <div className="space-y-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900">Review Your Answers</h3>
              {questions.map((question, index) => {
                const answer = answers.find((a) => a.questionId === question.id);
                return (
                  <div key={question.id} className="text-left bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-2">
                      {index + 1}. {question.question}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Your answer: <span className={answer?.isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {answer?.selectedOption}
                      </span>
                    </p>
                    {!answer?.isCorrect && (
                      <p className="text-sm text-green-600">
                        Correct answer: {question.answer}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate(`/course/${courseId}`)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Course
            </button>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setAnswers([]);
                setTestCompleted(false);
              }}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div
              className="h-full bg-primary-600 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div key={currentQuestion.id} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const answer = answers.find((a) => a.questionId === currentQuestion.id);
              const isSelected = answer?.selectedOption === option;
              const showCorrect = isPracticeMode && isSelected;
              const isCorrect = option === currentQuestion.answer;

              return (
                <button
                  key={option}
                  onClick={() => !answer && handleAnswer(option)}
                  disabled={!!answer}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    isSelected
                      ? showCorrect
                        ? isCorrect
                          ? 'bg-green-50 border-2 border-green-500'
                          : 'bg-red-50 border-2 border-red-500'
                        : 'bg-primary-50 border-2 border-primary-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={isSelected ? 'font-medium' : ''}>
                      {option}
                    </span>
                    {isSelected && showCorrect && (
                      isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Practice mode feedback */}
        {isPracticeMode && answers.find((a) => a.questionId === currentQuestion.id) && (
          <div className={`p-4 rounded-lg mb-6 ${
            answers.find((a) => a.questionId === currentQuestion.id)?.isCorrect
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}>
            <p className="font-medium mb-2">
              {answers.find((a) => a.questionId === currentQuestion.id)?.isCorrect
                ? 'Correct!'
                : 'Incorrect'}
            </p>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </button>
          {!isLastQuestion && (
            <button
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              disabled={!answers.find((a) => a.questionId === currentQuestion.id)}
              className="flex items-center px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          )}
          {isLastQuestion && answers.find((a) => a.questionId === currentQuestion.id) && (
            <button
              onClick={() => setTestCompleted(true)}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Finish Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};