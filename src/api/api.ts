import axios from "axios";
import { API_BASE_URL, endpoints } from "./config";
import type {
  Course,
  CourseTest,
  TestQuestion,
  AuthResponse,
  RegisterRequest,
} from "./types";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authApi = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      endpoints.auth.register,
      data
    );
    return response.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(endpoints.auth.login, {
        email,
        password,
      });

      // Ensure we have a response and it's successful
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || "Invalid login credentials");
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const message =
          error.response.data.message || "Login failed. Please try again.";
        throw new Error(message);
      }
      throw error; // Re-throw the original error
    }
  },
};

export const coursesApi = {
  async getCourses(): Promise<Course[]> {
    const response = await api.get<Course[]>(endpoints.courses.list);
    return response.data;
  },

  async getCourseOverview(courseId: string): Promise<CourseTest[]> {
    const response = await api.get<CourseTest[]>(
      endpoints.courses.overview(courseId)
    );
    return response.data;
  },

  async getTestQuestions(
    courseId: string,
    testId: string
  ): Promise<TestQuestion[]> {
    const response = await api.get<TestQuestion[]>(
      endpoints.courses.test(courseId, testId)
    );
    return response.data;
  },
};

interface CourseScore {
  highestScore: number;
  testId: string;
}

export const scoresApi = {
  async submitScore(testScore: {
    testId: string;
    score: number;
  }): Promise<void> {
    await api.post(endpoints.scores.submit, testScore);
  },

  async getCourseScores(courseId: string): Promise<CourseScore[]> {
    const response = await api.get<CourseScore[]>(endpoints.scores.byCourse(courseId));
    return response.data;
  },

  async getScores(): Promise<{ testId: string; score: number }[]> {
    const response = await api.get(endpoints.scores.list);
    return response.data;
  },

  async getRank(): Promise<{ rank: number; totalUsers: number }> {
    const response = await api.get(endpoints.scores.rank);
    return response.data;
  },

  async submitTestScore(data: { courseId: string; testId: string; score: number; dateTaken: string }): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>(endpoints.scores.submit, data);
    return response.data;
  }
};

// Add request interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Handle unauthorized access
      console.error("Unauthorized access:", error.response.data);
    } else if (error.response?.status === 500) {
      // Handle server errors
      console.error("Server error:", error.response.data);
    }
    return Promise.reject(error);
  }
);
