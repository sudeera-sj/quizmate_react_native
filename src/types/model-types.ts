export type Category = {
  id: number;
  name: string;
};

export type Question = {
  text: string;
  all_answers: string[];
  correct_answer: string;
  given_answer: string;
};

export type Answer = {
  index: number;
  answer: string;
};
