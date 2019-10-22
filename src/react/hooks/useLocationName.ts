import { useState, useEffect } from 'react';

export function useLocationName(location: any) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (!location) {
      return setName('');
    }

    const addressComponents = location.address_components;
    const city = addressComponents.find((component: any) => component.types.includes('locality'));
    const state = addressComponents.find((component: any) => component.types.includes('administrative_area_level_1'));
    const country = addressComponents.find((component: any) => component.types.includes('country'));
    
    function appendToLabel(original: string, toAppend: string) {
      return `${original}${original.length > 0 ? ', ':''}${toAppend}`;
    }

    let newLabel = '';
    
    if (city) {
      newLabel = appendToLabel(newLabel, city.long_name);
    }

    if (state) {
      newLabel = appendToLabel(newLabel, state.short_name);
    }

    if (country && country.short_name !== 'US') {
      newLabel = appendToLabel(newLabel, country.short_name);
    }

    setName(newLabel);
  }, [location]);

  return name;
}

export default useLocationName;