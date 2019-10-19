import { useState, useEffect } from 'react';

export function useLocationWeather(latitude, longitude) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}`)
      .then((response) => {
        setWeather(response);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setWeather(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [zipcode]);

  return { weather, loading, error };
}

export default useLocationWeather;