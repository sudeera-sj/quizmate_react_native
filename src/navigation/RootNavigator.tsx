import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../ui/screens/Home';
import QuizCreator from '../ui/screens/QuizCreator';
import ResultsNavigator from './ResultsNavigator';
import Quiz from '../ui/screens/Quiz';
import AboutApp from '../ui/screens/AboutApp';

const Stack = createStackNavigator();

/**
 * A stacked navigator component to contain the main routes of the application.
 */
export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AboutApp" component={AboutApp} />
      <Stack.Screen name="QuizCreator" component={QuizCreator} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Results" component={ResultsNavigator} />
    </Stack.Navigator>
  );
}
