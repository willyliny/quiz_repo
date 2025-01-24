export interface QuizQuestion {
  id: number;
  question: string | {
    text: string;
    code?: {
      content: string;
      language: string;
    };
  };
  code: string;
  language: string;
  options: Array<{
    text: string;
    code?: {
      content: string;
      language: string;
    };
  }>;

  correctAnswer: number;
  explanationEN?: string;
  explanationCN?: string;
}