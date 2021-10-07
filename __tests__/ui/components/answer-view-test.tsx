import React from 'react';
import {Question} from '../../../src/types/model-types';
import {render} from '@testing-library/react-native';
import AnswerView from '../../../src/ui/components/AnswerView';

describe('AnswerView Component Test', () => {
  const index = 1;

  test('AnswerView index prop test', () => {
    const question: Question = {
      text: 'Question',
      all_answers: ['Correct Answer', 'Wrong Answer 01', 'Wrong Answer 02', 'Wrong Answer 03'],
      correct_answer: 'Correct Answer',
      given_answer: '',
    };

    const answerView = render(<AnswerView index={index} question={question} />);

    expect(answerView.queryByText(`Question no. ${index}`)).toBeFalsy();
    expect(answerView.queryByText(`Question no. ${index + 1}`)).toBeTruthy();
  });

  test('AnswerView question prop test', () => {
    const question: Question = {
      text: 'Question',
      all_answers: ['Right Answer', 'Wrong Answer 01', 'Wrong Answer 02', 'Wrong Answer 03'],
      correct_answer: 'Right Answer',
      given_answer: '',
    };

    const answerView = render(<AnswerView index={index} question={question} />);

    expect(answerView.queryByText(question.text)).toBeTruthy();
    expect(answerView.queryByText(question.correct_answer)).toBeTruthy();

    expect(answerView.container.children[0]).toHaveStyle({backgroundColor: 'darkorange'});
    expect(answerView.getByText('-')).toBeTruthy();

    question.given_answer = 'Wrong Answer 01';
    answerView.update(<AnswerView index={index} question={question} />);

    expect(answerView.container.children[0]).toHaveStyle({backgroundColor: 'crimson'});
    expect(answerView.getByText(question.given_answer)).toBeTruthy();

    question.given_answer = 'Right Answer';
    answerView.update(<AnswerView index={index} question={question} />);

    expect(answerView.container.children[0]).toHaveStyle({backgroundColor: 'green'});
  });
});
