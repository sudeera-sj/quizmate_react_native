import {decode} from 'html-entities';
import {QuizState} from '../../store/slices/quiz-slice';
import {Question} from '../../types/model-types';
import {QuestionDifficulty, QuestionType} from '../../types/util-types';
import apiController from '../index';
import {AxiosResponse} from 'axios';

type TriviaEntry = {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

type Trivia = {
  response_code: number;
  results: TriviaEntry[];
};

class QuizService {
  async loadQuiz(quizState: QuizState) {
    let url = `api.php?amount=${quizState.count}`;

    const category = quizState.category.id;
    if (category > 0) {
      url += `&category=${category}`;
    }

    const difficulty = quizState.difficulty;
    if (difficulty !== QuestionDifficulty.ANY) {
      url += `&difficulty=${difficulty.valueOf()}`;
    }

    const type = quizState.type;
    if (type !== QuestionType.ANY) {
      url += `&type=${type.valueOf()}`;
    }

    const response: AxiosResponse<Trivia> = await apiController.get(url);
    const triviaEntries = response.data.results;

    return triviaEntries.map(triviaEntry => {
      triviaEntry.incorrect_answers.push(triviaEntry.correct_answer);

      /**
       * Shuffles the set of possible answers
       */
      const answers: string[] = triviaEntry.incorrect_answers
        .map(a => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .map(text => decode(text));

      const question: Question = {
        text: decode(triviaEntry.question),
        all_answers: answers,
        correct_answer: decode(triviaEntry.correct_answer),
        given_answer: '',
      };

      return question;
    });
  }
}

const quizService = new QuizService();

export default quizService;
