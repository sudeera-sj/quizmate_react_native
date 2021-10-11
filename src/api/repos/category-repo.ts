import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppState} from '../../store';
import {CategoryState} from '../../store/slices/category-slice';
import {TaskProgress} from '../../types/util-types';
import categoryService from '../services/category-service';

class CategoryRepo {
  /**
   * Fetches the list of available trivia categories from the API.
   * The response is converted to an array of Category objects, which will then by sorted by their ID
   *
   * A default category is also appended to the successful response.
   */
  readonly fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => categoryService.loadCategories(),
    {
      condition: (_arg, {getState}) => {
        const categoryState: CategoryState = (getState() as AppState).categories;
        return (
          categoryState.progress === TaskProgress.ERROR ||
          categoryState.progress === TaskProgress.IDLE
        );
      },
    },
  );
}

const categoryRepo: CategoryRepo = new CategoryRepo();

export default categoryRepo;
