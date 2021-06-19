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
import QuestionView from '../components/QuestionView';
import {fetchQuiz} from '../../api/repos/quiz-repo';
import NetInfo from '@react-native-community/netinfo';
import RoundedButton from '../components/RoundedButton';
import {StackScreenProps} from '@react-navigation/stack';
import {RootNavigatorTypes} from '../../types/navigation-types';
import {resetQuiz, submitQuiz} from '../../store/slices/quiz-slice';
import fonts from '../../styles/fonts';
import {
  notifyQuizStart,
  notifyQuizSubmit,
} from '../../util/notifications/quiz-notifications';

type Props = StackScreenProps<RootNavigatorTypes, 'Quiz'>;

const renderQuestion: ListRenderItem<Question> = listEntry => (
  <QuestionView
    index={listEntry.index}
    question={listEntry.item}
    key={listEntry.index}
  />
);

/**
 * This screen displays the created quiz to the user.
 * The user can then select his/her answers or leave them blank if he\she prefers, and proceed to submit the quiz.
 *
 * @param navigation The navigation instance passed down from the navigation container.
 */
export default function Quiz({navigation}: Props) {
  const quizState = useAppSelector(state => state.quiz);
  const dispatch = useAppDispatch();

  /**
   * Creates a push notification signifying the start of a quiz
   */
  useEffect(() => {
    if (quizState.start > 0) {
      notifyQuizStart(quizState.start);
    }
  }, [quizState.start]);

  /**
   * Creates a push notification signifying the submission of a quiz
   */
  useEffect(() => {
    if (quizState.end > 0) {
      notifyQuizSubmit(quizState.end);
    }
  }, [quizState.end]);

  /**
   * Listens to the internet connectivity status changes of the device.
   * Once the internet connection is active, calls to fetch a quiz.
   */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isInternetReachable) {
        dispatch(fetchQuiz());
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  /**
   * Listens to back navigation actions of the app.
   * If a back navigation event occurs, halts it and asks for a confirmation. Will only proceed if confirmed positively.
   */
  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', e => {
      if (e.data.action.type === 'GO_BACK') {
        e.preventDefault();

        Alert.alert(
          'Exit quiz ?',
          'The current quiz will be discarded. Are you sure to go back ?',
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

  switch (quizState.progress) {
    case TaskProgress.SUCCESS:
      if (quizState.questions.length > 0) {
        return (
          <View style={styles.quizContainer}>
            <FlatList<Question>
              data={quizState.questions}
              renderItem={renderQuestion}
              keyExtractor={(item, index) => index.toString()}
              extraData={quizState.questions}
              ListHeaderComponent={() => (
                <View style={styles.listHeader}>
                  <Text style={styles.listHeaderText}>Here we go!</Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View style={styles.listFooter}>
                  <RoundedButton
                    text={'submit answers'}
                    onclick={() => {
                      Alert.alert(
                        'Submit quiz ?',
                        'Are you sure to submit the quiz for evaluation ?',
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
                              dispatch(submitQuiz());
                              navigation.replace('Results');
                            },
                          },
                        ],
                      );
                    }}
                  />
                </View>
              )}
            />
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <Text style={styles.emptyTitle}>Oops!</Text>
            <Text style={styles.emptyText}>
              {"turns out, we don't have that many questions with us just yet."}
            </Text>
            <Text style={styles.emptySubtext}>
              try lowering the number of questions
            </Text>
            <RoundedButton
              text={'go back'}
              onclick={() => navigation.goBack()}
            />
          </View>
        );
      }
    case TaskProgress.ERROR:
      return (
        <View style={styles.container}>
          <Text>Oops! An error occurred</Text>
          <View style={styles.tryAgainButton}>
            <RoundedButton
              text={'try again'}
              onclick={() => {
                dispatch(fetchQuiz());
              }}
            />
          </View>
        </View>
      );
    default:
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
    backgroundColor: 'whitesmoke',
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
  tryAgainButton: {
    top: 8,
  },
  emptyTitle: {
    fontFamily: fonts.bold,
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
  },
  emptyText: {
    paddingVertical: 16,
    fontFamily: fonts.medium,
    fontSize: 18,
    textAlign: 'center',
    color: 'darkslategrey',
  },
  emptySubtext: {
    paddingVertical: 16,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: 'center',
    color: 'black',
  },
  listFooter: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  listHeader: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignContent: 'stretch',
  },
  listHeaderText: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: 'blue',
  },
});
