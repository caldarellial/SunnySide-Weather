import React from 'react';

import { useDarkSkyIcon } from '../../hooks';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const styles = require('./WeatherIndicator.scss');

interface WeatherIndicatorProps {
  weather: any;
  size?: 'normal'|'large';
}

export function WeatherIndicator(props: WeatherIndicatorProps) {
  const weather = props.weather;
  const { info } = useDarkSkyIcon(weather.icon);

  if (!props.weather) {
    return (
      <LoadingIndicator />
    );
  }

  function renderTemperature() {
    let render = [];

    render.push(
      <span key='high'>
        {weather.temperatureHigh ? Math.round(weather.temperatureHigh) : Math.round(weather.temperature)}°
      </span>
    );

    if (weather.temperatureLow) {
      render.push(<span key='low' className={styles.low}>{Math.round(weather.temperatureLow)}°</span>)
    }

    return render;
  }

  if (!props.weather) {
    return (
      <LoadingIndicator />
    );
  }

  return (
    <div className={[styles.container, props.size ? styles[props.size] : ''].join(' ')}>
      {info ? <i className={['fas', info!.icon, styles.icon].join(' ')} /> : <LoadingIndicator />}
      <div className={styles.weather}>{weather.summary}</div>
      <div className={styles.temperature}>{renderTemperature()}</div>
    </div>
  );
}

export default WeatherIndicator;