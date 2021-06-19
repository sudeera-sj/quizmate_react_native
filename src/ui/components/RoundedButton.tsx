import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import fonts from '../../styles/fonts';

type Props = {
  filled?: boolean;
  text: string;
  onclick: () => void;
};

/**
 * A simple button with rounded corners. Available in flavors. Filled and Outlined.
 *
 * @param filled Whether the button should be in filled style. Defaults to true.
 * @param text The text to be displayed on the button. Will be displayed in uppercase.
 * @param onclick The event to be triggered upon the button click.
 */
export default function RoundedButton({filled = true, text, onclick}: Props) {
  if (filled) {
    return (
      <Pressable
        android_ripple={{color: 'lightgrey', borderless: false}}
        style={({pressed}) => [
          {backgroundColor: pressed ? 'darkblue' : 'blue'},
          styles.buttonBackground,
        ]}
        onPress={onclick}>
        <Text style={styles.filledText}>{text}</Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        android_ripple={{color: 'lightgrey', borderless: false}}
        style={({pressed}) => [
          {backgroundColor: pressed ? 'white' : 'white'},
          styles.buttonBackground,
        ]}
        onPress={onclick}>
        <Text style={styles.outlinedText}>{text}</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  buttonBackground: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    borderColor: 'blue',
    borderWidth: 1,
  },
  filledText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: 'white',
    textTransform: 'uppercase',
  },
  outlinedText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: 'blue',
    textTransform: 'uppercase',
  },
});
