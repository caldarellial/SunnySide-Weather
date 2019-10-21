import { useState, useEffect } from 'react';

interface IconInfo {
  icon: string;
  description: string;
}

interface IconMap {
  [key: string]: IconInfo
};

const infoMap: IconMap = {
  'clear-day': {
    icon: 'fa-sun',
    description: 'Clear'
  },
  'clear-night': {
    icon: 'fa-moon',
    description: 'Clear'
  },
  'rain': {
    icon: 'fa-cloud-rain',
    description: 'Rain'
  },
  'snow': {
    icon: 'fa-snowflake',
    description: 'Snow'
  },
  'sleet': {
    icon: 'fa-cloud-meatball',
    description: 'Sleet'
  },
  'wind': {
    icon: 'fa-wind',
    description: 'Windy'
  },
  'fog': {
    icon: 'fa-smog',
    description: 'Fog'
  },
  'cloudy': {
    icon: 'fa-cloud',
    description: 'Cloudy'
  },
  'partly-cloudy-day': {
    icon: 'fa-cloud-sun',
    description: 'Partly Cloudy'
  },
  'partly-cloudy-night': {
    icon: 'fa-cloud-moon',
    description: 'Partly Cloudy'
  }
}

export function useDarkSkyIcon(icon: string): {info: IconMap|null} {
  const [info, setInfo]: [IconMap|null, any] = useState(null);

  useEffect(() => {
    if (!infoMap[icon]) {
      setInfo(null);
    } else {
      setInfo(infoMap[icon]);
    }
  }, [icon]);

  return { info };
}

export default useDarkSkyIcon;