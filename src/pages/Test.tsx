import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { coursesApi, scoresApi } from "../api/api";
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
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [examStartTime, setExamStartTime] = useState<Date | null>(null);

  const calculateScore = useCallback(() => {
    const correctAnswers = answers.filter((a) => a.isCorrect).length;
    return Math.round((correctAnswers / questions.length) * 100);
  }, [answers, questions]);

  const isPracticeMode = mode === "practice";
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const currentQuestion = questions[currentQuestionIndex];

  // Fetch questions from API
  // Start exam timer
  useEffect(() => {
    if (
      !isPracticeMode &&
      !examStartTime &&
      !testCompleted &&
      questions.length > 0
    ) {
      setExamStartTime(new Date());
      // Set time as half the number of questions in minutes
      const timeInMinutes = Math.ceil(questions.length / 2);
      setTimeRemaining(timeInMinutes * 60);
    }
  }, [isPracticeMode, examStartTime, testCompleted, questions.length]);

  // Fetch questions
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
      // Submit score to API
      const submitScore = async () => {
        try {
          const dateTaken = new Date().toISOString();
          await scoresApi.submitTestScore({
            courseId: courseId || "",
            testId,
            score,
            dateTaken,
          });
        } catch (error) {
          console.error("Error submitting score:", error);
        }
      };

      submitScore();
    }
  }, [testCompleted, testId, calculateScore, courseId]);

  const handleAnswer = useCallback(
    (selectedOption: string) => {
      if (!currentQuestion) return;

      const existingAnswerIndex = answers.findIndex(
        (a) => a.questionId === currentQuestion.id
      );

      const isCorrect = selectedOption === currentQuestion.answer;
      const newAnswer = {
        questionId: currentQuestion.id,
        selectedOption,
        isCorrect,
      };

      if (existingAnswerIndex >= 0 && !isPracticeMode) {
        // In exam mode, allow changing answers
        setAnswers((prev) => [
          ...prev.slice(0, existingAnswerIndex),
          newAnswer,
          ...prev.slice(existingAnswerIndex + 1),
        ]);
      } else if (existingAnswerIndex === -1) {
        // Add new answer
        setAnswers((prev) => [...prev, newAnswer]);
      }
    },
    [currentQuestion, answers, isPracticeMode]
  );

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

  // Timer effect
  useEffect(() => {
    if (!isPracticeMode && timeRemaining !== null && !testCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            setTestCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPracticeMode, timeRemaining, testCompleted]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
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
    timeRemaining,
    formatTime,
    examStartTime,
    courseId,
  };
};
