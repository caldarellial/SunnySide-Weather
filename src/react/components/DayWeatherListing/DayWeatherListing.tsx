import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { useDarkSkyIcon } from '../../hooks';

const styles = require('./DayWeatherListing.scss');

interface DayWeatherListing {
  weather: any;
}

export function DayWeatherListing(props: DayWeatherListing) {
  const [weather, setWeather] = useState(props.weather);
  const [day, setDay] = useState(moment(props.weather));
  const { info } = useDarkSkyIcon(weather.icon);

  useEffect(() => {
    setWeather(props.weather);
    setDay(moment(props.weather));
  }, [props.weather]);

  return (
    <div className={styles.container}>
      <div className={styles.day}>
        {day.format('dddd')}
      </div>
      <div className={styles.weather}>
        {info && <i className={['fas', styles.icon, info.icon].join(' ')} />}
      </div>
      <div className={styles.temperature}>
        <div className={styles.high}>
          {weather.temperatureHigh}
        </div>
        <div className={styles.low}>
          {weather.temperatureLow}
        </div>
      </div>
    </div>
  );
}

export default DayWeatherListing;