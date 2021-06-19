import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  style?: StyleProp<ViewStyle>;
};

/**
 * A simple card component to contain other elements inside.
 *
 * @param children Child elements to be contained
 * @param style Additional styles to be applied
 */
export default function Card({children, style}: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 10,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
});
