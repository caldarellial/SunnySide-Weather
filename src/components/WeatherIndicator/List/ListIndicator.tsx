import React, { useState } from 'react';

import { useDarkSkyIcon } from '../../../hooks';

const styles = require('./ListIndicator.scss');

interface WeatherIndicatorProps {
  children: any;
  weather: any;
}

export function WeatherIndicator(props: WeatherIndicatorProps) {
  const { info } = useDarkSkyIcon(props.weather.icon);

  return (
    <div className={styles.container}>
      <i className={['fa', info.icon].join(' ')} />
    </div>
  );
}

export default WeatherIndicator;