import React from "react";
import { useNavigate } from "react-router-dom";
import { useTestLogic } from "./Test";

export const TestUI: React.FC = () => {
  const navigate = useNavigate();
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
    courseId,
  } = useTestLogic();

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <div className="prose prose-blue max-w-none mb-8">
              <p className="text-base sm:text-lg text-gray-600 mb-4">
                Start your journey!
              </p>
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
              {error ? (
                <div className="text-red-600">{error}</div>
              ) : (
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              )}
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
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Hi, {localStorage.getItem("username")}
            </h1>
            <div className="prose prose-blue max-w-none mb-8">
              <p className="text-base sm:text-lg text-gray-600 mb-4">
                Start your journey!
              </p>
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
        </div>
      </div>
    );
  }

  // Test completed screen
  if (testCompleted) {
    const score = calculateScore();

    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Test Completed!
              </h2>
              {!isPracticeMode && examStartTime && (
                <div className="text-sm text-gray-600">
                  Time taken:{" "}
                  {formatTime(
                    Math.floor(
                      (new Date().getTime() - examStartTime.getTime()) / 1000
                    )
                  )}
                </div>
              )}
            </div>
            <div className="mb-8">
              <div className="text-4xl sm:text-5xl font-bold text-primary-600 mb-2">
                {score}%
              </div>
              <p className="text-gray-600">
                You answered {answers.filter((a) => a.isCorrect).length} out of{" "}
                {questions.length} questions correctly.
              </p>
            </div>

            {!isPracticeMode ? (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Review Questions
                </h3>
                <div className="space-y-6">
                  {questions.map((question, index) => {
                    const answer = answers.find(
                      (a) => a.questionId === question.id
                    );
                    const isCorrect =
                      answer?.selectedOption === question.answer;

                    return (
                      <div
                        key={question.id}
                        className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                              isCorrect
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {isCorrect ? "✓" : "✗"}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-2">
                              Question {index + 1}
                            </h4>
                            <p className="text-gray-700 mb-4">
                              {question.question}
                            </p>

                            <div className="space-y-2 mb-4">
                              <div className="text-sm">
                                <span className="text-gray-500">
                                  Your answer:{" "}
                                </span>
                                <span
                                  className={
                                    isCorrect
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }
                                >
                                  {answer?.selectedOption || "Not answered"}
                                </span>
                              </div>
                              {!isCorrect && (
                                <div className="text-sm">
                                  <span className="text-gray-500">
                                    Correct answer:{" "}
                                  </span>
                                  <span className="text-green-600">
                                    {question.answer}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                              <span className="font-medium">Explanation: </span>
                              {question.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row mt-8">
              <button
                onClick={resetTest}
                className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate(`/courses/${courseId}`)}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Back to Course
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
