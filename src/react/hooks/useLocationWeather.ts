import { useState, useEffect } from 'react';

export function useLocationWeather(latitude: number, longitude: number, currentOnly?: boolean) {
  const [weather, setWeather]: [any, (weather: any) => any] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]: [any, (error: any) => any] = useState(null);

  useEffect(() => {
    setLoading(true);

    let reqUrl = `https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}`;

    if (currentOnly) {
      reqUrl = `${reqUrl}?exclude=${['minutely', 'hourly', 'daily'].join(',')}`;
    }

    fetch(reqUrl)
      .then((response: any) => {
        setWeather(response);
        setError(null);
      })
      .catch((error: any) => {
        setError(error);
        setWeather(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [latitude, longitude]);

  return { weather, loading, error };
}

export default useLocationWeather;