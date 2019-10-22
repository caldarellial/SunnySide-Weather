import { useState, useEffect } from 'react';

export function useLocationWeather(latitude: number, longitude: number, currentOnly?: boolean) {
  const [weather, setWeather]: [any, (weather: any) => any] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]: [any, (error: any) => any] = useState(null);

  useEffect(() => {
    setLoading(true);

    let reqUrl = `/weather/${latitude}/${longitude}`;

    if (currentOnly) {
      reqUrl = `${reqUrl}?currentOnly=true`;
    }

    fetch(reqUrl)
    .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setError(null);
      })
      .catch((error: any) => {
        console.log(error);
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