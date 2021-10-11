import apiController from '../../../src/api';
import {QuizState} from '../../../src/store/slices/quiz-slice';
import {QuestionDifficulty, QuestionType, TaskProgress} from '../../../src/types/util-types';
import {defaultCategory} from '../../../src/api/services/category-service';
import {Category, Question} from '../../../src/types/model-types';
import quizService from '../../../src/api/services/quiz-service';

jest.mock('../../../src/api');

describe('Quiz Service Test', () => {
  const mockedApiController = apiController as jest.Mocked<typeof apiController>;

  const quizState: QuizState = {
    progress: TaskProgress.IDLE,
    category: defaultCategory,
    count: 10,
    difficulty: QuestionDifficulty.ANY,
    type: QuestionType.ANY,
    questions: [],
    start: 0,
    end: 0,
  };

  test('Question Count Test', async () => {
    const state: QuizState = {...quizState};

    const response = {
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

    mockedApiController.get.mockResolvedValueOnce({data: response});

    const questions: Question[] = await quizService.loadQuiz(state);

    expect(mockedApiController.get).toHaveBeenCalledWith(`api.php?amount=${state.count}`);
    expect(questions.length).toBe(1);
    expect(questions[0].text).toBe('Question One');
    expect(questions[0].all_answers.length).toBe(4);
    expect(questions[0].correct_answer).toBe('Correct Answer');
  });

  test('Question Category Test', async () => {
    const category: Category = {
      id: 1,
      name: 'Movies',
    };

    const state: QuizState = {
      ...quizState,
      category: category,
    };

    const response = {
      response_code: 200,
      results: [
        {
          category: category.name,
          question: 'Question One',
          correct_answer: 'Correct Answer',
          incorrect_answers: ['Incorrect Answer 01', 'Incorrect Answer 02', 'Incorrect Answer 03'],
        },
      ],
    };

    mockedApiController.get.mockResolvedValueOnce({data: response});

    const questions: Question[] = await quizService.loadQuiz(state);

    expect(mockedApiController.get).toHaveBeenCalledWith(
      `api.php?amount=${state.count}&category=${category.id}`,
    );
    expect(questions.length).toBe(1);
    expect(questions[0].text).toBe('Question One');
    expect(questions[0].all_answers.length).toBe(4);
    expect(questions[0].correct_answer).toBe('Correct Answer');
  });

  test('Question Difficulty Test', async () => {
    const difficulty: QuestionDifficulty = QuestionDifficulty.MEDIUM;

    const state: QuizState = {...quizState, difficulty: difficulty};

    const response = {
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

    mockedApiController.get.mockResolvedValueOnce({data: response});

    const questions: Question[] = await quizService.loadQuiz(state);

    expect(mockedApiController.get).toHaveBeenCalledWith(
      `api.php?amount=${state.count}&difficulty=${difficulty.valueOf()}`,
    );
    expect(questions.length).toBe(1);
    expect(questions[0].text).toBe('Question One');
    expect(questions[0].all_answers.length).toBe(4);
    expect(questions[0].correct_answer).toBe('Correct Answer');
  });

  test('Question Type Test', async () => {
    const type: QuestionType = QuestionType.MULTIPLE;

    const state: QuizState = {...quizState, type: type};

    const response = {
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

    mockedApiController.get.mockResolvedValueOnce({data: response});

    const questions: Question[] = await quizService.loadQuiz(state);

    expect(mockedApiController.get).toHaveBeenCalledWith(
      `api.php?amount=${state.count}&type=${type.valueOf()}`,
    );
    expect(questions.length).toBe(1);
    expect(questions[0].text).toBe('Question One');
    expect(questions[0].all_answers.length).toBe(4);
    expect(questions[0].correct_answer).toBe('Correct Answer');
  });
});
