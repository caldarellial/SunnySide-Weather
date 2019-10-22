import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { useLocationName } from '../../hooks';

const styles = require('./DetectedBanner.scss');

interface DetectedBannerProps {
  location: any;
}

export function DetectedBanner(props: DetectedBannerProps) {
  const name = useLocationName(props.location);
  const [dismissed, setDismissed] = useState(false);

  if (!location || dismissed) {
    return <React.Fragment />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.detected}>Detected your location as <span className={styles.location}>{name}</span>. 
        <a className={styles.link} href={`/location/${props.location.place_id}`}>View Weather.</a>
      </div>
      <i className={['fas fa-times', styles.dismiss].join(' ')} onClick={() => setDismissed(true)} />
    </div>
  );
}

const pageElement = document.getElementById('detected-banner');
if (pageElement && pageElement.dataset.location)
  ReactDOM.render(<DetectedBanner location={{...JSON.parse(pageElement.dataset.location)}} />, pageElement);

export default DetectedBanner;