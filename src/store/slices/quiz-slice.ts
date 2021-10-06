import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {QuestionDifficulty, QuestionType, TaskProgress} from '../../types/util-types';
import {Answer, Category, Question} from '../../types/model-types';
import {fetchQuiz} from '../../api/repos/quiz-repo';
import {defaultCategory} from '../../api/services/category-service';

export type QuizState = {
  progress: TaskProgress;
  category: Category;
  count: number;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  questions: Question[];
  start: number;
  end: number;
};

const initialState: QuizState = {
  progress: TaskProgress.IDLE,
  category: defaultCategory,
  count: 10,
  difficulty: QuestionDifficulty.ANY,
  type: QuestionType.ANY,
  questions: [],
  start: 0,
  end: 0,
};

/**
 * The slice of state that contains the properties regarding the ongoing quiz.
 */
const quizSlice = createSlice({
  name: 'quiz',
  initialState: initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      const newCount = action.payload;
      if (newCount >= 10 && newCount <= 50) {
        state.count = newCount;
      }
    },
    setDifficulty: (state, action: PayloadAction<QuestionDifficulty>) => {
      state.difficulty = action.payload;
    },
    setType: (state, action: PayloadAction<QuestionType>) => {
      state.type = action.payload;
    },
    answerQuestion: (state, action: PayloadAction<Answer>) => {
      if (state.questions[action.payload.index]) {
        state.questions[action.payload.index].given_answer = action.payload.answer;
      }
    },
    resetQuiz: state => {
      state.progress = TaskProgress.IDLE;
      state.count = 10;
      state.category = defaultCategory;
      state.difficulty = QuestionDifficulty.ANY;
      state.type = QuestionType.ANY;
      state.questions = [];
      state.start = 0;
      state.end = 0;
    },
    submitQuiz: state => {
      state.end = new Date().getTime();
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchQuiz.pending, state => {
      state.progress = TaskProgress.PENDING;
      state.start = 0;
      state.end = 0;
    });

    builder.addCase(fetchQuiz.fulfilled, (state, action) => {
      state.progress = TaskProgress.SUCCESS;
      state.questions = action.payload;
      state.start = new Date().getTime();
      state.end = 0;
    });

    builder.addCase(fetchQuiz.rejected, state => {
      state.progress = TaskProgress.ERROR;
      state.start = 0;
      state.end = 0;
    });
  },
});

export const {
  setCategory,
  setCount,
  setDifficulty,
  setType,
  answerQuestion,
  resetQuiz,
  submitQuiz,
} = quizSlice.actions;

const quizReducer = quizSlice.reducer;
export default quizReducer;
