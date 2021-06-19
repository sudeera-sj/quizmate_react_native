import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store';
import {TaskProgress} from '../../types/util-types';
import {Question} from '../../types/model-types';
import {ResultsNavigatorTypes} from '../../types/navigation-types';
import AnswerView from '../components/AnswerView';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {resetQuiz} from '../../store/slices/quiz-slice';
import fonts from '../../styles/fonts';

type Props = BottomTabScreenProps<ResultsNavigatorTypes, 'QuizAnswers'>;

const renderAnswer: ListRenderItem<Question> = listEntry => (
  <AnswerView
    index={listEntry.index}
    question={listEntry.item}
    key={listEntry.index}
  />
);

/**
 * This screen displays the answers to the quiz and compares them with the answers provided by the user.
 *
 * @param navigation The navigation instance passed down from the navigation container.
 */
export default function QuizAnswers({navigation}: Props) {
  const quizState = useAppSelector(state => state.quiz);
  const dispatch = useAppDispatch();

  /**
   * Listens to back navigation actions of the app.
   * If a back navigation event occurs, halts it and asks for a confirmation. Will only proceed if confirmed positively.
   */
  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', e => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();

        Alert.alert(
          'Exit results ?',
          'You will be re-routed to the main window',
          [
            {
              text: 'No',
              style: 'cancel',
              onPress: () => {},
            },
            {
              text: 'Yes',
              style: 'destructive',
              onPress: () => {
                dispatch(resetQuiz());
                navigation.dispatch(e.data.action);
              },
            },
          ],
        );
      }
    });

    return () => {
      navigation.removeListener('beforeRemove', listener);
    };
  }, [dispatch, navigation]);

  if (quizState.progress === TaskProgress.SUCCESS) {
    return (
      <View style={styles.quizContainer}>
        <FlatList<Question>
          data={quizState.questions}
          renderItem={renderAnswer}
          keyExtractor={(item, index) => index.toString()}
          extraData={quizState.questions}
          ListHeaderComponent={() => (
            <View style={styles.listHeaderContainer}>
              <Text style={styles.listHeaderTitle}>Your answers</Text>
            </View>
          )}
          ListFooterComponent={() => <View style={styles.listFooter} />}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={styles.loadingText}>setting things up</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizContainer: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  loadingText: {
    top: 8,
    color: 'black',
  },
  listHeaderContainer: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    padding: 16,
  },
  listHeaderTitle: {
    fontFamily: fonts.bold,
    fontSize: 32,
    color: 'black',
    textAlign: 'left',
  },
  listFooter: {
    paddingVertical: 8,
    backgroundColor: 'whitesmoke',
  },
});
