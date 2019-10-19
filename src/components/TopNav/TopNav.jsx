import React, { useState } from 'react';

const styles = require('./TopNav.scss');

export function TopNav(props) {
  const [query, setQuery] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.search}>

        </div>
        <div className={styles.theme}>

        </div>
      </div>
    </div>
  )
}

export default TopNav;