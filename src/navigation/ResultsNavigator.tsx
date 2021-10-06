import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import QuizAnswers from '../ui/screens/QuizAnswers';
import QuizStats from '../ui/screens/QuizStats';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

/**
 * The bottom tabbed navigator component to display the answers and statistics of a quiz.
 */
export default function ResultsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="QuizAnswers"
      backBehavior="initialRoute"
      screenOptions={{
        tabBarLabelStyle: {
          fontFamily: 'Rubik-Medium',
          paddingBottom: 4,
        },
        tabBarItemStyle: {
          paddingTop: 8,
        },
        tabBarStyle: {
          display: 'flex',
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="QuizAnswers"
        component={QuizAnswers}
        options={{
          title: 'Answers',
          tabBarIcon: screenProps => (
            <Icon name={'receipt'} size={screenProps.size} color={screenProps.color} />
          ),
        }}
      />
      <Tab.Screen
        name="QuizStats"
        component={QuizStats}
        options={{
          title: 'Statistics',
          tabBarIcon: screenProps => (
            <Icon name={'chart-arc'} size={screenProps.size} color={screenProps.color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
