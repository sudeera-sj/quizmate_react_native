import apiController from '../../../src/api';
import {loadCategories} from '../../../src/api/services/category-service';

jest.mock('../../../src/api');

test('Category Service Test', async () => {
  const mockResponse = {
    trivia_categories: [
      {
        id: 3,
        name: 'Music',
      },
      {
        id: 1,
        name: 'Movies',
      },
      {
        id: 2,
        name: 'TV',
      },
    ],
  };

  const mockedApiController = apiController as jest.Mocked<typeof apiController>;
  mockedApiController.get.mockResolvedValueOnce({data: mockResponse});

  const categories = await loadCategories();

  expect(mockedApiController.get).toHaveBeenCalledWith('api_category.php');
  expect(categories.length).toBe(4);
  expect(categories[0].id).toBe(0);
  expect(categories[3].name).toBe('Music');
});
