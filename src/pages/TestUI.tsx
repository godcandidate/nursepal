import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTestLogic } from "./Test";
import { scoresApi } from "../api/api";

interface Score {
  highestScore: number;
  testId: string;
}

export const TestUI: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [scores, setScores] = useState<Score[]>([]);
  const [scoresLoading, setScoresLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        if (courseId) {
          const data = await scoresApi.getCourseScores(courseId);
          setScores(data);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
      } finally {
        setScoresLoading(false);
      }
    };

    // Always fetch scores when we have a courseId
    if (courseId) {
      fetchScores();
    }
  }, [courseId]);

  const {
    loading,
    error,
    testCompleted,
    currentQuestionIndex,
    questions,
    answers,
    calculateScore,
    isPracticeMode,
    currentQuestion,
    handleAnswer,
    handleNext,
    handlePrevious,
    resetTest,
    timeRemaining,
    formatTime,
    examStartTime,
  } = useTestLogic();

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <div className="prose prose-blue max-w-none mb-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-base sm:text-lg text-gray-600">
                  Start your journey!
                </p>
              </div>
              <ul className="list-disc pl-6 mb-6 text-gray-600 text-base sm:text-lg">
                <li className="mb-2">
                  <span className="font-medium">Practice Mode:</span> Take your
                  time, receive immediate feedback, and learn from explanations
                  after each answer.
                </li>
                <li className="mb-2">
                  <span className="font-medium">Exam Mode:</span> Timed
                  assessment where you can freely navigate and change answers
                  until submission. Time limit is based on the number of
                  questions.
                </li>
              </ul>
            </div>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 p-4 rounded-lg max-w-md w-full text-center">
          <div className="text-red-600 mb-2">Error</div>
          {error}
        </div>
      </div>
    );
  }

  // Intro screen for test ID 0
  if (window.location.pathname.includes("/test/0")) {

    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Hi, {localStorage.getItem("username")}
            </h1>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Test Instructions</h2>
            </div>

            <div className="prose prose-blue max-w-none">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Choose your preferred mode:</h3>
              <ul className="list-disc pl-6 mb-6 text-gray-600 text-base sm:text-lg">
                <li className="mb-2">
                  <span className="font-medium">Practice Mode:</span> Take your
                  time, receive immediate feedback, and learn from explanations
                  after each answer.
                </li>
                <li className="mb-2">
                  <span className="font-medium">Exam Mode:</span> Timed
                  assessment where you can freely navigate and change answers
                  until submission. Time limit is based on the number of
                  questions.
                </li>
              </ul>
            </div>
          </div>

          {/* Scores Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Your Progress
              </h2>

            </div>

            {scoresLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : scores.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {scores.map((score) => (
                  <div key={score.testId} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-sm text-gray-500 mb-1">Test {score.testId}</div>
                    <div className="flex items-end gap-1">
                      <span className="text-2xl font-bold text-primary-600">{score.highestScore}%</span>
                      <span className="text-xs text-gray-400 mb-1">highest score</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No scores available yet. Start a test to begin!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Test completed screen
  if (testCompleted) {
    const score = calculateScore();

    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-100 to-primary-50 rounded-bl-full opacity-50 -z-10" />
            
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isPracticeMode ? "Practice Complete!" : "Exam Complete!"}
              </h2>
              {!isPracticeMode && examStartTime && (
                <p className="text-gray-600">
                  Time taken: {" "}
                  {formatTime(
                    Math.floor(
                      (new Date().getTime() - examStartTime.getTime()) / 1000
                    )
                  )}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center mb-12">
              {/* Score circle */}
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg">
                  <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
                    <span className="text-4xl font-bold bg-gradient-to-br from-primary-600 to-primary-500 text-transparent bg-clip-text">
                      {score}%
                    </span>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-200" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-primary-300" />
              </div>
              
              <div className="text-center">
                <p className="text-xl text-gray-700 mb-2">
                  You got <span className="font-semibold text-primary-600">{answers.filter(a => a.isCorrect).length}</span> out of <span className="font-semibold text-primary-600">{questions.length}</span> correct
                </p>
                <p className="text-gray-500">
                  {score >= 70 ? "Great job! 🎉" : "Keep practicing! 💪"}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => navigate(`/course/${courseId}`)}
                className="px-6 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
              >
                Back to Course
              </button>
              <button
                onClick={resetTest}
                className="px-6 py-3 text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl hover:from-primary-700 hover:to-primary-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main test interface
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                {isPracticeMode ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    Practice Mode
                  </span>
                ) : (
                  timeRemaining !== null && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                      Time remaining: {formatTime(timeRemaining)}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary-600 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestionIndex + 1) / questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="mb-8">
            <p className="text-lg sm:text-xl text-gray-900 mb-6">
              {currentQuestion?.question}
            </p>
            <div className="space-y-3">
              {currentQuestion?.options.map((option: string, index: number) => {
                const answer = answers.find(
                  (a) => a.questionId === currentQuestion.id
                );
                const isSelected = answer?.selectedOption === option;
                const isCorrect = currentQuestion.answer === option;

                // In exam mode, only show selected state without indicating correctness
                const buttonStyle = isPracticeMode
                  ? isSelected
                    ? isCorrect
                      ? "bg-green-100 border-green-500"
                      : "bg-red-100 border-red-500"
                    : "bg-gray-50 hover:bg-gray-100 border-transparent"
                  : isSelected
                  ? "bg-blue-100 border-blue-500"
                  : "bg-gray-50 hover:bg-gray-100 border-transparent";

                return (
                  <button
                    key={index}
                    onClick={() =>
                      (!answer || !isPracticeMode) && handleAnswer(option)
                    }
                    disabled={isPracticeMode && !!answer}
                    className={`w-full text-left p-4 rounded-lg transition-all ${buttonStyle} border-2`}
                  >
                    <span className="text-base sm:text-lg">{option}</span>
                  </button>
                );
              })}

              {/* Show explanation below options only in practice mode */}
              {isPracticeMode &&
                answers.some((a) => a.questionId === currentQuestion?.id) && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-sm">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-1">
                          Explanation
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {currentQuestion?.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded ${
                currentQuestionIndex === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={
                !answers.find((a) => a.questionId === currentQuestion?.id)
              }
              className={`px-6 py-2 rounded ${
                !answers.find((a) => a.questionId === currentQuestion?.id)
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-primary-600 text-white hover:bg-primary-700"
              }`}
            >
              {isLastQuestion ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
