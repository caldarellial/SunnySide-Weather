import React from 'react';

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