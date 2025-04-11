import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { coursesApi } from "../api/api";
import { TestUI } from "./TestUI";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface Answer {
  questionId: number;
  selectedOption: string;
  isCorrect: boolean;
}

// Re-export the UI component as Test for backward compatibility
export { TestUI as Test };

export const useTestLogic = () => {
  const { courseId, testId, mode } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testCompleted, setTestCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const calculateScore = useCallback(() => {
    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    return Math.round((correctAnswers / questions.length) * 100);
  }, [answers, questions]);

  const isPracticeMode = mode === "practice";
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const currentQuestion = questions[currentQuestionIndex];

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (courseId && testId && testId !== "0") {
          const data = await coursesApi.getTestQuestions(courseId, testId);
          setQuestions(data);
        }
      } catch (error) {
        console.error(
          "Failed to load questions:",
          error instanceof Error ? error.message : "Unknown error"
        );
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [courseId, testId]);

  // Handle test completion
  useEffect(() => {
    if (testCompleted && testId) {
      const score = calculateScore();
      // TODO: Submit score to API
      console.log(`Score submitted: ${score}%`);
    }
  }, [testCompleted, testId, calculateScore]);

  const handleAnswer = (selectedOption: string) => {
    if (!currentQuestion) return;
    const isCorrect = selectedOption === currentQuestion.answer;
    setAnswers([
      ...answers,
      { questionId: currentQuestion.id, selectedOption, isCorrect },
    ]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setTestCompleted(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTestCompleted(false);
  };

  return {
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
  };
};
