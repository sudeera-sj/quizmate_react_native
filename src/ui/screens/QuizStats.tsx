import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../store";
import { Question } from "../../types/model-types";
import { VictoryPie, VictoryTheme } from "victory-native";
import fonts from "../../styles/fonts";

/**
 * This screen displays a collection of statistics about the completed quiz.
 * Includes when the quiz was started and submitted, total duration taken to complete the quiz,
 * a pie chart representing how the user has faced the quiz and finally, a score based on the number of correct answers.
 */
export default function QuizStats() {
  const quizState = useAppSelector(state => state.quiz);

  const startDate = new Date(quizState.start);
  const endDate = new Date(quizState.end);

  const chartData = createChartData(quizState.questions);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Quiz statistics</Text>

        <Text style={styles.statLabel}>Quiz started on</Text>
        <Text style={styles.statText}>
          {startDate.toLocaleDateString()} at {startDate.toLocaleTimeString()}
        </Text>

        <Text style={styles.statLabel}>Quiz submitted on</Text>
        <Text style={styles.statText}>
          {endDate.toLocaleDateString()} at {endDate.toLocaleTimeString()}
        </Text>

        <Text style={styles.statLabel}>Total duration</Text>
        <Text style={styles.statText}>{formatDuration(quizState.start, quizState.end)}</Text>

        <View style={styles.centeredContainer}>
          <VictoryPie
            data={chartData.data}
            labelRadius={({radius}) => {
              if (!Number.isNaN(radius)) {
                // @ts-ignore
                return radius + 5;
              } else {
                return undefined;
              }
            }}
            labels={({datum}) => `${datum.x}: ${datum.y}`}
            colorScale={chartData.colors}
            labelPosition={'centroid'}
            labelPlacement={'perpendicular'}
            innerRadius={80}
            padAngle={3}
            theme={VictoryTheme.material}
          />

          <Text style={styles.finalScoreLabel}>Your Final Score</Text>
          <Text style={styles.finalScoreText}>{calculateFinalScore(quizState.questions)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 24,
  },
  centeredContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    paddingTop: 24,
  },
  title: {
    paddingBottom: 16,
    fontFamily: fonts.bold,
    fontSize: 32,
    color: 'black',
    textAlign: 'left',
  },
  statLabel: {
    paddingTop: 16,
    fontFamily: fonts.light,
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
  },
  statText: {
    paddingTop: 4,
    fontFamily: fonts.medium,
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
  },
  finalScoreLabel: {
    paddingTop: 24,
    fontFamily: fonts.bold,
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  finalScoreText: {
    paddingTop: 4,
    fontFamily: fonts.bold,
    fontSize: 48,
    color: 'blue',
    textAlign: 'center',
  },
});

/**
 * Takes a start time and an end time in milliseconds and calculates the duration in between them.
 * Returns the calculated duration as a string in minutes and seconds format.
 *
 * @param start Starting time.
 * @param end Ending time.
 */
function formatDuration(start: number, end: number) {
  const duration = end - start;

  const minutes = Math.floor(duration / 60000);
  // eslint-disable-next-line radix
  const seconds = Number.parseInt(((duration % 60000) / 1000).toFixed(0));

  const minutesText = minutes === 1 ? ' minute and ' : ' minutes and ';
  const secondsText = seconds === 1 ? ' second ' : ' seconds ';

  return (
    (minutes < 10 && minutes > 0 ? '0' : '') +
    minutes +
    minutesText +
    (seconds < 10 && seconds > 0 ? '0' : '') +
    seconds +
    secondsText
  );
}

/**
 * Iterates through an array of questions and derives a set of data to be displayed in a chart.
 * Includes the number of correct, incorrect and unanswered questions, along with colors to represent them.
 *
 * @param questions The array of questions to iterate through.
 */
function createChartData(questions: Question[]) {
  const blankCount = questions.filter(value => value.given_answer === '').length;
  const correctCount = questions.filter(
    value => value.given_answer === value.correct_answer,
  ).length;
  const incorrectCount = questions.length - (blankCount + correctCount);

  const chartData: {x: string; y: number}[] = [];
  const chartColors: string[] = [];

  if (blankCount > 0) {
    chartData.push({x: 'Unanswered', y: blankCount});
    chartColors.push('gold');
  }

  if (correctCount > 0) {
    chartData.push({x: 'Right', y: correctCount});
    chartColors.push('green');
  }

  if (incorrectCount > 0) {
    chartData.push({x: 'Wrong', y: incorrectCount});
    chartColors.push('crimson');
  }

  return {
    data: chartData,
    colors: chartColors,
  };
}

/**
 * Calculates and returns the final score of a quiz based on the number of correct answers.
 * Returns the score rounded up to two decimal points and in percentage format.
 *
 * @param questions The array of questions to calculate the score.
 */
function calculateFinalScore(questions: Question[]) {
  const correctCount = questions.filter(
    value => value.given_answer === value.correct_answer,
  ).length;
  return ((correctCount / questions.length) * 100).toFixed(2) + ' %';
}
