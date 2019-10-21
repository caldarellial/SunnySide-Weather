import React, { useState } from 'react';

import { useDarkSkyIcon } from '../../hooks';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

interface WeatherIndicatorProps {
  children: any;
  weather: any;
}

export function WeatherIndicator(props: WeatherIndicatorProps) {
  const { info } = useDarkSkyIcon(props.weather.icon);

  if (!props.weather) {
    return (
      <LoadingIndicator />
    );
  }

  return (
    <div>
      <i className={['fas', info!.icon].join(' ')} />
    </div>
  );
}

export default WeatherIndicator;