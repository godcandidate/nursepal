export interface Course {
  id: string;
  title: string;
  description: string;
}

export interface CourseTest {
  id: number;
  title: string;
  description: string;
  numberOfTests: number;
}

export interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: any;
  accessToken?: string;
  refreshToken?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
