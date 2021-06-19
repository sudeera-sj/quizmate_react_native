import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import QuizAnswers from '../ui/screens/QuizAnswers';
import QuizStats from '../ui/screens/QuizStats';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../styles/fonts';

const Tab = createBottomTabNavigator();

/**
 * The bottom tabbed navigator component to display the answers and statistics of a quiz.
 */
export default function ResultsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="QuizAnswers"
      backBehavior="initialRoute"
      tabBarOptions={{
        labelStyle: {fontFamily: fonts.medium, paddingBottom: 4},
        tabStyle: {paddingTop: 8},
      }}>
      <Tab.Screen
        name="QuizAnswers"
        component={QuizAnswers}
        options={{
          title: 'Answers',
          tabBarIcon: screenProps => (
            <Icon
              name={'receipt'}
              size={screenProps.size}
              color={screenProps.color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="QuizStats"
        component={QuizStats}
        options={{
          title: 'Statistics',
          tabBarIcon: screenProps => (
            <Icon
              name={'chart-arc'}
              size={screenProps.size}
              color={screenProps.color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
