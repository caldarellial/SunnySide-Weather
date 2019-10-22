import React, { useState, useEffect } from 'react';

import { useLocationName } from '../../hooks';

const styles = require('./LocationHeader.scss');

interface LocationHeaderProps {
  location: any;
}

export function LocationHeader(props: LocationHeaderProps) {
  const location = props.location;
  const label = useLocationName(location);

  return (
    <p className={styles.label}>{label}</p>
  );
}

export default LocationHeader;