import fetch from 'node-fetch';

export const geocoder = new class {
  search(query: string): Promise<any> {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${process.env.GOOGLE_KEY}`)
      .then((response) => response.json());
  }

  details(placeId: string): Promise<any> {
    return fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_KEY}&place_id=${placeId}`)
      .then((response) => response.json());
  }
};

export default geocoder;