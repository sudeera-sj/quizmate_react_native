import apiController from '../../src/api';

test('API Controller Test', () => {
  expect(apiController.defaults.baseURL).toBe('https://opentdb.com/');
});
