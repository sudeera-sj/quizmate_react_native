import {configureStore} from '@reduxjs/toolkit';
import categoryReducer from './slices/category-slice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import quizReducer from './slices/quiz-slice';

/**
 * The store containing the states of both categories and quiz.
 */
const store = configureStore({
  reducer: {
    categories: categoryReducer,
    quiz: quizReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
