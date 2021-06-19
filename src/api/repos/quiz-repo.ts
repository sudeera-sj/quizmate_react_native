import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppState} from '../../store';
import apiController from '../index';
import {Question} from '../../types/model-types';
import {
  QuestionDifficulty,
  QuestionType,
  TaskProgress,
} from '../../types/util-types';
import {decode} from 'html-entities';

type TriviaEntry = {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type Trivia = {
  response_code: number;
  results: TriviaEntry[];
};

/**
 * Fetches a set of trivia questions from the API using the properties in the current state as parameters.
 * The successful response will then be converted to an array of Question objects.
 */
export const fetchQuiz = createAsyncThunk(
  'quiz/fetchQuiz',
  async (_arg, {getState}) => {
    const quizState = (getState() as AppState).quiz;

    let url = `https://opentdb.com/api.php?amount=${quizState.count}`;

    const category = quizState.category.id;
    if (category > 0) {
      url += `&category=${category}`;
    }

    const difficulty = quizState.difficulty;
    if (difficulty !== QuestionDifficulty.ANY) {
      url += `&difficulty=${difficulty.valueOf()}`;
    }

    const type = quizState.type;
    if (type !== QuestionType.ANY) {
      url += `&type=${type.valueOf()}`;
    }

    return await apiController
      .get(url)
      .then(value => value.data as Trivia)
      .then(value => value.results)
      .then(value => {
        return value.map(triviaEntry => {
          triviaEntry.incorrect_answers.push(triviaEntry.correct_answer);

          /**
           * Shuffles the set of possible answers
           */
          const answers: string[] = triviaEntry.incorrect_answers
            .map(a => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map(a => a.value)
            .map(text => decode(text));

          const question: Question = {
            text: decode(triviaEntry.question),
            all_answers: answers,
            correct_answer: decode(triviaEntry.correct_answer),
            given_answer: '',
          };

          return question;
        });
      });
  },
  {
    condition: (_arg, {getState}) => {
      const quizState = (getState() as AppState).quiz;
      return quizState.progress !== TaskProgress.PENDING;
    },
  },
);
