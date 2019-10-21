import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
  useLocationWeather
} from '../hooks';
import { Card, Section } from '../components/Card/Card';
import LocationHeader from '../components/LocationHeader/LocationHeader';

interface LocationPageProps {
  location: any;
}

export function LocationPage(props: LocationPageProps) {
  const location = props.location;
  const {lat, lng} = location.geometry.location;
  const {weather, loading, error} = useLocationWeather(lat, lng);

  return (
    <Card>
      <Section borderBottomStrong>
        <LocationHeader location={location} />
      </Section>
      <Section borderBottom>

      </Section>
      <Section>

      </Section>
    </Card>
  );
}

const pageElement = document.getElementById('locationDetails');

if (pageElement)
  ReactDOM.render(<LocationPage location={{...JSON.parse(pageElement.dataset.location!.toString())}} />, pageElement);