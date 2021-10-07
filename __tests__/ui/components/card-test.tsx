import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';
import Card from '../../../src/ui/components/Card';

describe('Card Component Test', () => {
  test('Card Prop Test', () => {
    const cardOne = render(
      <Card>
        <Text>Card For Testing</Text>
      </Card>,
    );

    expect(cardOne.container).not.toHaveStyle({padding: 8});

    const cardTwo = render(
      <Card style={{padding: 8}}>
        <Text>Card For Testing</Text>
      </Card>,
    );

    expect(cardTwo.container).toHaveStyle({padding: 8});
  });

  test('Card Children Test', () => {
    const card = render(
      <Card>
        <Text testID={'title'}>Card Title</Text>
        <Text testID={'subtitle'}>Card Subtitle</Text>
      </Card>,
    );

    const title = card.getByTestId('title');
    const subtitle = card.getByTestId('subtitle');

    expect(card.container.children.length).toBe(1);
    expect(title).toHaveTextContent('Card Title');
    expect(subtitle).toHaveTextContent('Card Subtitle');
  });
});
