export const API_BASE_URL = 'https://nursepal-backend.onrender.com/api/v1';

export const endpoints = {
  auth: {
    register: '/registration',
    login: '/login',
  },
  courses: {
    list: '/courses',
    overview: (courseId: string) => `/courses/${courseId}`,
    test: (courseId: string, testId: string) => `/courses/${courseId}/${testId}`,
  },
  scores: {
    submit: '/tests/scores',
    list: '/tests/scores',
    rank: '/rank/me',
  },
};
