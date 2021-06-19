import {createAsyncThunk} from '@reduxjs/toolkit';
import {decode} from 'html-entities';
import {firstValueFrom, from, of} from 'rxjs';
import {map, mergeMap, toArray} from 'rxjs/operators';
import {AppState} from '../../store';
import {Question} from '../../types/model-types';
import {
  QuestionDifficulty,
  QuestionType,
  TaskProgress,
} from '../../types/util-types';
import apiController from '../index';

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

    const questions = await firstValueFrom(
      of(`api.php?amount=${quizState.count}`).pipe(
        map(value => {
          const category = quizState.category.id;
          return category > 0 ? `${value}&category=${category}` : value;
        }),
        map(value => {
          const difficulty = quizState.difficulty;
          return difficulty !== QuestionDifficulty.ANY
            ? `${value}&difficulty=${difficulty.valueOf()}`
            : value;
        }),
        map(value => {
          const type = quizState.type;
          return type !== QuestionType.ANY
            ? `${value}&type=${type.valueOf()}`
            : value;
        }),
        mergeMap(value => from(apiController.get<string>(value))),
        map(value => value.data as unknown as Trivia),
        map(value => value.results),
        mergeMap(value => from(value)),
        map(triviaEntry => {
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
        }),
        toArray(),
      ),
    );

    return questions;
  },
  {
    condition: (_arg, {getState}) => {
      const quizState = (getState() as AppState).quiz;
      return quizState.progress !== TaskProgress.PENDING;
    },
  },
);
