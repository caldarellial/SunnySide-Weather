import React from 'react';
import ReactDOM from 'react-dom';

import Logo from '../Logo/Logo';

const styles = require('./Welcome.scss');

export function Welcome(props: any) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Logo color='colorized' size='xl' />
        </div>
        <a
          target='_blank'
          href='https://pbs.twimg.com/media/DiLJBEPWsAIAXQO.jpg'
          className={styles.quote}
        >
          "If you see a cloud behind the sun, it must be an egg."
        </a>
        <div className={styles.text}>
          Welcome to SunnySide weather.
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Welcome />, document.getElementById('welcome'));

export default Welcome;