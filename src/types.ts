export interface User {
  id: string;
  name: string;
  email: string;
  progress?: {
    [courseId: number]: {
      completed: number;
      score: number;
      testHistory: {
        [testId: number]: {
          lastAttempted: string;
          score: number;
          mode: 'practice' | 'exam';
        };
      };
    };
  };
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface Test {
  id: number;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: Question[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  tests: Test[];
}

export interface CourseTest {
  id: number;
  title: string;
  numberOfTests: number; // number of questions available
}

export interface AuthContextType {
  user: User | null;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}