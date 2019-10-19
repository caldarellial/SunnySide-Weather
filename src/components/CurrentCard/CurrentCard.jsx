import React, { useState } from 'react';

import { useLocationWeather } from '../../hooks';

export function CurrentCard(props) {
  const { weather } = useLocationWeather(props.latitude, props.longitude);

  return (
    
  );
}

export default CurrentCard;