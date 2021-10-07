import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import RoundedButton from '../../../src/ui/components/RoundedButton';

describe('Rounded Button Component Test', () => {
  test('Rounded Button Text Prop Test', () => {
    const button = render(<RoundedButton text={'Button Text'} onclick={() => {}} />);

    const realText = button.queryByText('Button Text');
    const missingText = button.queryByText('Some Other Text');

    expect(realText).toBeTruthy();
    expect(missingText).toBeFalsy();
  });

  test('Rounded Button Filled Prop Test', () => {
    const buttonOne = render(<RoundedButton text={'Filled'} onclick={() => {}} />);
    const buttonOneText = buttonOne.getByText('Filled');

    expect(buttonOneText.props.style).toHaveProperty('color', 'white');

    const buttonTwo = render(<RoundedButton filled={false} text={'Outlined'} onclick={() => {}} />);
    const buttonTwoText = buttonTwo.getByText('Outlined');

    expect(buttonTwoText.props.style).toHaveProperty('color', 'blue');
  });

  test('Rounded Button OnClick Prop Test', () => {
    const onClick = jest.fn();

    const view = render(<RoundedButton text={'Button Text'} onclick={onClick} />);
    const button = view.getByText('Button Text').parent!!;

    fireEvent.press(button);
    expect(onClick).toBeCalledTimes(1);

    fireEvent.press(button);
    fireEvent.press(button);
    expect(onClick).toBeCalledTimes(3);
  });
});
