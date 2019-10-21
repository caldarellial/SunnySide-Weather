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
  const { info } = useDarkSkyIcon(weather ? weather.icon : null);

  function renderWeather() {
    return (
      <React.Fragment>
        <div className={styles.city}>{props.city}</div>
        <div className={styles.temperature}></div>
        <div className={styles.weather}></div>
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
    <Card>
      <Section alignCenter>
        {!!loading && renderLoading()}
        {!!weather && renderWeather()}
        {!!error && renderError()}
      </Section>
    </Card>
  );
}

export default CurrentCard;