import axios from 'axios';
import { API_BASE_URL, endpoints } from './config';
import type { 
  Course, 
  CourseTest, 
  TestQuestion, 
  AuthResponse, 
  RegisterRequest, 
  LoginRequest 
} from './types';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authApi = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(endpoints.auth.register, data);
    return response.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(endpoints.auth.login, data);
    return response.data;
  },
};

export const coursesApi = {
  async getCourses(): Promise<Course[]> {
    const response = await api.get<Course[]>(endpoints.courses.list);
    return response.data;
  },

  async getCourseOverview(courseId: string): Promise<CourseTest[]> {
    const response = await api.get<CourseTest[]>(endpoints.courses.overview(courseId));
    return response.data;
  },

  async getTestQuestions(courseId: string, testId: string): Promise<TestQuestion[]> {
    const response = await api.get<TestQuestion[]>(endpoints.courses.test(courseId, testId));
    return response.data;
  },
};

// Add request interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Handle unauthorized access
      console.error('Unauthorized access:', error.response.data);
    } else if (error.response?.status === 500) {
      // Handle server errors
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);
