import fetch from 'node-fetch';

export const darksky = new class {
  fetch(lat: number|string, lon: number|string, currentOnly?: boolean): Promise<any> {
    let reqUrl = `https://api.darksky.net/forecast/${process.env.API_KEY}/${lat},${lon}`;

    if (currentOnly) {
      reqUrl = `${reqUrl}?exclude=${['minutely', 'hourly', 'daily'].join(',')}`;
    }
  
    return fetch(reqUrl)
      .then((response) => response.json());
  }
};

export default darksky;