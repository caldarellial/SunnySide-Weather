import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Autocomplete from '@material-ui/core';

const styles = require('./TopNav.scss');

export function TopNav(props: any) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (query) {
      fetch(`search/${query}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((err) => {
 
      }).finally(() => {

      });
    } else {
      setLocation(null);
      setSearchResults([]);
    }
  }, [query]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <i className={['fas fa-cloud-meatball', styles.icon].join(' ')} />
          <p className={styles.title}>Meatball</p>
        </div>
        <div className={styles.searchContainer}>
          <input className={styles.search} type='text' onChange={(event) => setQuery(event.target.value)}></input>
          <i className={['fas fa-search', styles.icon].join(' ')} />
        </div>
        <div className={styles.themeContainer}>

        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<TopNav />, document.getElementById('topnav'));