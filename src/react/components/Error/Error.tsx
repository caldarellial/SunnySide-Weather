import React from 'react';

const styles = require('./Error.scss');

interface ErrorProps {
  error: string;
}

export function ErrorIndicator(props: ErrorProps) {
  return (
    <div className={styles.container}>
      <i className={[styles.icon, 'fas fa-exclamation-triangle'].join(' ')} />
    </div>
  );
}

export default ErrorIndicator;