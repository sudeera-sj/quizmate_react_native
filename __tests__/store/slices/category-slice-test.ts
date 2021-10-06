import apiController from '../../../src/api';
import store from '../../../src/store';
import {TaskProgress} from '../../../src/types/util-types';
import {CategoryState, resetCategories} from '../../../src/store/slices/category-slice';
import {fetchCategories} from '../../../src/api/repos/category-repo';

jest.mock('../../../src/api');

describe('Category Slice Test', () => {
  const mockedApiController = apiController as jest.Mocked<typeof apiController>;

  beforeEach(() => {
    store.dispatch(resetCategories());
  });

  test('Fetch Categories Fulfilled Test', async () => {
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

    mockedApiController.get.mockResolvedValueOnce({data: mockResponse});

    const initialState: CategoryState = store.getState().categories;
    expect(initialState.progress).toBe(TaskProgress.IDLE);
    expect(initialState.categories.length).toBe(0);

    await store.dispatch(fetchCategories());

    const updatedState: CategoryState = store.getState().categories;
    expect(updatedState.progress).toBe(TaskProgress.SUCCESS);
    expect(updatedState.categories.length).toBe(4);
    expect(updatedState.categories[0].id).toBe(0);
  });

  test('Fetch Categories Rejected Test', async () => {
    mockedApiController.get.mockRejectedValueOnce(new Error('Async error'));

    const initialState: CategoryState = store.getState().categories;
    expect(initialState.progress).toBe(TaskProgress.IDLE);
    expect(initialState.categories.length).toBe(0);

    await store.dispatch(fetchCategories());

    const updatedState: CategoryState = store.getState().categories;
    expect(updatedState.progress).toBe(TaskProgress.ERROR);
    expect(initialState.categories.length).toBe(0);
  });
});
