import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
  useLocationWeather
} from '../hooks';
import { Card, Section } from '../components/Card/Card';
import LocationHeader from '../components/LocationHeader/LocationHeader';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import ErrorIndicator from '../components/Error/Error';
import TodayDetails from '../components/TodayDetails/TodayDetails';
import DayWeatherListing from '../components/DayWeatherListing/DayWeatherListing';

const styles = require('./LocationPage.scss');

interface LocationPageProps {
  location: any;
}

export function LocationPage(props: LocationPageProps) {
  const location = props.location;
  const {lat, lng} = location.geometry.location;
  const {weather, loading, error} = useLocationWeather(lat, lng);

  function renderLoading() {
    return (
      <Section alignCenter>
        <LoadingIndicator />
      </Section>
    );
  }

  function renderError() {
    return (
      <Section alignCenter>
        <ErrorIndicator error={error} />
      </Section>
    );
  }

  function renderWeather() {
    const weekWeather = weather.daily.data.slice(1,8);

    return [
      <Section borderBottom>
        <TodayDetails weather={weather} />
      </Section>,
      <Section>
        {weekWeather.map((day: any) =>
          <div className={styles.dayListing}>
            <DayWeatherListing weather={day} />
          </div>
        )}
      </Section>
    ];
  }

  return (
    <Card>
      <Section borderBottomStrong>
        <LocationHeader location={location} />
      </Section>
      {!!loading && renderLoading()}
      {!!weather && renderWeather()}
      {!!error && renderError()}
    </Card>
  );
}

const pageElement = document.getElementById('locationDetails');

if (pageElement)
  ReactDOM.render(<LocationPage location={{...JSON.parse(pageElement.dataset.location!.toString())}} />, pageElement);