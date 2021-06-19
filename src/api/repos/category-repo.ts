import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppState} from '../../store';
import {Category} from '../../types/model-types';
import {TaskProgress} from '../../types/util-types';
import {CategoryState} from '../../store/slices/category-slice';
import {AxiosResponse} from 'axios';
import apiController from '../index';

type TriviaCategories = {
  trivia_categories: Category[];
};

export const defaultCategory: Category = {
  id: 0,
  name: 'Any Category',
};

/**
 * Fetches the list of available trivia categories from the API.
 * The response is converted to an array of Category objects, which will then by sorted by their ID
 *
 * A default category is also appended to the successful response.
 */
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async _arg => {
    const categories: Category[] = await apiController
      .get('api_category.php')
      .then((value: AxiosResponse<string>) => {
        return value.data as unknown as TriviaCategories;
      })
      .then(value => value.trivia_categories)
      .then(value => {
        value.push(defaultCategory);

        value.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });

        return value;
      });

    return categories || [];
  },
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
