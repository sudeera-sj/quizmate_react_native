import React from 'react';
import {render} from '@testing-library/react-native';
import RadioGroup from '../../../src/ui/components/RadioGroup';

describe('RadioGroup Component Test', () => {
  const index = 0;
  const items = ['One', 'Two', 'Three', 'Four'];

  test('RadioGroup items prop test', () => {
    const radioGroup = render(
      <RadioGroup index={index} items={items} selectedValue={''} onValueSelect={() => {}} />,
    );
  });
});
