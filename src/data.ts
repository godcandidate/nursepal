import { Course, User } from './types';

export const mockCourses: Course[] = [
  {
    id: 1,
    title: "Anatomy and Physiology",
    description: "Learn about the structure and function of the human body",
    tests: [
      {
        id: 1,
        title: "Test 1: Introduction to Human Body Systems",
        description: "Basic concepts of human anatomy and body systems",
        timeLimit: 30,
        questions: [
          {
            id: 1,
            question: "What is the largest organ in the human body?",
            options: ["Heart", "Skin", "Liver", "Lungs"],
            answer: "Skin",
            explanation: "The skin is the largest organ, covering the entire body and serving multiple functions including protection and temperature regulation."
          },
          {
            id: 2,
            question: "Which part of the brain is responsible for balance and coordination?",
            options: ["Cerebrum", "Cerebellum", "Medulla", "Thalamus"],
            answer: "Cerebellum",
            explanation: "The cerebellum is responsible for maintaining balance, posture, and coordinating voluntary movements."
          }
        ]
      },
      {
        id: 2,
        title: "Test 2: Cardiovascular System",
        description: "Deep dive into the heart and blood vessels",
        timeLimit: 45,
        questions: [
          {
            id: 1,
            question: "Which chamber of the heart pumps blood to the lungs?",
            options: ["Left ventricle", "Right ventricle", "Left atrium", "Right atrium"],
            answer: "Right ventricle",
            explanation: "The right ventricle pumps deoxygenated blood to the lungs through the pulmonary artery."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Pharmacology",
    description: "Study medications and their effects on the human body",
    tests: [
      {
        id: 1,
        title: "Test 1: Introduction to Drug Classes",
        description: "Learn about different types of medications",
        timeLimit: 30,
        questions: [
          {
            id: 1,
            question: "Which drug class is commonly used to treat hypertension?",
            options: ["Beta blockers", "Antihistamines", "Antidepressants", "Antibiotics"],
            answer: "Beta blockers",
            explanation: "Beta blockers work by blocking the effects of epinephrine and norepinephrine, reducing heart rate and blood pressure."
          }
        ]
      }
    ]
  }
];

export const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  progress: {
    1: {
      completed: 2,
      score: 80,
      testHistory: {
        1: {
          lastAttempted: "2024-03-15",
          score: 85,
          mode: "exam"
        },
        2: {
          lastAttempted: "2024-03-16",
          score: 75,
          mode: "practice"
        }
      }
    },
    2: {
      completed: 1,
      score: 100,
      testHistory: {
        1: {
          lastAttempted: "2024-03-14",
          score: 100,
          mode: "practice"
        }
      }
    }
  }
};