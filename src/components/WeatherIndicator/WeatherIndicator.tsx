import React, { useState } from 'react';

import { useDarkSkyIcon } from '../../hooks';

interface WeatherIndicatorProps {
  children: any;
  weather: any;
}

export function WeatherIndicator(props: WeatherIndicatorProps) {
  const { info } = useDarkSkyIcon(props.weather.icon);

  return (
    <div>
      <i className={['fas', info.icon].join(' ')} />
    </div>
  );
}

export default WeatherIndicator;