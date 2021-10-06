import store from '../../../src/store';
import {
  QuizState,
  resetQuiz,
  setCategory,
  setCount,
  setDifficulty,
  setType,
  submitQuiz,
} from '../../../src/store/slices/quiz-slice';
import {QuestionDifficulty, QuestionType, TaskProgress} from '../../../src/types/util-types';
import {Category} from '../../../src/types/model-types';
import apiController from '../../../src/api';
import {fetchQuiz} from '../../../src/api/repos/quiz-repo';

jest.mock('../../../src/api');

describe('Quiz Slice Test', () => {
  const mockedApiController = apiController as jest.Mocked<typeof apiController>;

  afterEach(() => {
    store.dispatch(resetQuiz());
  });

  test('Category Test', () => {
    const category: Category = {id: 1, name: 'Movies'};

    store.dispatch(setCategory(category));
    expect(store.getState().quiz.category).toEqual(category);
  });

  test('Count Test', () => {
    store.dispatch(setCount(5));
    expect(store.getState().quiz.count).toEqual(10);

    store.dispatch(setCount(55));
    expect(store.getState().quiz.count).toEqual(10);

    store.dispatch(setCount(25));
    expect(store.getState().quiz.count).toEqual(25);
  });

  test('Question Difficulty Test', () => {
    expect(store.getState().quiz.difficulty).not.toEqual(QuestionDifficulty.MEDIUM);

    store.dispatch(setDifficulty(QuestionDifficulty.MEDIUM));
    expect(store.getState().quiz.difficulty).toEqual(QuestionDifficulty.MEDIUM);
  });

  test('Question Type Test', () => {
    expect(store.getState().quiz.type).not.toEqual(QuestionType.MULTIPLE);

    store.dispatch(setType(QuestionType.MULTIPLE));
    expect(store.getState().quiz.type).toEqual(QuestionType.MULTIPLE);
  });

  test('Quiz Reset Test', () => {
    store.dispatch(setCount(25));
    store.dispatch(setDifficulty(QuestionDifficulty.MEDIUM));
    store.dispatch(setType(QuestionType.MULTIPLE));

    expect(store.getState().quiz.count).toEqual(25);
    expect(store.getState().quiz.difficulty).toEqual(QuestionDifficulty.MEDIUM);
    expect(store.getState().quiz.type).toEqual(QuestionType.MULTIPLE);

    store.dispatch(resetQuiz());

    expect(store.getState().quiz.count).not.toEqual(25);
    expect(store.getState().quiz.difficulty).not.toEqual(QuestionDifficulty.MEDIUM);
    expect(store.getState().quiz.type).not.toEqual(QuestionType.MULTIPLE);
  });

  test('Quiz Submission Test', () => {
    expect(store.getState().quiz.end).toEqual(0);

    store.dispatch(submitQuiz());

    expect(store.getState().quiz.end).toBeGreaterThan(0);
  });

  test('Fetch Quiz Fulfilled Test', async () => {
    const mockResponse = {
      response_code: 200,
      results: [
        {
          category: 'Category',
          question: 'Question One',
          correct_answer: 'Correct Answer',
          incorrect_answers: ['Incorrect Answer 01', 'Incorrect Answer 02', 'Incorrect Answer 03'],
        },
      ],
    };

    mockedApiController.get.mockResolvedValueOnce({data: mockResponse});

    const initialState: QuizState = store.getState().quiz;
    expect(initialState.progress).toBe(TaskProgress.IDLE);
    expect(initialState.questions.length).toBe(0);
    expect(initialState.start).toBe(0);
    expect(initialState.end).toBe(0);

    await store.dispatch(fetchQuiz());

    const updatedState: QuizState = store.getState().quiz;
    expect(updatedState.progress).toBe(TaskProgress.SUCCESS);
    expect(updatedState.questions.length).toBe(1);
    expect(updatedState.questions[0].text).toBe('Question One');
    expect(updatedState.start).toBeGreaterThan(0);
    expect(updatedState.end).toBe(0);
  });

  test('Fetch Quiz Rejected Test', async () => {
    mockedApiController.get.mockRejectedValueOnce(new Error('Async error'));

    const initialState: QuizState = store.getState().quiz;
    expect(initialState.progress).toBe(TaskProgress.IDLE);
    expect(initialState.start).toBe(0);
    expect(initialState.end).toBe(0);

    await store.dispatch(fetchQuiz());

    const updatedState: QuizState = store.getState().quiz;
    expect(updatedState.progress).toBe(TaskProgress.ERROR);
    expect(updatedState.start).toBe(0);
    expect(updatedState.end).toBe(0);
  });
});
