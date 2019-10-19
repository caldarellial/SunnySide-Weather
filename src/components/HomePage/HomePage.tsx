import React from 'react';
import ReactDOM from 'react-dom';

import { Card, Section } from '../Card/Card';
import WorldWeather from './WorldWeather/WorldWeather';

export function HomePage(props: any) {
  return (
    <Card>
      <Section borderBottom>

      </Section>
      <Section>
        <WorldWeather></WorldWeather>
      </Section>
    </Card>
  );
}

ReactDOM.hydrate(<HomePage />, document.getElementById('homepage'));