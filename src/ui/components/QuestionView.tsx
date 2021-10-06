import React from 'react';
import {Question} from '../../types/model-types';
import {StyleSheet, Text} from 'react-native';
import RadioGroup from './RadioGroup';
import {useAppDispatch, useAppSelector} from '../../store';
import {answerQuestion} from '../../store/slices/quiz-slice';
import Card from './Card';
import fonts from '../../styles/fonts';

type Props = {
  index: number;
  question: Question;
};

/**
 * Displays a questions with a set of possible answers.
 * The answer given by the user will be updated upon selection.
 *
 * @param index The question number. Will be incremented by 1 upon display.
 * @param question The question to display.
 */
export default function QuestionView({index, question}: Props) {
  const givenAnswer: string = useAppSelector(state => state.quiz.questions[index].given_answer);
  const dispatch = useAppDispatch();

  return (
    <Card style={styles.container}>
      <Text style={styles.questionNumber}>Question no. {index + 1}</Text>
      <Text style={styles.question}>{question.text}</Text>
      <RadioGroup
        index={index}
        items={question.all_answers}
        selectedValue={givenAnswer}
        onValueSelect={value => dispatch(answerQuestion({index: index, answer: value}))}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  questionNumber: {
    fontFamily: fonts.light,
    fontSize: 12,
    color: 'darkslategrey',
  },
  question: {
    paddingTop: 4,
    paddingBottom: 16,
    fontFamily: fonts.medium,
    fontSize: 18,
    color: 'black',
  },
});
