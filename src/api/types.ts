import type { User, Course, CourseTest, Question } from '../types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  name: string;
  message?: string;
}

export type { Course, CourseTest, Question as TestQuestion };
