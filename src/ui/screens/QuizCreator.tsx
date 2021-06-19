import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {QuestionDifficulty, QuestionType} from '../../types/util-types';
import {StackScreenProps} from '@react-navigation/stack';
import {RootNavigatorTypes} from '../../types/navigation-types';
import {useAppDispatch, useAppSelector} from '../../store';
import {
  setCategory,
  setCount,
  setDifficulty,
  setType,
} from '../../store/slices/quiz-slice';
import {Category} from '../../types/model-types';
import Slider from '@react-native-community/slider';
import RoundedButton from '../components/RoundedButton';
import {Picker} from '@react-native-picker/picker';
import fonts from '../../styles/fonts';

type Props = StackScreenProps<RootNavigatorTypes, 'QuizCreator'>;

const difficulties: {label: string; value: QuestionDifficulty}[] = [
  {label: 'Any difficulty', value: QuestionDifficulty.ANY},
  {label: 'Easy', value: QuestionDifficulty.EASY},
  {label: 'Medium', value: QuestionDifficulty.MEDIUM},
  {label: 'Hard', value: QuestionDifficulty.HARD},
];

const types: {label: string; value: QuestionType}[] = [
  {label: 'Any question type', value: QuestionType.ANY},
  {label: 'Multiple choice questions', value: QuestionType.MULTIPLE},
  {label: 'True/False questions', value: QuestionType.BOOLEAN},
];

/**
 * This screen provides the user with a set of options to customize a quiz.
 * Includes the number of questions, quiz category, difficulty level and question type.
 *
 * @param navigation The navigation instance passed down from the navigation container.
 */
export default function QuizCreator({navigation}: Props) {
  const dispatch = useAppDispatch();
  const quizState = useAppSelector(state => state.quiz);

  const categories: {label: string; value: Category}[] = useAppSelector(
    state => {
      return state.categories.categories.map(category => {
        return {label: category.name, value: category};
      });
    },
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Create new quiz</Text>

      <View style={styles.inputFieldContainer}>
        <Text style={[styles.inputFieldLabel, styles.countLabel]}>
          Question count
        </Text>

        <Slider
          value={quizState.count}
          onValueChange={value => dispatch(setCount(value))}
          minimumValue={10}
          maximumValue={30}
          step={5}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="#000000"
          thumbTintColor="darkblue"
        />
        <Text style={styles.count}>{quizState.count} Questions</Text>
      </View>

      <View style={styles.inputFieldContainer}>
        <Text style={styles.inputFieldLabel}>Quiz category</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={quizState.category}
            onValueChange={(_itemValue, itemIndex) =>
              dispatch(setCategory(categories[itemIndex].value))
            }>
            {categories.map((value, index) => (
              <Picker.Item
                key={index}
                value={value.value.name}
                label={value.label}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputFieldContainer}>
        <Text style={styles.inputFieldLabel}>Difficulty level</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={quizState.difficulty}
            onValueChange={itemValue => dispatch(setDifficulty(itemValue))}>
            {difficulties.map((value, index) => (
              <Picker.Item
                key={index}
                value={value.value}
                label={value.label}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputFieldContainer}>
        <Text style={styles.inputFieldLabel}>Question type</Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={quizState.type}
            onValueChange={itemValue => dispatch(setType(itemValue))}>
            {types.map((value, index) => (
              <Picker.Item
                key={index}
                value={value.value}
                label={value.label}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.createQuizButton}>
        <RoundedButton
          text={'Create Quiz'}
          onclick={() => navigation.navigate('Quiz')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 16,
  },
  titleText: {
    fontSize: 32,
    fontFamily: fonts.medium,
    color: 'black',
  },
  countLabel: {
    paddingTop: 32,
  },
  inputFieldContainer: {
    paddingTop: 16,
  },
  inputFieldLabel: {
    paddingBottom: 4,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: 'black',
  },
  createQuizButton: {
    paddingTop: 32,
    alignSelf: 'flex-end',
  },
  count: {
    alignSelf: 'flex-end',
    fontSize: 12,
    fontFamily: fonts.regular,
    color: 'black',
  },
  pickerContainer: {
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
  },
});
