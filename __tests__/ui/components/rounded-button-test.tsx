import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import RoundedButton from '../../../src/ui/components/RoundedButton';

describe('RoundedButton Component Test', () => {
  test('RoundedButton text prop test', () => {
    const button = render(<RoundedButton text={'Button Text'} onclick={() => {}} />);

    const realText = button.queryByText('Button Text');
    const missingText = button.queryByText('Some Other Text');

    expect(realText).toBeTruthy();
    expect(missingText).toBeFalsy();
  });

  test('RoundedButton filled prop test', () => {
    const buttonOne = render(<RoundedButton text={'Filled'} onclick={() => {}} />);
    const buttonOneText = buttonOne.getByText('Filled');

    expect(buttonOneText.props.style).toHaveProperty('color', 'white');

    const buttonTwo = render(<RoundedButton filled={false} text={'Outlined'} onclick={() => {}} />);
    const buttonTwoText = buttonTwo.getByText('Outlined');

    expect(buttonTwoText.props.style).toHaveProperty('color', 'blue');
  });

  test('RoundedButton onClick prop test', () => {
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
