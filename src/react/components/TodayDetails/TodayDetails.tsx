import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import WeatherIndicator from '../WeatherIndicator/WeatherIndicator';

const styles = require('./TodayDetails.scss');

interface TodayDetailsProps {
  weather: any;
}

export function TodayDetails(props: TodayDetailsProps) {
  // For details.. do precip change, sunset time, high, low, wind speed/direction
  const [currently, setCurrently] = useState(props.weather.currently);
  const [daily, setDaily] = useState(props.weather.daily.data[0]);

  useEffect(() => {
    setCurrently(props.weather.currently);
    setDaily(props.weather.daily.data[0]);
  }, [props.weather]);

  function renderDetails() {
    let render = [
      <div className={styles.detail}>
        <div className={styles.title}>High</div>
        <div className={styles.value}>{Math.round(daily.temperatureHigh)}°</div>
      </div>,
      <div className={styles.detail}>
        <div className={styles.title}>Low</div>
        <div className={styles.value}>{Math.round(daily.temperatureLow)}°</div>
      </div>,
      <div className={styles.detail}>
        <div className={styles.title}>Feels Like</div>
        <div className={styles.value}>{Math.round(currently.apparentTemperature)}°</div>
      </div>,
      <div className={styles.detail}>
        <div className={styles.title}>Chance of Rain</div>
        <div className={styles.value}>{currently.precipProbability*100}%</div>
      </div>,
      <div className={styles.detail}>
        <div className={styles.title}>Sunset</div>
        <div className={styles.value}>{moment.unix(daily.sunsetTime).tz(moment.tz.guess()).format('h:mm A z')}</div>
      </div>,
      <div className={styles.detail}>
        <div className={styles.title}>Wind Speed</div>
        <div className={styles.value}>{currently.windSpeed} mph</div>
      </div>
    ];

    return render;
  }

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <div className={styles.title}>{moment.unix(daily.time).format('dddd')}</div>
        <WeatherIndicator weather={currently} size='large' />
      </div>
      <div className={styles.details}>
        {renderDetails()}
      </div>
    </div>
  );
}

export default TodayDetails;