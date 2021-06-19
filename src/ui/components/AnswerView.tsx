import React from 'react';
import {ColorValue, StyleSheet, Text} from 'react-native';
import fonts from '../../styles/fonts';
import {Question} from '../../types/model-types';
import Card from './Card';

type Props = {
  index: number;
  question: Question;
};

/**
 * This component is used to present how the user has answered a particular question.
 * <br><br>
 * If the answer is correct, the background would be in green color.
 * If the answer is incorrect, the background will be in crimson color.
 * If the user hasn't answered the question, the background will be in dark orange color.
 *
 * @param index The question number. Will be incremented by 1 upon display.
 * @param question The question to be displayed.
 */
export default function AnswerView({index, question}: Props) {
  let backgroundColor: ColorValue;
  if (question.given_answer === question.correct_answer) {
    backgroundColor = 'green';
  } else if (question.given_answer === '') {
    backgroundColor = 'darkorange';
  } else {
    backgroundColor = 'crimson';
  }

  return (
    <Card style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Text style={styles.questionNumber}>Question no. {index + 1}</Text>
      <Text style={styles.question}>{question.text}</Text>
      <Text style={styles.answerLabel}>Correct answer</Text>
      <Text style={styles.answerText}>{question.correct_answer}</Text>
      <Text style={styles.answerLabel}>Your answer</Text>
      <Text style={styles.answerText}>
        {question.given_answer.length > 0 ? question.given_answer : '-'}
      </Text>
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
    color: 'whitesmoke',
  },
  question: {
    paddingTop: 4,
    paddingBottom: 8,
    fontFamily: fonts.medium,
    fontSize: 24,
    color: 'white',
  },
  answerLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: 'lavender',
    paddingTop: 16,
  },
  answerText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: 'white',
    paddingTop: 4,
  },
});
