import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppState} from '../../store';
import {CategoryState} from '../../store/slices/category-slice';
import {TaskProgress} from '../../types/util-types';
import {loadCategories} from '../services/category-service';

/**
 * Fetches the list of available trivia categories from the API.
 * The response is converted to an array of Category objects, which will then by sorted by their ID
 *
 * A default category is also appended to the successful response.
 */
export const fetchCategories = createAsyncThunk('categories/fetchCategories', loadCategories, {
  condition: (_arg, {getState}) => {
    const categoryState: CategoryState = (getState() as AppState).categories;
    return (
      categoryState.progress === TaskProgress.ERROR || categoryState.progress === TaskProgress.IDLE
    );
  },
});
