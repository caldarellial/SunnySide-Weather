import { useState, useEffect } from 'react';

interface IconInfo {
  icon: string;
  description: string;
}

const infoMap: any = {
  'clear-day': {
    icon: 'fas-sun',
    description: 'Clear'
  },
  'clear-night': {
    icon: 'fas-moon',
    description: 'Clear'
  },
  'rain': {
    icon: 'fas-cloud-rain',
    description: 'Rain'
  },
  'snow': {
    icon: 'fas-snowflake',
    description: 'Snow'
  },
  'sleet': {
    icon: 'fas-cloud-meatball',
    description: 'Sleet'
  },
  'wind': {
    icon: 'fas-wind',
    description: 'Windy'
  },
  'fog': {
    icon: 'fas-smog',
    description: 'Fog'
  },
  'cloudy': {
    icon: 'fas-cloud',
    description: 'Cloudy'
  },
  'partly-cloudy-day': {
    icon: 'fas-cloud-sun',
    description: 'Partly Cloudy'
  },
  'partly-cloudy-night': {
    icon: 'fas-cloud-moon',
    description: 'Partly Cloudy'
  }
}

export function useDarkSkyIcon(icon: string) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (icon in infoMap) {
      setInfo(infoMap[icon]);
    } else {
      setInfo(null);
    }
  }, [icon]);

  return { info };
}

export default useDarkSkyIcon;