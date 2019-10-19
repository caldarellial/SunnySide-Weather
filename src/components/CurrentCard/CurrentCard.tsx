import React, { useState } from 'react';
import { Card, Section, ContentGroup } from '../Card/Card';

import { useLocationWeather } from '../../hooks';

interface CurrentCardProps {
  children: any;
  latitude: number;
  longitude: number;
}

export function CurrentCard(props: CurrentCardProps) {
  const { weather } = useLocationWeather(props.latitude, props.longitude, true);

  return (
    <Card>
      <Section alignCenter>
        
      </Section>
    </Card>
  );
}

export default CurrentCard;