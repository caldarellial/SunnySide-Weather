import React from 'react';

const styles = require('./Logo.scss');

type LogoSize = 'normal'|'xl';
type LogoColor = 'normal'|'inverted'|'colorized';

interface LogoProps {
  size?: LogoSize;
  color?: LogoColor;
}

export function Logo(props: LogoProps) {
  const size: LogoSize = props.size || 'normal';
  const color: LogoColor = props.color || 'normal';

  return (
    <div className={[styles.container, styles[`size_${size}`], styles[`color_${color}`]].join(' ')}>
      <i className={['fas fa-cloud', styles.cloud].join(' ')} />
      <i className={['fas fa-circle', styles.sun].join(' ')} />
    </div>
  )
}

export default Logo;