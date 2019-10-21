import React, { useState } from 'react';

import { Card, Section, ContentGroup } from '../Card/Card';
import ErrorIndicator from '../Error/Error';
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
  const { info } = useDarkSkyIcon(weather ? weather.currently.icon : null);

  function renderWeather() {
    return (
      <React.Fragment>
        <div className={styles.city}>{props.city}</div>
        {info ? <i className={['fas', info!.icon, styles.icon].join(' ')} /> : <LoadingIndicator />}
        <div className={styles.weather}>{weather.currently.summary}</div>
        <div className={styles.temperature}>{weather.currently.temperature}° F</div>
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