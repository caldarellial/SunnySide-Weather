import React from 'react';
import ReactDOM from 'react-dom';

import { Card, Section } from '../components/Card/Card';
import WorldWeather from '../components/HomePage/WorldWeather/WorldWeather';

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

ReactDOM.render(<HomePage />, document.getElementById('homepage'));