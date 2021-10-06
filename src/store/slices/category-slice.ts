import {createSlice} from '@reduxjs/toolkit';
import {TaskProgress} from '../../types/util-types';
import {Category} from '../../types/model-types';
import {fetchCategories} from '../../api/repos/category-repo';

export type CategoryState = {
  progress: TaskProgress;
  categories: Category[];
};

const initialState: CategoryState = {
  progress: TaskProgress.IDLE,
  categories: [],
};

/**
 * The slice of state that contains the properties regarding the trivia categories.
 */
const categorySlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    resetCategories: state => {
      state.progress = TaskProgress.IDLE;
      state.categories = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCategories.pending, state => {
      state.progress = TaskProgress.PENDING;
    });

    builder.addCase(fetchCategories.fulfilled, (state, {payload}) => {
      state.progress = TaskProgress.SUCCESS;
      state.categories = payload;
    });

    builder.addCase(fetchCategories.rejected, state => {
      state.progress = TaskProgress.ERROR;
    });
  },
});

export const {resetCategories} = categorySlice.actions;

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
