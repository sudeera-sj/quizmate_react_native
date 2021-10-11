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

class CategoryService {
  async loadCategories() {
    const response: AxiosResponse<TriviaCategories> = await apiController.get('api_category.php');
    const categories = response.data.trivia_categories;

    categories.push(defaultCategory);

    categories.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

    return categories || [];
  }
}

const categoryService: CategoryService = new CategoryService();

export default categoryService;
