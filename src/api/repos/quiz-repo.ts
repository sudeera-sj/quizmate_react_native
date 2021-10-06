import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppState} from '../../store';
import {TaskProgress} from '../../types/util-types';
import {loadQuiz} from '../services/quiz-service';

/**
 * Fetches a set of trivia questions from the API using the properties in the current state as parameters.
 * The successful response will then be converted to an array of Question objects.
 */
export const fetchQuiz = createAsyncThunk(
  'quiz/fetchQuiz',
  async (_arg, {getState}) => loadQuiz((getState() as AppState).quiz),
  {
    condition: (_arg, {getState}) => {
      const quizState = (getState() as AppState).quiz;
      return quizState.progress !== TaskProgress.PENDING;
    },
  },
);
