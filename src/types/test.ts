export interface QuestionOption {
  id: string;
  label: string;
  score: number;
}

export interface SubQuestion {
  id: string;
  title: string;
  options: QuestionOption[];
}

export interface Question {
  id: string;
  title: string;
  subQuestions: SubQuestion[];
}

export interface TestAnswers {
  [key: string]: string[]; // Changé de string à string[] pour supporter les réponses multiples
}

export interface TestState {
  isSubmitting: boolean;
  answers: TestAnswers;
  error: string | null;
}