import React, { useState } from 'react';

import { useDarkSkyIcon } from '../../../hooks';

const styles = require('./ListIndicator.scss');

interface WeatherListIndicatorProps {
  children: any;
  weather: any;
}

export function WeatherListIndicator(props: WeatherListIndicatorProps) {
  const { info } = useDarkSkyIcon(props.weather.icon);

  return (
    <div className={styles.container}>
      <i className={['fa', info.icon].join(' ')} />
    </div>
  );
}

export default WeatherListIndicator;