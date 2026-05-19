import axios from "axios";
import { apiUrl } from "@/api";

const getAuthHeaders = (token?: string | null) => {
  if (token && token !== "null" && token !== "undefined") {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const getQuizCategories = async (token?: string | null) => {
  return axios.get(`${apiUrl}quiz/categories`, getAuthHeaders(token));
};

export const startQuiz = async (token: string | null, categoryId: number, questionCount: number = 40) => {
  return axios.post(
    `${apiUrl}quiz/categories/${categoryId}/start`,
    { question_count: questionCount },
    getAuthHeaders(token)
  );
};

export const submitQuiz = async (
  token: string | null,
  attemptId: number,
  answers: { question_id: number; answerIndex: number }[]
) => {
  return axios.post(
    `${apiUrl}quiz/attempts/${attemptId}/submit`,
    { answers },
    getAuthHeaders(token)
  );
};

export const getQuizHistory = async (token: string) => {
  return axios.get(`${apiUrl}quiz/history`, getAuthHeaders(token));
};

export const getAttemptDetails = async (token: string, attemptId: number) => {
  return axios.get(`${apiUrl}quiz/attempts/${attemptId}`, getAuthHeaders(token));
};
