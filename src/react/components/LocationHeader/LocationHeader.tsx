import React, { useState, useEffect } from 'react';

const styles = require('./LocationHeader.scss');

interface LocationHeaderProps {
  location: any;
}

export function LocationHeader(props: LocationHeaderProps) {
  const location = props.location;
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!location) {
      return setLabel('');
    }

    const addressComponents = location.address_components;
    const city = addressComponents.find((component: any) => component.types.includes('locality'));
    const state = addressComponents.find((component: any) => component.types.includes('administrative_area_level_1'));
    const country = addressComponents.find((component: any) => component.types.includes('country'));
    
    function appendToLabel(original: string, toAppend: string) {
      return `${original}${original.length > 0 ? ', ':''}${toAppend}`;
    }

    let newLabel = '';

    console.log(addressComponents, city, state, country);
    
    if (city) {
      newLabel = appendToLabel(newLabel, city.long_name);
    }

    if (state) {
      newLabel = appendToLabel(newLabel, state.short_name);
    }

    if (country && country.short_name !== 'USA') {
      newLabel = appendToLabel(newLabel, country.short_name);
    }

    setLabel(newLabel);
  }, [location]);

  return (
    <p className={styles.label}>{label}</p>
  );
}

export default LocationHeader;