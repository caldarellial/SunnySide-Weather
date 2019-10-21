import React from 'react';
import ReactDOM from 'react-dom';

import { Card, Section } from '../components/Card/Card';
import WorldWeather from '../components/WorldWeather/WorldWeather';

export function HomePage(props: any) {
  return (
    <Card>
      <Section>
        <WorldWeather></WorldWeather>
      </Section>
    </Card>
  );
}

ReactDOM.render(<HomePage />, document.getElementById('homepage'));