import React, { useState } from 'react';

import { useLocationWeather } from '../../../hooks';

const shortcuts = {
  'Boston': [42.3600825, -71.0588801],
  'Chicago': [41.8339042,-88.0121559],
  'San Francisco': [37.757815,-122.5076405],
  'Shanghai': [31.2243084,120.9162634],
  'Paris': [48.8589507,2.2770198],
  'Sydney': [33.8473567,150.651782],
  'Johannesburg': [-26.1713505,27.9699839]
};

export function WorldWeather(props: any) {
  let render = [];

  for (const [key, val] of Object.entries(shortcuts)) {
    const localWeather = useLocationWeather(val[0], val[1], true);
    
    render.push(
      <div>
        <div>{key}</div>
      </div>
    )
  }

  return render;
}