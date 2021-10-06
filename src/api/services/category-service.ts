import {AxiosResponse} from 'axios';
import apiController from '..';
import {Category} from '../../types/model-types';

type TriviaCategories = {
  trivia_categories: Category[];
};

export const defaultCategory: Category = {
  id: 0,
  name: 'Any Category',
};

export const loadCategories = async () => {
  const categories: Category[] = await apiController
    .get('api_category.php')
    .then((value: AxiosResponse<string>) => value.data as unknown as TriviaCategories)
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
};
