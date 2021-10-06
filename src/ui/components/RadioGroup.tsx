import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import fonts from '../../styles/fonts';

type RadioButtonProps = {
  value: string;
  checked: boolean;
  onClick: (value: string) => void;
};

type RadioGroupProps = {
  index: number;
  items: string[];
  selectedValue: string;
  onValueSelect: (value: string) => void;
};

/**
 * Represents a single option in the form of a radio button.
 *
 * @param value The value to be submitted upon selection.
 * @param checked Whether this particular option has been selected by the user.
 * @param onClick The event triggered when the user selects this particular option.
 */
function RadioButton({value, checked, onClick}: RadioButtonProps) {
  return (
    <Pressable
      onPress={() => onClick(value)}
      android_ripple={{color: 'lightgrey', borderless: false}}>
      <View style={radioButtonStyles.container}>
        <Icon
          name={checked ? 'radiobox-marked' : 'radiobox-blank'}
          size={32}
          color={'blue'}
          style={radioButtonStyles.radioIcon}
        />
        <Text style={radioButtonStyles.text}>{value}</Text>
      </View>
    </Pressable>
  );
}

/**
 * Represents a set of options in the form of radio buttons.
 *
 * @param items The options to be displayed. Each option will be represented by a radio button.
 * @param selectedValue The currently selected option.
 * @param onValueSelect The event to be triggered when the user selects a particular option.
 * @constructor
 */
export default function RadioGroup({items, selectedValue, onValueSelect}: RadioGroupProps) {
  return (
    <View style={radioGroupStyles.container}>
      {items.map((item, index) => (
        <RadioButton
          key={index}
          value={item}
          checked={item === selectedValue}
          onClick={value => onValueSelect(value)}
        />
      ))}
    </View>
  );
}

const radioButtonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    paddingVertical: 4,
    borderRadius: 16,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: 'black',
    textAlignVertical: 'center',
    paddingStart: 8,
  },
  radioIcon: {
    fontSize: 32,
    textAlignVertical: 'center',
  },
});

const radioGroupStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
});
