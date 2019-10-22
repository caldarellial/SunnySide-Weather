import React, { useState } from 'react';

import ErrorIndicator from '../Error/Error';
import WeatherIndicator from '../WeatherIndicator/WeatherIndicator';
import {
  useDarkSkyIcon,
  useLocationWeather
} from '../../hooks';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const styles = require('./CurrentCard.scss');

interface CurrentCardProps {
  children?: any;
  latitude: number;
  longitude: number;
  city: string;
}

export function CurrentCard(props: CurrentCardProps) {
  const { weather, loading, error } = useLocationWeather(props.latitude, props.longitude, true);

  function renderWeather() {
    return (
      <React.Fragment>
        <div className={styles.city}>{props.city}</div>
        <WeatherIndicator weather={weather.currently} />
      </React.Fragment>
    );
  }

  function renderLoading() {
    return (
      <LoadingIndicator />
    );
  }

  function renderError() {
    return (
      <ErrorIndicator error={error} />
    );
  }

  return (
    <div className={styles.container}>
      {!!loading && renderLoading()}
      {!!weather && renderWeather()}
      {!!error && renderError()}
    </div>
  );
}

export default CurrentCard;